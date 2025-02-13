import dotenv from "dotenv";
import { dbConnection } from "./Config/database.Config.js";
import { app } from "./app.js";

dotenv.config();

// Ensure database connection before handling requests
export default async function handler(req, res) {
  try {
    if (!global.dbConnected) {
      await dbConnection();
      global.dbConnected = true;
    }
    return app(req, res); // Pass request to Express
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
