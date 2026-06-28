import type { WorkspaceProject } from "../data/mockWorkspace";

type TodayTasksProps = {
  tasks: WorkspaceProject["tasks"];
};

const statusLabel = {
  todo: "예정",
  doing: "진행 중",
  done: "완료",
};

export default function TodayTasks({ tasks }: TodayTasksProps) {
  return (
    <article className="panel" data-testid="today-tasks" aria-labelledby="today-tasks-title">
      <div className="panel-header">
        <p className="eyebrow">오늘 할 일</p>
        <h2 id="today-tasks-title">제작 순서</h2>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.status}`}>
            <span className="task-dot" aria-hidden="true" />
            <span>{task.title}</span>
            <strong>{statusLabel[task.status]}</strong>
          </li>
        ))}
      </ul>
    </article>
  );
}
