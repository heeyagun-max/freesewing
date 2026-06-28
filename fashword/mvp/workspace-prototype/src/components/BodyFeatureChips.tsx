import type { WorkspaceProject } from "../data/mockWorkspace";

type BodyFeatureChipsProps = {
  features: WorkspaceProject["bodyFeatures"];
  onToggleFeature: (id: string) => void;
};

export default function BodyFeatureChips({
  features,
  onToggleFeature,
}: BodyFeatureChipsProps) {
  return (
    <article className="panel" data-testid="body-feature-chips" aria-labelledby="features-title">
      <div className="panel-header">
        <p className="eyebrow">몸 특징</p>
        <h2 id="features-title">선택 항목</h2>
      </div>
      <div className="chip-list">
        {features.map((feature) => (
          <button
            className={`chip ${feature.selected ? "selected" : ""}`}
            key={feature.id}
            type="button"
            aria-pressed={feature.selected}
            onClick={() => onToggleFeature(feature.id)}
          >
            {feature.label}
          </button>
        ))}
      </div>
    </article>
  );
}
