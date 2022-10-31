import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../../../prismaClient";

const send: RequestHandler = async (req, res) => {
  const {
    appointmentId,
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  } = req.body;
  await prisma.dvss.create({
    data: {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
      appointment: { connect: { id: appointmentId } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const dvsss = await prisma.dvss.findMany();
  return res.json(dvsss);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const appointmentId = parseInt(id, 10);
  const dvss = await prisma.dvss.findUnique({ where: { appointmentId } });
  if (!dvss) {
    throw new HttpError.NotFound();
  }
  return res.json(dvss);
};

const update: RequestHandler = async (req, res) => {
  const { idH } = req.params;
  const appointmentId = parseInt(idH, 10);

  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  } = req.body;
  await prisma.dvss.update({
    where: { appointmentId },
    data: {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
    },
  });
  return res.sendStatus(204);
};

const remove: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const appointmentId = parseInt(idHelper, 10);
  await prisma.dvss.delete({
    where: {
      appointmentId,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, remove, send, update };
