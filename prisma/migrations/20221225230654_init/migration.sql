-- CreateEnum
CREATE TYPE "OrgType" AS ENUM ('commerce', 'non_commerce');

-- CreateTable
CREATE TABLE "UserModel" (
    "id" UUID NOT NULL,
    "firstname" TEXT,
    "middlename" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "age" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "competence" TEXT
);

-- CreateTable
CREATE TABLE "UserToOrganizationModel" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "orgId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "OrganizationModel" (
    "id" UUID NOT NULL,
    "orgname" TEXT NOT NULL,
    "orgabbr" TEXT NOT NULL,
    "orgtype" "OrgType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_id_key" ON "UserModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserToOrganizationModel_id_key" ON "UserToOrganizationModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationModel_id_key" ON "OrganizationModel"("id");

-- AddForeignKey
ALTER TABLE "UserToOrganizationModel" ADD CONSTRAINT "UserToOrganizationModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToOrganizationModel" ADD CONSTRAINT "UserToOrganizationModel_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "OrganizationModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
