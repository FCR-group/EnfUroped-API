import prisma from "../src/prismaClient";

async function resetDatabase() {
  await prisma.$transaction(async (transaction) => {
    await transaction.session.deleteMany();
    await transaction.user.deleteMany();
  });
}

// eslint-disable-next-line import/prefer-default-export
export { resetDatabase };
