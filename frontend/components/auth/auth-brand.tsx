import { FileText } from "lucide-react";

export function AuthBrand() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
        <FileText className="size-4" />
      </div>

      <span className="text-lg font-semibold tracking-tight">
        Notion Clone
      </span>
    </div>
  );
}