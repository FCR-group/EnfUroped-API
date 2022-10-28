/*
  Warnings:

  - The primary key for the `Availability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `familyCpf` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `_AvailabilityToNurse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dateTime,nurseCpf]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numCoren,ufCoren]` on the table `Nurse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nurseCpf` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nurseCpf` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorName` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numCoren` to the `Nurse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ufCoren` to the `Nurse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Losses" AS ENUM ('FEW', 'SOME', 'MUCH');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_dateTime_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_familyCpf_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_familyCpf_fkey";

-- DropForeignKey
ALTER TABLE "_AvailabilityToNurse" DROP CONSTRAINT "_AvailabilityToNurse_A_fkey";

-- DropForeignKey
ALTER TABLE "_AvailabilityToNurse" DROP CONSTRAINT "_AvailabilityToNurse_B_fkey";

-- DropIndex
DROP INDEX "Appointment_dateTime_key";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "nurseCpf" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_pkey",
ADD COLUMN     "nurseCpf" TEXT NOT NULL,
ADD CONSTRAINT "Availability_pkey" PRIMARY KEY ("dateTime", "nurseCpf");

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "familyCpf",
ADD COLUMN     "creatorName" TEXT NOT NULL,
ADD COLUMN     "patientId" INTEGER,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "numCoren" TEXT NOT NULL,
ADD COLUMN     "ufCoren" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AvailabilityToNurse";

-- CreateTable
CREATE TABLE "Sae" (
    "expectedResults" TEXT,
    "followedBy" TEXT,
    "mainComplaint" TEXT,
    "historic" TEXT,
    "urinaryEvaluation" TEXT,
    "intestinalEvaluation" TEXT,
    "physicalExam" TEXT,
    "diagnosis" TEXT,
    "interventions" TEXT,
    "appointmentId" INTEGER NOT NULL,

    CONSTRAINT "Sae_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateTable
CREATE TABLE "SolChuva" (
    "numChuvas" INTEGER NOT NULL,
    "appoitmentId" INTEGER NOT NULL,

    CONSTRAINT "SolChuva_pkey" PRIMARY KEY ("appoitmentId")
);

-- CreateTable
CREATE TABLE "Dvss" (
    "question1" INTEGER,
    "question2" INTEGER,
    "question3" INTEGER,
    "question4" INTEGER,
    "question5" INTEGER,
    "question6" INTEGER,
    "question7" INTEGER,
    "question8" INTEGER,
    "question9" INTEGER,
    "question10" INTEGER,
    "appoitmentId" INTEGER NOT NULL,

    CONSTRAINT "Dvss_pkey" PRIMARY KEY ("appoitmentId")
);

-- CreateTable
CREATE TABLE "RomaIv" (
    "question1" BOOLEAN,
    "question2" BOOLEAN,
    "question3" BOOLEAN,
    "question4" BOOLEAN,
    "question5" BOOLEAN,
    "question6" BOOLEAN,
    "appoitmentId" INTEGER NOT NULL,

    CONSTRAINT "RomaIv_pkey" PRIMARY KEY ("appoitmentId")
);

-- CreateTable
CREATE TABLE "Diary" (
    "appointmentId" INTEGER NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateTable
CREATE TABLE "Drink" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diaryId" INTEGER NOT NULL,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Urine" (
    "id" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" DOUBLE PRECISION NOT NULL,
    "loss" "Losses" NOT NULL,
    "diaryId" INTEGER NOT NULL,

    CONSTRAINT "Urine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fae" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diaryId" INTEGER NOT NULL,

    CONSTRAINT "Fae_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_dateTime_nurseCpf_key" ON "Appointment"("dateTime", "nurseCpf");

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_numCoren_ufCoren_key" ON "Nurse"("numCoren", "ufCoren");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_nurseCpf_fkey" FOREIGN KEY ("nurseCpf") REFERENCES "Nurse"("userCpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_familyCpf_fkey" FOREIGN KEY ("familyCpf") REFERENCES "Family"("userCpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_dateTime_nurseCpf_fkey" FOREIGN KEY ("dateTime", "nurseCpf") REFERENCES "Availability"("dateTime", "nurseCpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sae" ADD CONSTRAINT "Sae_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolChuva" ADD CONSTRAINT "SolChuva_appoitmentId_fkey" FOREIGN KEY ("appoitmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dvss" ADD CONSTRAINT "Dvss_appoitmentId_fkey" FOREIGN KEY ("appoitmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RomaIv" ADD CONSTRAINT "RomaIv_appoitmentId_fkey" FOREIGN KEY ("appoitmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("appointmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Urine" ADD CONSTRAINT "Urine_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("appointmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fae" ADD CONSTRAINT "Fae_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("appointmentId") ON DELETE CASCADE ON UPDATE CASCADE;
