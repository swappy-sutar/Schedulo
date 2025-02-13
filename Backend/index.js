import dotenv from "dotenv";
import { dbConnection } from "./Config/database.Config.js";
import { app } from "./app.js";

dotenv.config();

export default async function handler(req, res) {
  try {
    await dbConnection();
    return app(req, res); 
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
