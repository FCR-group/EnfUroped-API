import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../../../prismaClient";

const send: RequestHandler = async (req, res) => {
  const { appointmentId, question1, question2, question3, question4, question5, question6 } =
    req.body;
  await prisma.romaIv.create({
    data: {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      appointment: { connect: { id: appointmentId } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const romaIvs = await prisma.romaIv.findMany();
  return res.json(romaIvs);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const appointmentId = parseInt(id, 10);
  const romaIv = await prisma.romaIv.findUnique({ where: { appointmentId } });
  if (!romaIv) {
    throw new HttpError.NotFound();
  }
  return res.json(romaIv);
};

const update: RequestHandler = async (req, res) => {
  const { idH } = req.params;
  const appointmentId = parseInt(idH, 10);

  const { question1, question2, question3, question4, question5, question6 } = req.body;
  await prisma.romaIv.update({
    where: { appointmentId },
    data: {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
    },
  });
  return res.sendStatus(204);
};

const remove: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const appointmentId = parseInt(idHelper, 10);
  await prisma.romaIv.delete({
    where: {
      appointmentId,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, remove, send, update };
