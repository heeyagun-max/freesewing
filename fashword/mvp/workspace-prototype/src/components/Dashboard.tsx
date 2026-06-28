import type { WorkspaceProject } from "../data/mockWorkspace";

type DashboardProps = {
  project: WorkspaceProject;
  onOpenWorkspace: () => void;
};

export default function Dashboard({ project, onOpenWorkspace }: DashboardProps) {
  return (
    <section className="dashboard" data-testid="dashboard" aria-labelledby="dashboard-title">
      <div className="dashboard-copy">
        <p className="eyebrow">오늘 이어서 만들기</p>
        <h1 id="dashboard-title">{project.garmentName} 제작 보드</h1>
        <p>
          치수 확인부터 패턴 보기, 출력 준비, 가봉 후 수정 기록까지 한 화면에서
          이어서 확인합니다.
        </p>
      </div>
      <article className="project-card">
        <div className="project-card-head">
          <div>
            <p className="card-label">{project.garmentType}</p>
            <h2>{project.garmentName}</h2>
          </div>
          <span className="status-pill">{project.currentStep}</span>
        </div>
        <dl className="project-meta">
          <div>
            <dt>최근 수정</dt>
            <dd>{project.updatedAtLabel}</dd>
          </div>
          <div>
            <dt>진행률</dt>
            <dd>{project.progressPercent}%</dd>
          </div>
        </dl>
        <div className="progress-track" aria-label={`진행률 ${project.progressPercent}%`}>
          <span style={{ width: `${project.progressPercent}%` }} />
        </div>
        <button className="button primary wide" type="button" onClick={onOpenWorkspace}>
          작업공간 열기
        </button>
      </article>
    </section>
  );
}
