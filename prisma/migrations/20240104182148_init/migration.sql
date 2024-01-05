-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "published_year" TEXT NOT NULL,
    "num_pages" INTEGER NOT NULL,
    "average_rating" DOUBLE PRECISION NOT NULL,
    "ratings_count" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
