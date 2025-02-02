import {
  createClient,
  updateClient,
  deleteClient,
  getAllClientsDetailsForHr,
} from "../Controllers/Hr/client.Controller.js";
import {
  createJobRequirements,
  updateJobRequirements,
  deleteJobRequirements,
  getJobRequirements,
  getActiveJobRequirements,
} from "../Controllers/Hr/job.Controller.js";
import {
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidate,
} from "../Controllers/Hr/candidate.controller.js";
import { auth, isAdmin, isHr } from "../Middlewares/auth.middleware.js";

import express from "express";

const router = express.Router();

// -----------------------------------------||  For client  ||------------------------------------------------

router.post("/create-client", auth, createClient);
router.put("/update-client", auth, updateClient);
router.delete("/delete-client", auth, deleteClient);
router.get("/get-client-details-hr", auth, getAllClientsDetailsForHr);

// ----------------------------------------||  For Job-requirement  ||----------------------------------------

router.post("/create-job-requirement", auth, createJobRequirements);
router.put("/update-job-requirement", auth, updateJobRequirements);
router.delete("/delete-job-requirement", auth, deleteJobRequirements);
router.get("/get-job-requirement", auth, getJobRequirements);
router.get("/get-active-job-requirement", auth, getActiveJobRequirements);

// ----------------------------------------||  For Candidate  ||---------------------------------------------

router.post("/create-candidate",auth, createCandidate);
router.put("/update-candidate", auth, updateCandidate);
router.delete("/delete-candidate", auth, deleteCandidate);
router.get("/get-candidate", auth, getCandidate);

export default router;
