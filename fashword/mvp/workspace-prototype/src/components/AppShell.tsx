import type { ReactNode } from "react";
import type { WorkspaceProject } from "../data/mockWorkspace";
import TopBar from "./TopBar";

type AppShellProps = {
  project: WorkspaceProject;
  children: ReactNode;
  onSave: () => void;
  onPreparePattern: () => void;
};

export default function AppShell({
  project,
  children,
  onSave,
  onPreparePattern,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <TopBar
        project={project}
        onSave={onSave}
        onPreparePattern={onPreparePattern}
      />
      <main className="app-main">{children}</main>
    </div>
  );
}
