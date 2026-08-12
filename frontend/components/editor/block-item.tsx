"use client";

import { BlockRenderer } from "./block-renderer";

import type { Block } from "@/types/block";

interface BlockItemProps {
  block: Block;
}

export function BlockItem({
  block,
}: BlockItemProps) {
  return (
    <div
      className="group relative min-h-8 rounded-md px-2 py-1 hover:bg-muted/40"
      data-block-id={block.id}
    >
      <BlockRenderer block={block} />
    </div>
  );
}