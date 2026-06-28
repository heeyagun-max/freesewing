import type { WorkspaceProject } from "../data/mockWorkspace";

type MeasurementsFormProps = {
  measurements: WorkspaceProject["measurements"];
  onMeasurementChange: (id: string, value: string) => void;
};

export default function MeasurementsForm({
  measurements,
  onMeasurementChange,
}: MeasurementsFormProps) {
  return (
    <form className="panel form-panel" data-testid="measurements-form" aria-labelledby="measurements-title">
      <div className="panel-header">
        <p className="eyebrow">내 치수</p>
        <h2 id="measurements-title">치수 입력</h2>
      </div>
      <div className="measurement-grid">
        {measurements.map((measurement) => {
          const inputId = `measurement-${measurement.id}`;
          return (
            <div className="field" key={measurement.id}>
              <label htmlFor={inputId}>{measurement.label}</label>
              <div className="input-wrap">
                <input
                  id={inputId}
                  inputMode="decimal"
                  value={measurement.value}
                  onChange={(event) => onMeasurementChange(measurement.id, event.target.value)}
                />
                <span>{measurement.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
