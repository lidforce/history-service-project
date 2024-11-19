-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "shopId" INTEGER,
    "plu" TEXT,
    "action" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);
