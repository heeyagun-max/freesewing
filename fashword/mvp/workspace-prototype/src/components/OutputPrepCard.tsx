import type { WorkspaceProject } from "../data/mockWorkspace";

type OutputPrepCardProps = {
  items: WorkspaceProject["outputPrep"];
};

const stateLabel = {
  ready: "준비됨",
  check: "확인 필요",
};

export default function OutputPrepCard({ items }: OutputPrepCardProps) {
  return (
    <article className="panel" data-testid="output-prep" aria-labelledby="output-title">
      <div className="panel-header">
        <p className="eyebrow">출력 준비</p>
        <h2 id="output-title">출력 전 확인</h2>
      </div>
      <ul className="prep-list">
        {items.map((item) => (
          <li key={item.id} className={`prep-item ${item.state}`}>
            <div>
              <strong>{item.label}</strong>
              <p>{item.helper}</p>
            </div>
            <span>{stateLabel[item.state]}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
