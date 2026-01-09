/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `otp_codes` will be added. If there are existing duplicate values, this will fail.
  - Made the column `token` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `used` on table `tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "token" SET NOT NULL,
ALTER COLUMN "used" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_code_key" ON "otp_codes"("code");
