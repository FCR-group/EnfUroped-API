import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../../../prismaClient";

const send: RequestHandler = async (req, res) => {
  const { id, type, quantity, dateTime, diaryId } = req.body;
  await prisma.drink.create({
    data: {
      id,
      type,
      quantity,
      dateTime,
      diary: { connect: { appointmentId: diaryId } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const drinks = await prisma.drink.findMany();
  return res.json(drinks);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const idh = parseInt(id, 10);
  const drink = await prisma.drink.findUnique({ where: { id: idh } });
  if (!drink) {
    throw new HttpError.NotFound();
  }
  return res.json(drink);
};

const update: RequestHandler = async (req, res) => {
  const { idH } = req.params;
  const id = parseInt(idH, 10);

  const { type, quantity, dateTime, diaryId } = req.body;
  await prisma.drink.update({
    where: { id },
    data: {
      type,
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
  await prisma.drink.delete({
    where: {
      id,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, remove, send, update };
