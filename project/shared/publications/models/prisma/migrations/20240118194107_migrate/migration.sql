-- CreateTable
CREATE TABLE "publications" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_publications" (
    "link" TEXT NOT NULL,
    "link_description" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "photo_publications" (
    "photo_id" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "quote_publications" (
    "quote_author" TEXT,
    "quote_text" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "text_publications" (
    "announcement" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "video_publications" (
    "title" TEXT NOT NULL,
    "video_link" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "reposts" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "original_user_id" TEXT NOT NULL,
    "publication_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "reposts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "publicationId" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "publicationId" TEXT,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "publicationId" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "link_publications_publicationId_key" ON "link_publications"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "photo_publications_publicationId_key" ON "photo_publications"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "quote_publications_publicationId_key" ON "quote_publications"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "text_publications_publicationId_key" ON "text_publications"("publicationId");

-- CreateIndex
CREATE INDEX "text_publications_title_idx" ON "text_publications"("title");

-- CreateIndex
CREATE UNIQUE INDEX "video_publications_publicationId_key" ON "video_publications"("publicationId");

-- CreateIndex
CREATE INDEX "video_publications_title_idx" ON "video_publications"("title");

-- AddForeignKey
ALTER TABLE "link_publications" ADD CONSTRAINT "link_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_publications" ADD CONSTRAINT "photo_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_publications" ADD CONSTRAINT "quote_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_publications" ADD CONSTRAINT "text_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_publications" ADD CONSTRAINT "video_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
