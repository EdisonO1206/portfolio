-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100),
    "description" TEXT,
    "creation_date" TIMESTAMP(6),
    "url" VARCHAR(255),
    "technologies" VARCHAR(255),
    "image" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "lastname" VARCHAR(100),
    "document" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "creation_date" TIMESTAMP(6),
    "expiration_date" TIMESTAMP(6),

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);
