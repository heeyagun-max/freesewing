import type { WorkspaceProject } from "../data/mockWorkspace";

type ProgressStatusProps = {
  project: WorkspaceProject;
};

export default function ProgressStatus({ project }: ProgressStatusProps) {
  return (
    <article className="panel" data-testid="progress-status" aria-labelledby="progress-title">
      <div className="panel-header">
        <p className="eyebrow">진행 상태</p>
        <h2 id="progress-title">첫 패턴에서 검토된 패턴으로</h2>
      </div>
      <div className="progress-track large" aria-label={`현재 진행률 ${project.progressPercent}%`}>
        <span style={{ width: `${project.progressPercent}%` }} />
      </div>
      <div className="progress-detail">
        <span>첫 패턴</span>
        <strong>{project.progressPercent}%</strong>
        <span>검토된 패턴</span>
      </div>
      <p className="muted">다음 작업: 스커트 길이와 밑단 폭 확인</p>
    </article>
  );
}
