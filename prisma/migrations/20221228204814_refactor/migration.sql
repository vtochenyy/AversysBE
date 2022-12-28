/*
  Warnings:

  - You are about to drop the `UsersLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersLogs" DROP CONSTRAINT "UsersLogs_userId_fkey";

-- DropTable
DROP TABLE "UsersLogs";

-- CreateTable
CREATE TABLE "UsersLogsModel" (
    "id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "userId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "ErrorDictModel" (
    "id" UUID NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersLogsModel_id_key" ON "UsersLogsModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorDictModel_id_key" ON "ErrorDictModel"("id");

-- AddForeignKey
ALTER TABLE "UsersLogsModel" ADD CONSTRAINT "UsersLogsModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
