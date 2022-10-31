/*
  Warnings:

  - The primary key for the `Dvss` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appoitmentId` on the `Dvss` table. All the data in the column will be lost.
  - The primary key for the `RomaIv` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appoitmentId` on the `RomaIv` table. All the data in the column will be lost.
  - Added the required column `appointmentId` to the `Dvss` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointmentId` to the `RomaIv` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dvss" DROP CONSTRAINT "Dvss_appoitmentId_fkey";

-- DropForeignKey
ALTER TABLE "RomaIv" DROP CONSTRAINT "RomaIv_appoitmentId_fkey";

-- AlterTable
ALTER TABLE "Dvss" DROP CONSTRAINT "Dvss_pkey",
DROP COLUMN "appoitmentId",
ADD COLUMN     "appointmentId" INTEGER NOT NULL,
ADD CONSTRAINT "Dvss_pkey" PRIMARY KEY ("appointmentId");

-- AlterTable
ALTER TABLE "RomaIv" DROP CONSTRAINT "RomaIv_pkey",
DROP COLUMN "appoitmentId",
ADD COLUMN     "appointmentId" INTEGER NOT NULL,
ADD CONSTRAINT "RomaIv_pkey" PRIMARY KEY ("appointmentId");

-- AddForeignKey
ALTER TABLE "Dvss" ADD CONSTRAINT "Dvss_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RomaIv" ADD CONSTRAINT "RomaIv_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
