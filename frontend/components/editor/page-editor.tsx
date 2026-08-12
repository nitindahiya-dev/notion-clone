"use client";

import { useEffect } from "react";

import { blockApi } from "@/lib/api/block";
import { useEditorStore } from "@/stores/editor.store";

import { BlockEditor } from "./block-editor";

interface PageEditorProps {
  pageId: string;
}

export function PageEditor({
  pageId,
}: PageEditorProps) {
  const setBlocks =
    useEditorStore(
      (state) => state.setBlocks,
    );

  const setLoading =
    useEditorStore(
      (state) => state.setLoading,
    );

  const isLoading =
    useEditorStore(
      (state) => state.isLoading,
    );

  useEffect(() => {
    let cancelled = false;

    async function loadBlocks() {
      try {
        setLoading(true);

        const blocks =
          await blockApi.list(pageId);

        if (!cancelled) {
          setBlocks(blocks);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBlocks();

    return () => {
      cancelled = true;
    };
  }, [
    pageId,
    setBlocks,
    setLoading,
  ]);

  if (isLoading) {
    return (
      <div className="py-8 text-gray-400">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <BlockEditor />
    </div>
  );
}