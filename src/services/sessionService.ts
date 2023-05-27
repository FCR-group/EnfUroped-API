import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import ms from "ms";
import { NODE_ENV, SESSION_SECRET, SESSION_EXPIRATION } from "../utils/env";
import prisma from "../prismaClient";

const sessionMiddleware = session({
  name: "uroped_session",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === "production",
    httpOnly: true,
    maxAge: ms(SESSION_EXPIRATION),
    signed: true,
  },
  store: new PrismaSessionStore(prisma, {
    checkPeriod: NODE_ENV === "test" ? undefined : ms("1 day"),
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

export default sessionMiddleware;
