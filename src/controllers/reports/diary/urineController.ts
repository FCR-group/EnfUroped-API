import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../../../prismaClient";

const send: RequestHandler = async (req, res) => {
  const { id, loss, quantity, dateTime, diaryId } = req.body;

  await prisma.urine.create({
    data: {
      id,
      loss,
      quantity,
      dateTime,
      diary: { connect: { appointmentId: diaryId } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const urines = await prisma.urine.findMany();
  return res.json(urines);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const idh = parseInt(id, 10);
  const urine = await prisma.urine.findUnique({ where: { id: idh } });
  if (!urine) {
    throw new HttpError.NotFound();
  }
  return res.json(urine);
};

const update: RequestHandler = async (req, res) => {
  const { idH } = req.params;
  const id = parseInt(idH, 10);

  const { loss, quantity, dateTime, diaryId } = req.body;
  await prisma.urine.update({
    where: { id },
    data: {
      loss,
      quantity,
      dateTime,
      diary: { connect: { appointmentId: diaryId } },
    },
  });
  return res.sendStatus(204);
};

const remove: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const id = parseInt(idHelper, 10);
  await prisma.urine.delete({
    where: {
      id,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, remove, send, update };
