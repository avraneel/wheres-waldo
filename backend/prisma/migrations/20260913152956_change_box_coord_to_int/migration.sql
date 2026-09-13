/*
  Warnings:

  - You are about to alter the column `x` on the `Characters` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `y` on the `Characters` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Characters" ALTER COLUMN "x" SET DATA TYPE INTEGER,
ALTER COLUMN "y" SET DATA TYPE INTEGER;
