/*
  Warnings:

  - Added the required column `daily_token_number` to the `QueueEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."QueueEntry" ADD COLUMN     "daily_token_number" INTEGER NOT NULL;
