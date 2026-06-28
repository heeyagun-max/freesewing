import type { WorkspaceProject } from "../data/mockWorkspace";
import type { AlineSkirtDraft } from "../engine/aLineSkirtEngine";
import TodayTasks from "./TodayTasks";
import ProgressStatus from "./ProgressStatus";
import PatternPreview from "./PatternPreview";
import ThreeDPreview from "./ThreeDPreview";
import MeasurementsForm from "./MeasurementsForm";
import BodyFeatureChips from "./BodyFeatureChips";
import OutputPrepCard from "./OutputPrepCard";
import FittingNotes from "./FittingNotes";

type WorkspaceProps = {
  project: WorkspaceProject;
  measurements: WorkspaceProject["measurements"];
  bodyFeatures: WorkspaceProject["bodyFeatures"];
  patternStatus: string;
  skirtLength: number;
  skirtDraft: AlineSkirtDraft;
  saveStatus: string;
  onMeasurementChange: (id: string, value: string) => void;
  onSkirtLengthChange: (value: number) => void;
  onToggleFeature: (id: string) => void;
};

export default function Workspace({
  project,
  measurements,
  bodyFeatures,
  patternStatus,
  skirtLength,
  skirtDraft,
  saveStatus,
  onMeasurementChange,
  onSkirtLengthChange,
  onToggleFeature,
}: WorkspaceProps) {
  return (
    <section className="workspace" data-testid="workspace" aria-labelledby="workspace-title">
      <div className="workspace-head">
        <div>
          <p className="eyebrow">Project Workspace</p>
          <h1 id="workspace-title">{project.garmentName}</h1>
        </div>
        {saveStatus ? <p className="save-status" role="status">{saveStatus}</p> : null}
      </div>

      <div className="summary-grid">
        <TodayTasks tasks={project.tasks} />
        <ProgressStatus project={project} />
      </div>

      <div className="preview-grid">
        <PatternPreview
          status={patternStatus}
          skirtLength={skirtLength}
          draft={skirtDraft}
          onSkirtLengthChange={onSkirtLengthChange}
        />
        <ThreeDPreview skirtLength={skirtLength} draft={skirtDraft} />
      </div>

      <div className="workspace-grid">
        <MeasurementsForm
          measurements={measurements}
          onMeasurementChange={onMeasurementChange}
        />
        <BodyFeatureChips features={bodyFeatures} onToggleFeature={onToggleFeature} />
        <OutputPrepCard items={project.outputPrep} />
      </div>

      <FittingNotes notes={project.fittingNotes} />
    </section>
  );
}
