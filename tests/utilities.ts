import prisma from "../src/prismaClient";

async function resetDatabase() {
  await prisma.$transaction(async (transaction) => {
    await transaction.message.deleteMany();
    await transaction.appointment.deleteMany();
    await transaction.availability.deleteMany();
    await transaction.student.deleteMany();
    await transaction.family.deleteMany();
    await transaction.nurse.deleteMany();
    await transaction.user.deleteMany();
    await transaction.patient.deleteMany();
    await transaction.tag.deleteMany();
    await transaction.post.deleteMany();
    await transaction.token.deleteMany();
    await transaction.session.deleteMany();
  });
}

// eslint-disable-next-line import/prefer-default-export
export { resetDatabase };
