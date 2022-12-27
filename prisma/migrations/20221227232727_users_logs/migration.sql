-- CreateTable
CREATE TABLE "UsersLogs" (
    "id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "userId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersLogs_id_key" ON "UsersLogs"("id");

-- AddForeignKey
ALTER TABLE "UsersLogs" ADD CONSTRAINT "UsersLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
