import { User } from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }
  
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error while creating user", error);
    res.status(500).json({
      success: false,
      message: "Error while creating user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    user.password = undefined;

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
    };

    return res.status(200).cookie("token", token, cookieOptions).json({
        success: true,
        message: "Logged in successfully",
        token: token,
        data: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.log("Error while logging in user", error);
    res.status(500).json({
      success: false,
      message: "Error while logging in user",
    });
  }
};

export { createUser, loginUser };
