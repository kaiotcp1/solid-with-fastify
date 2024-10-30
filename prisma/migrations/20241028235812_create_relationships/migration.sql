/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `check-ins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `gyms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gym_Id` to the `check-ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `check-ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check-ins" ADD COLUMN     "gym_Id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "check-ins_id_key" ON "check-ins"("id");

-- CreateIndex
CREATE UNIQUE INDEX "gyms_id_key" ON "gyms"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "check-ins" ADD CONSTRAINT "check-ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check-ins" ADD CONSTRAINT "check-ins_gym_Id_fkey" FOREIGN KEY ("gym_Id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
