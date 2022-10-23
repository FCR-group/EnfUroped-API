import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const make: RequestHandler = async (req, res) => {
  const { patient, patientId, dateTime, availability } = req.body;
  await prisma.appointment.create({ data: { patient, patientId, dateTime, availability } });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const appointments = await prisma.appointment.findMany();
  if (!appointments) {
    throw new HttpError.NotFound();
  }
  return res.json(appointments);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);
  const appointment = await prisma.appointment.findUnique({ where: { id: idNum } });
  if (!appointment) {
    throw new HttpError.NotFound();
  }
  return res.json(appointment);
};

const update: RequestHandler = async (req, res) => {
  const { id, patient, patientId, dateTime, availability } = req.body;
  await prisma.appointment.update({
    where: { id },
    data: {
      patient,
      patientId,
      dateTime,
      availability,
    },
  });
  return res.sendStatus(204);
};

const unBook: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const id = parseInt(idHelper, 10);
  await prisma.appointment.delete({
    where: {
      id,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, unBook, make, update };
