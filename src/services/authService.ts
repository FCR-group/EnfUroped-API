import passport from "passport";
import { Strategy, VerifyFunction } from "passport-local";
import HttpError from "http-errors";
import prisma from "../prismaClient";
import { comparePassword } from "../helpers/userHelper";

const authUser: VerifyFunction = async (cpf, password, next) => {
  const user = await prisma.user.findUnique({
    where: {
      cpf,
    },
    include: {
      nurse: true,
      student: true,
      family: true,
    },
  });

  if (!user || !comparePassword(password, user.password)) {
    return next(null, false);
  }

  if (user.type === "FAMILY") {
    return next(null, user);
  }

  if (user.type === "NURSE" && user.nurse?.isPermitted) {
    return next(null, user);
  }

  if (user.type === "STUDENT" && user.student?.isPermitted) {
    return next(null, user);
  }

  return next(new HttpError.Forbidden());
};

passport.use(new Strategy({ usernameField: "cpf" }, authUser));

passport.serializeUser((user, next) => next(null, user));

passport.deserializeUser(async (user, next) => next(null, user as any));

export default passport;
