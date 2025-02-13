import { User } from "../Models/user.model.js";
import { mailSender } from "../Utils/MailSender.js";
import bcrypt from "bcrypt";
import { sendMail } from "../Utils/MailTemplate.js";

const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomUUID();

    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
      }
    );

    const url = `${process.env.FRONT_END_URL}/update-password/${token}`;

    await sendMail(user.email, "passwordReset", {
      firstname: user.firstname,
      url: url,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Error in resetPasswordToken:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending password reset link",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    console.log({
      token: token,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(404).json({
        success: false,
        message: "Password reset link has expired",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error resetting password",
    });
  }
};

export { resetPasswordToken, resetPassword };
