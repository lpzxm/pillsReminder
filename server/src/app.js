import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import alarmRoutes from "./routes/alarm.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use("/api/alarms", alarmRoutes);

export default app;
