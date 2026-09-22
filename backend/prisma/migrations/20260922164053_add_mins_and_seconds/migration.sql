/*
  Warnings:

  - You are about to drop the column `time` on the `Leaderboard` table. All the data in the column will be lost.
  - Added the required column `mins` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seconds` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leaderboard" DROP COLUMN "time",
ADD COLUMN     "mins" INTEGER NOT NULL,
ADD COLUMN     "seconds" INTEGER NOT NULL;
