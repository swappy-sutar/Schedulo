import { mailSender } from "../Utils/MailSender.js";

const generateEmailTemplate = (type, data) => {
  switch (type) {
    case "passwordReset":
      return `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
          <h2 style="color: #4CAF50;">Password Reset Request</h2>
          <p>Hi ${data.firstname},</p>
          <p>You have requested to reset your password for your Loyal Hr account. Click the button below to reset your password:</p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="${data.url}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </p>
          <p>If you did not request this, please ignore this email or contact our support if you have any concerns.</p>
          <p>This password reset link will expire in 5 minutes.</p>
          <p>Thank you,<br>Loyal Hr Team</p>
        </div>
      `;

    case "welcome":
      return `
    <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;"> Welcome to Loyal HR! </h2>
      <p>Dear ${data.firstname} ${data.lastname},</p>
      
      <p>Congratulations on starting this exciting new journey with <strong>Loyal HR</strong>! We are delighted to have you on board and can't wait to support you in streamlining and optimizing your HR processes.</p>

      <p>Your account has been successfully created! Below are your login credentials:</p>

      <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Password:</strong> ${data.password}</p>
      </div>

      <p style="margin-top: 15px;">You can access your account using the link below:</p>
      <p style="text-align: center; margin: 20px 0;">
        <a href="${data.url}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Your Account</a>
      </p>

      <p style="color: #555;">For security reasons, we highly recommend updating your password after your first login.</p>

      <p>We believe in empowering HR professionals like you with efficiency, collaboration, and innovation. Our team is here to assist you every step of the way.</p>

      <p style="font-size: 16px; font-weight: bold; color: #4CAF50;">Wishing you great success and a fulfilling experience ahead!</p>

      <p style="font-weight: bold; margin-top: 20px;">Best regards,</p>
      <p style="font-size: 16px; color: #4CAF50;"><strong>The Loyal HR Team</strong></p>
    </div>
  `;

    case "passwordChanged":
      return `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
          <h2 style="color: #4CAF50;">Password Changed Successfully</h2>
          <p>Hi ${data.firstname},</p>
          <p>Your password for your Loyal Hr account has been changed successfully. If you did not make this change, please contact our support immediately.</p>
          <p>Thank you,<br>Loyal Hr Team</p>
        </div>
      `;

    case "notification":
      return `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
          <h2 style="color: #4CAF50;">Notification</h2>
          <p>Hi ${data.firstName},</p>
          <p>${data.message}</p>
          <p>Thank you,<br>Loyal Hr Team</p>
        </div>
      `;

    default:
      return "";
  }
};

const sendMail = async (email, type, data) => {
  const subjectMap = {
    passwordReset: "Reset Your Password - Loyal Hr",
    welcome: "Welcome to Loyal Hr",
    passwordChanged: "Your Password Has Been Changed",
    notification: "New Notification from Loyal Hr",
  };

  const title = subjectMap[type] || "Notification from Loyal Hr";
  const body = generateEmailTemplate(type, data);

  await mailSender(email, title, body);
};

export { sendMail };
