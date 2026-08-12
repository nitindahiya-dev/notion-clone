"use client";

import { useEffect } from "react";

import { blockApi } from "@/lib/api/block";
import { useEditorStore } from "@/stores/editor.store";

import { BlockItem } from "./block-item";

interface BlockEditorProps {
  pageId: string;
}

export function BlockEditor({
  pageId,
}: BlockEditorProps) {
  const {
    blocks,
    setBlocks,
    isLoading,
    setLoading,
  } = useEditorStore();

  useEffect(() => {
    let mounted = true;

    async function loadBlocks() {
      try {
        setLoading(true);

        const data =
          await blockApi.list(pageId);

        if (mounted) {
          setBlocks(
            data.filter(
              (block) => !block.isArchived,
            ),
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadBlocks();

    return () => {
      mounted = false;
    };
  }, [
    pageId,
    setBlocks,
    setLoading,
  ]);

  if (isLoading) {
    return (
      <div className="py-8 text-sm text-muted-foreground">
        Loading blocks...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {blocks.map((block) => (
        <BlockItem
          key={block.id}
          block={block}
        />
      ))}

      {blocks.length === 0 && (
        <div className="py-8 text-sm text-muted-foreground">
          This page is empty.
        </div>
      )}
    </div>
  );
}