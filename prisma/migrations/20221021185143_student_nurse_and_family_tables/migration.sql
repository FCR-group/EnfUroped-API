/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'NURSE', 'FAMILY');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORD_RECOVERY', 'EMAIL_VALIDATION');

-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('WITH_FOLLOW_UP', 'WITHOUT_FOLLOW_UP', 'RELAPSE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "type" "UserType" NOT NULL;

-- CreateTable
CREATE TABLE "Token" (
    "uuid" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "type" "TokenType" NOT NULL,
    "userCpf" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Student" (
    "userCpf" TEXT NOT NULL,
    "isPermitted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("userCpf")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authors" TEXT[],
    "reviewers" TEXT[],
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "video" TEXT,
    "content" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerCpf" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Nurse" (
    "userCpf" TEXT NOT NULL,
    "isPermitted" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Nurse_pkey" PRIMARY KEY ("userCpf")
);

-- CreateTable
CREATE TABLE "Availability" (
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("dateTime")
);

-- CreateTable
CREATE TABLE "Family" (
    "userCpf" TEXT NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("userCpf")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "status" "PatientStatus" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "familyCpf" TEXT NOT NULL,
    "nurseCpf" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "fromNurse" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nurseCpf" TEXT,
    "familyCpf" TEXT,
    "responseId" INTEGER,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AvailabilityToNurse" (
    "A" TIMESTAMP(3) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_responseId_key" ON "Message"("responseId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AvailabilityToNurse_AB_unique" ON "_AvailabilityToNurse"("A", "B");

-- CreateIndex
CREATE INDEX "_AvailabilityToNurse_B_index" ON "_AvailabilityToNurse"("B");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ownerCpf_fkey" FOREIGN KEY ("ownerCpf") REFERENCES "Student"("userCpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nurse" ADD CONSTRAINT "Nurse_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_familyCpf_fkey" FOREIGN KEY ("familyCpf") REFERENCES "Family"("userCpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_nurseCpf_fkey" FOREIGN KEY ("nurseCpf") REFERENCES "Nurse"("userCpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_nurseCpf_fkey" FOREIGN KEY ("nurseCpf") REFERENCES "Nurse"("userCpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_familyCpf_fkey" FOREIGN KEY ("familyCpf") REFERENCES "Family"("userCpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailabilityToNurse" ADD CONSTRAINT "_AvailabilityToNurse_A_fkey" FOREIGN KEY ("A") REFERENCES "Availability"("dateTime") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailabilityToNurse" ADD CONSTRAINT "_AvailabilityToNurse_B_fkey" FOREIGN KEY ("B") REFERENCES "Nurse"("userCpf") ON DELETE CASCADE ON UPDATE CASCADE;
