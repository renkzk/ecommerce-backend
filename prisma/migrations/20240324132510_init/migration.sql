-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "image" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
