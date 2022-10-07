import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { NODE_ENV, SESSION_SECRET, SESSION_EXPIRATION } from "../utils/env";
import { getMaxAge, daysToMilliseconds } from "../utils/getMaxAge";
import prisma from "../prismaClient";

const sessionMiddleware = session({
  name: "session",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === "production",
    httpOnly: true,
    maxAge: getMaxAge(SESSION_EXPIRATION),
    signed: true,
  },
  store: new PrismaSessionStore(prisma, {
    checkPeriod: NODE_ENV === "test" ? undefined : daysToMilliseconds(1),
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

export default sessionMiddleware;
