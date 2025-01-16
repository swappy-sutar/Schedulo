import express from 'express';
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["POST", "GET", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.options("*", cors());


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Schedulo backend'
    })
})

import userRoutes from './Routes/user.routes.js';
import timeslotRoutes from './Routes/timeslot.routes.js';

app.use('/api/v1/user', userRoutes);
app.use("/api/v1/schedule", timeslotRoutes);


export {app};
