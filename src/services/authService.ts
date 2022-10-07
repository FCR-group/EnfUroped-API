import passport from "passport";
import { Strategy, VerifyFunction } from "passport-local";
import prisma from "../prismaClient";
import { comparePassword } from "../helpers/userHelper";

const authUser: VerifyFunction = async (cpf, password, next) => {
  const user = await prisma.user.findUnique({
    where: {
      cpf,
    },
  });

  if (!user || !comparePassword(password, user.password)) {
    return next(null, false);
  }

  return next(null, user);
};

passport.use(new Strategy({ usernameField: "cpf" }, authUser));

passport.serializeUser((user, next) => next(null, user.cpf));

passport.deserializeUser(async (cpf, next) => {
  const user = await prisma.user.findUnique({
    where: {
      cpf: cpf as string,
    },
  });

  if (!user) {
    return next(null, false);
  }

  return next(null, user);
});

export default passport;
