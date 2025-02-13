import {
  getAllCandidateDetails,
  getAllHrDetails,
  getAllClientsDetails,
  // createHr,
} from "../Controllers/Admin/admin.controller.js";
import { createHr,updateHr,deleteHr } from "../Controllers/Admin/admin.controller.js";
import { auth,isAdmin,isHr } from "../Middlewares/auth.middleware.js";

import express from "express";

 const router = express.Router();

 router.get("/get-all-candidate-details",auth, isAdmin, getAllCandidateDetails);
 router.get("/get-all-Client-details",auth, isAdmin, getAllClientsDetails); 

 
 router.get("/get-all-hr-details", auth, isAdmin, getAllHrDetails);
 router.post("/create-hr", auth, isAdmin, createHr);
 router.put("/update-hr", auth, isAdmin, updateHr);
 router.delete("/delete-hr", auth, isAdmin, deleteHr);




export default router;