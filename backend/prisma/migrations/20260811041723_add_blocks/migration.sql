-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('PARAGRAPH', 'HEADING_1', 'HEADING_2', 'HEADING_3', 'BULLETED_LIST', 'NUMBERED_LIST', 'TODO', 'QUOTE', 'CODE', 'DIVIDER', 'IMAGE');

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "type" "BlockType" NOT NULL DEFAULT 'PARAGRAPH',
    "content" JSONB,
    "position" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Block_pageId_idx" ON "Block"("pageId");

-- CreateIndex
CREATE INDEX "Block_pageId_position_idx" ON "Block"("pageId", "position");

-- CreateIndex
CREATE INDEX "Block_pageId_isArchived_idx" ON "Block"("pageId", "isArchived");

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
