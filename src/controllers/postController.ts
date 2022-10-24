import { Post } from "@prisma/client";
import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const publish: RequestHandler = async (req, res) => {
  const {
    authors,
    reviewers,
    title,
    image,
    video,
    content,
    introduction,
    createdAt,
    owner,
    ownerCpf,
    tags,
  } = req.body;
  await prisma.post.create({
    data: {
      authors,
      reviewers,
      title,
      image,
      video,
      content,
      introduction,
      createdAt,
      owner,
      ownerCpf,
      tags,
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const posts = await prisma.post.findMany();
  if (!posts) {
    throw new HttpError.NotFound();
  }
  return res.json(posts);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);
  const post = await prisma.post.findUnique({ where: { id: idNum } });
  if (!post) {
    throw new HttpError.NotFound();
  }
  return res.json(post);
};

const update: RequestHandler = async (req, res) => {
  const {
    id,
    authors,
    reviewers,
    title,
    image,
    video,
    content,
    introduction,
    createdAt,
    owner,
    ownerCpf,
    tags,
  } = req.body;
  await prisma.post.update({
    where: { id },
    data: {
      authors,
      reviewers,
      title,
      image,
      video,
      content,
      introduction,
      createdAt,
      owner,
      ownerCpf,
      tags,
    },
  });
  return res.sendStatus(204);
};

const destroy: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const id = parseInt(idHelper, 10);
  await prisma.post.delete({
    where: {
      id,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, destroy, publish, update };
