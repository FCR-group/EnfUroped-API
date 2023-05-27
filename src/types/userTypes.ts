import { Prisma } from "@prisma/client";

const user = Prisma.validator<Prisma.UserArgs>()({
  include: {
    nurse: true,
    student: true,
    family: true,
  },
});

const userWithStudent = Prisma.validator<Prisma.UserArgs>()({
  include: {
    student: true,
  },
});

const userWithNurse = Prisma.validator<Prisma.UserArgs>()({
  include: {
    nurse: true,
  },
});

const userWithFamily = Prisma.validator<Prisma.UserArgs>()({
  include: {
    family: true,
  },
});

const userWithTokens = Prisma.validator<Prisma.UserArgs>()({
  include: {
    tokens: true,
  },
});

type User = Prisma.UserGetPayload<typeof user>;
type UserWithStudent = Prisma.UserGetPayload<typeof userWithStudent>;
type UserWithNurse = Prisma.UserGetPayload<typeof userWithNurse>;
type UserWithFamily = Prisma.UserGetPayload<typeof userWithFamily>;
type UserWithTokens = Prisma.UserGetPayload<typeof userWithTokens>;

export { User, UserWithStudent, UserWithNurse, UserWithFamily, UserWithTokens };
