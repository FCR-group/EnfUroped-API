import { RequestHandler } from "express";
import HttpError from "http-errors";
import passport from "../services/authService";

const authenticate = passport.authenticate("local", {});

const isLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new HttpError.Unauthorized("You are not logged in");
  }

  return next();
};

export { authenticate, isLoggedIn };
