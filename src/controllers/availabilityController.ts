import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const open: RequestHandler = async (req, res) => {
  const { dateTime } = req.body;
  await prisma.availability.create({
    data: { dateTime, nurses: {} },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const availabilitys = await prisma.availability.findMany();
  if (!availabilitys) {
    throw new HttpError.NotFound();
  }
  return res.json(availabilitys);
};

const retrieveByDate: RequestHandler = async (req, res) => {
  const { name } = req.params;
  const availabilitys = await prisma.availability.findMany({});
  if (!availabilitys) {
    throw new HttpError.NotFound();
  }
  return res.json(availabilitys);
};

const retrieveByNurse: RequestHandler = async (req, res) => {};

export default { list, retrieveByDate, retrieveByNurse, open };
