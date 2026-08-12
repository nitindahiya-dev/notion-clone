import type { Block } from "@/types/block";

interface BlockRendererProps {
  block: Block;
}

export function BlockRenderer({
  block,
}: BlockRendererProps) {
  const content =
    typeof block.content === "string"
      ? block.content
      : "";

  switch (block.type) {
    case "HEADING_1":
      return (
        <h1 className="text-4xl font-bold">
          {content}
        </h1>
      );

    case "HEADING_2":
      return (
        <h2 className="text-3xl font-bold">
          {content}
        </h2>
      );

    case "HEADING_3":
      return (
        <h3 className="text-2xl font-semibold">
          {content}
        </h3>
      );

    case "BULLETED_LIST":
      return (
        <ul className="list-disc pl-6">
          <li>{content}</li>
        </ul>
      );

    case "NUMBERED_LIST":
      return (
        <ol className="list-decimal pl-6">
          <li>{content}</li>
        </ol>
      );

    case "TODO":
      return (
        <div className="flex gap-2">
          <input type="checkbox" />
          <span>{content}</span>
        </div>
      );

    case "QUOTE":
      return (
        <blockquote className="border-l-4 pl-4 italic">
          {content}
        </blockquote>
      );

    case "CODE":
      return (
        <pre className="rounded-md bg-muted p-4">
          <code>{content}</code>
        </pre>
      );

    case "DIVIDER":
      return <hr />;

    case "IMAGE":
      return content ? (
        <img
          src={content}
          alt=""
          className="max-w-full rounded-md"
        />
      ) : null;

    case "PARAGRAPH":
    default:
      return <p>{content}</p>;
  }
}