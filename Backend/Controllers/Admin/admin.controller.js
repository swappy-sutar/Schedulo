import { Client } from "../../Models/client.model.js";
import { User } from "../../Models/user.model.js";
import { Candidate } from "../../Models/candidate.model.js";
import { sendMail } from "../../Utils/MailTemplate.js";
import bcrypt from "bcrypt"

const getAllHrDetails = async (req, res) => {
  try {
    const hrDetails = await User.find({ role: "HR" }).select("-password");

    if (!hrDetails || hrDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No HR details found",
      });
    }

    return res.status(200).json({
      success: true,
      data: hrDetails,
    });
  } catch (error) {
    console.error("Error fetching HR details:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching HR details",
    });
  }
};

const getAllClientsDetails = async (req, res) => {
  try {
    const clientDetails = await Client.find();

    if (!clientDetails || clientDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No client details found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Clients details fetched successfully",
      data: clientDetails,
    });
  } catch (error) {
    console.error("Error fetching client details:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching client details",
    });
  }
};

const getAllCandidateDetails = async (req, res) => {
  try {
    const candidateDetails = await Candidate.find();
    if (!candidateDetails || candidateDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No candidate details found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Candidates details fetched successfully",
      data: candidateDetails,
    });
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching candidate details",
    });
  }
};

const createHr = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      salary,
      password,
      confirmPassword,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Hr with this email already exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCount = await User.countDocuments();
    const employeeId = userCount + 1;

    const user = await User.create({
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      salary,
      password: hashedPassword,
      employeeId,
      image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
    });

    await sendMail(user.email, "welcome", {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: password,
      url: process.env.FRONT_END_URL,
    });

    return res.status(201).json({
      success: true,
      message: "Hr created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error while creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Error while creating user",
    });
  }
};

const updateHr = async (req, res) => {};

const deleteHr = async (req, res) => {};

export {
  getAllCandidateDetails,
  getAllHrDetails,
  getAllClientsDetails,
  createHr,
  updateHr,
  deleteHr,
};
