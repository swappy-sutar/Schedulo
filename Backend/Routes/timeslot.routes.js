import express from 'express';
import {
  createTimeslot,
  getTimeslots,
  updateTimeslot,
  deleteTimeslot,
} from "../Controllers/timeslot.controller.js";
import { auth,isHr,isAdmin } from "../Middlewares/auth.middleware.js";


const router = express.Router();

router.post('/create-slot',auth, createTimeslot);
router.get('/get-slots',auth, getTimeslots);
router.post("/update-slot/:id", auth, updateTimeslot);
router.delete('/delete-slot/:id',auth, deleteTimeslot);

export default router;