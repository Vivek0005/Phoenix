/*
  Warnings:

  - The primary key for the `Gadget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `status` column on the `Gadget` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Available', 'Deployed', 'Destroyed', 'Decommissioned');

-- AlterTable
ALTER TABLE "Gadget" DROP CONSTRAINT "Gadget_pkey",
ADD COLUMN     "decommissionedAt" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Available',
ADD CONSTRAINT "Gadget_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Gadget_id_seq";
