/*
  Warnings:

  - You are about to drop the column `rank` on the `Leaderboard` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Leaderboard_rank_key";

-- AlterTable
ALTER TABLE "Leaderboard" DROP COLUMN "rank";
