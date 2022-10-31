/*
  Warnings:

  - The primary key for the `SolChuva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appoitmentId` on the `SolChuva` table. All the data in the column will be lost.
  - Added the required column `appointmentId` to the `SolChuva` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SolChuva" DROP CONSTRAINT "SolChuva_appoitmentId_fkey";

-- AlterTable
ALTER TABLE "SolChuva" DROP CONSTRAINT "SolChuva_pkey",
DROP COLUMN "appoitmentId",
ADD COLUMN     "appointmentId" INTEGER NOT NULL,
ADD CONSTRAINT "SolChuva_pkey" PRIMARY KEY ("appointmentId");

-- AddForeignKey
ALTER TABLE "SolChuva" ADD CONSTRAINT "SolChuva_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
