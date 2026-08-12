"use client";

import { BlockEditor } from "./block-editor";

interface PageEditorProps {
  pageId: string;
}

export function PageEditor({
  pageId,
}: PageEditorProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-8 py-12">
      <BlockEditor pageId={pageId} />
    </main>
  );
}