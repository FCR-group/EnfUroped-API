import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../../../prismaClient";

const send: RequestHandler = async (req, res) => {
  const {
    appointmentId,
    expectedResults,
    followedBy,
    mainComplaint,
    historic,
    urinaryEvaluation,
    intestinalEvaluation,
    physicalExam,
    diagnosis,
    interventions,
  } = req.body;
  await prisma.sae.create({
    data: {
      expectedResults,
      followedBy,
      mainComplaint,
      historic,
      urinaryEvaluation,
      intestinalEvaluation,
      physicalExam,
      diagnosis,
      interventions,
      appointment: { connect: { id: appointmentId } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const saes = await prisma.sae.findMany();
  return res.json(saes);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const appointmentId = parseInt(id, 10);
  const sae = await prisma.sae.findUnique({ where: { appointmentId } });
  if (!sae) {
    throw new HttpError.NotFound();
  }
  return res.json(sae);
};

const update: RequestHandler = async (req, res) => {
  const { idH } = req.params;
  const appointmentId = parseInt(idH, 10);

  const {
    expectedResults,
    followedBy,
    mainComplaint,
    historic,
    urinaryEvaluation,
    intestinalEvaluation,
    physicalExam,
    diagnosis,
    interventions,
  } = req.body;
  await prisma.sae.update({
    where: { appointmentId },
    data: {
      expectedResults,
      followedBy,
      mainComplaint,
      historic,
      urinaryEvaluation,
      intestinalEvaluation,
      physicalExam,
      diagnosis,
      interventions,
    },
  });
  return res.sendStatus(204);
};

const remove: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const appointmentId = parseInt(idHelper, 10);
  await prisma.sae.delete({
    where: {
      appointmentId,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, remove, send, update };
