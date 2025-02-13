import dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./Config/database.Config.js";
import { app } from "./app.js";

dbConnection().then(()=>{
    app.listen(process.env.PORT  || 4000, ()=>{
        console.log(`✅ Server is running on port ${process.env.PORT}`);
    })
})