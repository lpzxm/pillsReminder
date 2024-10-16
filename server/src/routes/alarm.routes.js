import express from "express";
import { getAllAlarms, getAlarmById, createAlarm, updateAlarm, deleteAlarm } from "../controllers/alarmController.js";

const router = express.Router();

// Rutas para alarmas
router.get("/", getAllAlarms);
router.get("/:id", getAlarmById);
router.post("/", createAlarm);
router.put("/:id", updateAlarm);
router.delete("/:id", deleteAlarm);

export default router;

