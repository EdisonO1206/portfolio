-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "used" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" VARCHAR(100),
ADD COLUMN     "password" TEXT;
