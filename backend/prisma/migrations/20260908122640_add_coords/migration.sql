/*
  Warnings:

  - Added the required column `x` to the `Characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Characters" ADD COLUMN     "x" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y" DOUBLE PRECISION NOT NULL;
