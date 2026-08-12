"use client";

import { useEditorStore } from "@/stores/editor.store";

export function BlockEditor() {
  const blocks = useEditorStore(
    (state) => state.blocks,
  );

  if (blocks.length === 0) {
    return (
      <div className="py-4 text-gray-400">
        Start writing...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {blocks.map((block) => (
        <div
          key={block.id}
          className="rounded px-2 py-1"
        >
          <div className="text-xs text-gray-400">
            {block.type}
          </div>

          <div>
            {String(
              block.content ?? "",
            )}
          </div>
        </div>
      ))}
    </div>
  );
}