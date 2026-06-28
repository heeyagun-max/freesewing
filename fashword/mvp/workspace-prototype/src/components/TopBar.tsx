import type { WorkspaceProject } from "../data/mockWorkspace";

type TopBarProps = {
  project: WorkspaceProject;
  onSave: () => void;
  onPreparePattern: () => void;
};

export default function TopBar({ project, onSave, onPreparePattern }: TopBarProps) {
  return (
    <header className="top-bar" data-testid="top-bar">
      <div className="brand-area">
        <span className="brand-mark" aria-hidden="true">F</span>
        <div>
          <p className="brand-name">FASHword</p>
          <p className="current-garment">현재 의복: {project.garmentName}</p>
        </div>
      </div>
      <div className="top-actions">
        <button
          className="button secondary"
          type="button"
          aria-label="현재 작업 저장"
          onClick={onSave}
        >
          저장
        </button>
        <button
          className="button primary"
          type="button"
          aria-label="제작 기록 확인"
          onClick={onPreparePattern}
        >
          제작 기록 확인
        </button>
      </div>
    </header>
  );
}
