import type {
  Workspace,
} from "@/types/workspace";

interface WorkspaceMembersProps {
  workspace: Workspace;
}

export function WorkspaceMembers({
  workspace,
}: WorkspaceMembersProps) {
  return (
    <div className="rounded-lg border p-5">
      <h2 className="font-semibold">
        Members
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Member management will be
        implemented next.
      </p>

      <div className="mt-4 rounded-md bg-muted p-3 text-sm">
        Your role:{" "}
        <strong>
          {workspace.membership.role}
        </strong>
      </div>
    </div>
  );
}