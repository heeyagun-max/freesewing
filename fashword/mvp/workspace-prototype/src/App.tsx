import { useMemo, useState } from "react";
import { workspaceProject } from "./data/mockWorkspace";
import type { WorkspaceProject } from "./data/mockWorkspace";
import { draftAlineSkirt } from "./engine/aLineSkirtEngine";
import AppShell from "./components/AppShell";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";

type ActiveView = "dashboard" | "workspace";

const getMeasurementNumber = (measurements: WorkspaceProject["measurements"], id: string, fallback: number) => {
  const value = Number(measurements.find((measurement) => measurement.id === id)?.value);
  return Number.isFinite(value) ? value : fallback;
};

export default function App() {
  const project = workspaceProject;
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [measurements, setMeasurements] = useState(project.measurements);
  const [bodyFeatures, setBodyFeatures] = useState(project.bodyFeatures);
  const initialSkirtLength = Number(
    project.measurements.find((measurement) => measurement.id === "skirtLength")?.value ?? 72,
  );
  const [skirtLength, setSkirtLength] = useState(initialSkirtLength);
  const [patternStatus, setPatternStatus] = useState("A라인 미디 스커트 패턴을 확인하고 있습니다.");
  const [saveStatus, setSaveStatus] = useState("");

  const selectedProject: WorkspaceProject = useMemo(
    () => ({
      ...project,
      measurements,
      bodyFeatures,
    }),
    [bodyFeatures, measurements, project],
  );

  const skirtDraft = useMemo(
    () =>
      draftAlineSkirt({
        waist: getMeasurementNumber(measurements, "waist", 70),
        hip: getMeasurementNumber(measurements, "hip", 94),
        waistToHip: getMeasurementNumber(measurements, "waistToHip", 20),
        skirtLength,
        hipEase: getMeasurementNumber(measurements, "ease", 4),
        confirmedSketch: selectedProject.confirmedSketch,
        correctionLogSources: selectedProject.fittingNotes,
      }),
    [measurements, selectedProject.confirmedSketch, selectedProject.fittingNotes, skirtLength],
  );

  const handleSave = () => {
    setSaveStatus("작업 내용이 이 화면에 반영되었습니다.");
  };

  const handlePreparePattern = () => {
    setPatternStatus("제작 기록을 확인할 준비가 되었습니다.");
    setActiveView("workspace");
  };

  const syncSkirtLength = (nextLength: number) => {
    const boundedLength = Math.min(90, Math.max(48, Math.round(nextLength)));
    setSkirtLength(boundedLength);
    setMeasurements((items) =>
      items.map((item) =>
        item.id === "skirtLength" ? { ...item, value: String(boundedLength) } : item,
      ),
    );
    setPatternStatus(`${boundedLength}cm A라인 스커트 길이를 미리 봅니다.`);
  };

  const handleMeasurementChange = (id: string, value: string) => {
    setMeasurements((items) =>
      items.map((item) => (item.id === id ? { ...item, value } : item)),
    );

    if (id === "skirtLength") {
      const numericValue = Number(value);
      if (Number.isFinite(numericValue)) {
        syncSkirtLength(numericValue);
      }
    }
  };

  return (
    <AppShell
      project={selectedProject}
      onSave={handleSave}
      onPreparePattern={handlePreparePattern}
    >
      {activeView === "dashboard" ? (
        <Dashboard project={selectedProject} onOpenWorkspace={() => setActiveView("workspace")} />
      ) : (
        <Workspace
          project={selectedProject}
          measurements={measurements}
          bodyFeatures={bodyFeatures}
          patternStatus={patternStatus}
          skirtLength={skirtLength}
          skirtDraft={skirtDraft}
          saveStatus={saveStatus}
          onMeasurementChange={handleMeasurementChange}
          onSkirtLengthChange={syncSkirtLength}
          onToggleFeature={(id) =>
            setBodyFeatures((items) =>
              items.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item,
              ),
            )
          }
        />
      )}
    </AppShell>
  );
}
