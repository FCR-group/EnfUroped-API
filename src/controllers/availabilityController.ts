import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const open: RequestHandler = async (req, res) => {
  const { dateTime, nurseCpf } = req.body;
  await prisma.availability.create({
    data: { dateTime, nurse: { connect: { userCpf: nurseCpf } } },
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
  const { dateTime } = req.params;
  const availabilitys = await prisma.availability.findMany({
    where: { dateTime },
  });
  if (!availabilitys) {
    throw new HttpError.NotFound();
  }
  return res.json(availabilitys);
};

const retrieveByNurse: RequestHandler = async (req, res) => {
  const { nurseCpf } = req.params;
  const availabilitys = await prisma.availability.findMany({
    where: { nurseCpf },
  });
  if (!availabilitys) {
    throw new HttpError.NotFound();
  }
  return res.json(availabilitys);
};

const unAvailability: RequestHandler = async (req, res) => {
  const { nurseCpfQ, dateTimeQ } = req.query;
  const dateTime = dateTimeQ as string;
  const nurseCpf = nurseCpfQ as string;

  await prisma.availability.delete({
    where: { dateTime_nurseCpf: { dateTime, nurseCpf } },
  });

  return res.sendStatus(204);
};

export default { list, retrieveByDate, retrieveByNurse, open, unAvailability };
