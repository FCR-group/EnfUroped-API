/*
  Warnings:

  - A unique constraint covering the columns `[dateTime]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_dateTime_key" ON "Appointment"("dateTime");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_dateTime_fkey" FOREIGN KEY ("dateTime") REFERENCES "Availability"("dateTime") ON DELETE RESTRICT ON UPDATE CASCADE;
