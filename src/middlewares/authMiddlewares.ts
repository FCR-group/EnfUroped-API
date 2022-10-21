import { UserType } from "@prisma/client";
import { RequestHandler } from "express";
import HttpError from "http-errors";
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

export { authenticate, isLoggedIn, isOfType, isAdmin };
