import { UserType } from "@prisma/client";
import { RequestHandler } from "express";
import HttpError from "http-errors";
import prismaClient from "../prismaClient";
import passport from "../services/authService";

const authenticate = passport.authenticate("local", {});

const isLoggedIn: RequestHandler = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new HttpError.Unauthorized();
  }

  return next();
};

function isOfType(type: UserType): RequestHandler {
  return async (req, res, next) => {
    if (req.user?.type !== type) {
      throw new HttpError.Forbidden();
    }

    return next();
  };
}

const isAdmin: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    throw new HttpError.Forbidden();
  }

  if (req.user.nurse?.isAdmin) {
    return next();
  }

  throw new HttpError.Forbidden();
};

const isUserOrAdmin: RequestHandler = async (req, res, next) => {
  const { cpf } = req.params;

  if (!req.user) {
    throw new HttpError.Unauthorized();
  }

  if (!cpf) {
    throw new HttpError.BadRequest("Cpf is required");
  }

  if (req.user.nurse?.isAdmin) {
    return next();
  }

  const user = await prismaClient.user.findUnique({
    where: {
      cpf,
    },
  });

  if (!user) {
    throw new HttpError.NotFound();
  }

  if (user.cpf !== req.user.cpf) {
    throw new HttpError.Forbidden();
  }

  return next();
};

export { authenticate, isLoggedIn, isOfType, isAdmin, isUserOrAdmin };
