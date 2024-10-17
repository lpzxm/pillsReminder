import { prisma } from "../config/prisma.js";

// Obtener todas las alarmas
export const getAllAlarms = async (req, res) => {
  try {
    const alarms = await prisma.alarm.findMany();
    res.json(alarms);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las alarmas" });
  }
};

export const getAlarmById = async (req, res) => {
  const { id } = req.params;
  try {
    const alarm = await prisma.alarm.findUnique({
      where: { id: parseInt(id) },
    });
    if (!alarm) {
      return res.status(404).json({ error: "Alarma no encontrada" });
    }
    res.json(alarm);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la alarma" });
  }
};

export const createAlarm = async (req, res) => {
  const { name, time, description } = req.body;
  try {
    const newAlarm = await prisma.alarm.create({
      data: { name, time, description },
    });
    res.status(201).json(newAlarm);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la alarma" });
  }
};

export const updateAlarm = async (req, res) => {
  const { id } = req.params;
  const { name, time, description } = req.body;
  try {
    const updatedAlarm = await prisma.alarm.update({
      where: { id: parseInt(id) },
      data: { name, time, description },
    });
    res.json(updatedAlarm);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la alarma" });
  }
};

export const deleteAlarm = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.alarm.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Alarma eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la alarma" });
  }
};