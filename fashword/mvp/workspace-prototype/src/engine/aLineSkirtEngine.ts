import type { ConfirmedSketch, CorrectionLogSource } from "../data/mockWorkspace";

export type AlineSkirtInput = {
  waist: number;
  hip: number;
  waistToHip: number;
  skirtLength: number;
  hipEase: number;
  confirmedSketch?: ConfirmedSketch;
  correctionLogSources?: CorrectionLogSource[];
};

type Point = { x: number; y: number };
type Line = { x1: number; y1: number; x2: number; y2: number };

type PanelDraft = {
  path: string;
  waistline: string;
  hipline: string;
  hemline: string;
  grainline: Line;
  dart: { centerX: number; width: number; depth: number };
  hemY: number;
  hemHalfWidth: number;
};

export type AlineSkirtDraft = {
  measurements: AlineSkirtInput;
  front: PanelDraft;
  back: PanelDraft;
  preview: {
    height: number;
    hemWidth: number;
  };
  validation: {
    finishedWaist: number;
    finishedHip: number;
    totalDartIntake: number;
    sideSeamDifferenceRatio: number;
    scaleLabel: string;
  };
  report: {
    waist: {
      requested: number;
      finished: number;
      pass: boolean;
      message: string;
    };
    hip: {
      requested: number;
      ease: number;
      finished: number;
      pass: boolean;
      message: string;
    };
    sideSeam: {
      differenceRatio: number;
      pass: boolean;
      message: string;
    };
    correctionSources: Array<{
      id: string;
      label: string;
      message: string;
      fitRecord: string;
      nextAction: string;
    }>;
    messages: string[];
  };
  fitProxy: {
    body: {
      waistWidth: number;
      hipWidth: number;
    };
    skirt: {
      waistWidth: number;
      hipWidth: number;
      height: number;
      hemWidth: number;
    };
    checks: Array<{
      label: string;
      pass: boolean;
      message: string;
    }>;
    sketchReference: ConfirmedSketch;
  };
};

const fallbackConfirmedSketch: ConfirmedSketch = {
  sourceLabel: "도식화 컨펌본",
  views: ["앞면", "뒷면"],
  guides: ["허리선", "힙선", "밑단선"],
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)));
const round = (value: number) => Math.round(value * 1000) / 1000;
const lineLength = (from: Point, to: Point) => Math.hypot(to.x - from.x, to.y - from.y);

function panelPath(centerX: number, quarterWaist: number, quarterHip: number, hemHalfWidth: number, hipY: number, hemY: number) {
  const waistLeft = centerX - quarterWaist;
  const waistRight = centerX + quarterWaist;
  const hipLeft = centerX - quarterHip;
  const hipRight = centerX + quarterHip;
  const hemLeft = centerX - hemHalfWidth;
  const hemRight = centerX + hemHalfWidth;

  return {
    path: `M${round(waistLeft)} 54 C${round(centerX - quarterWaist * 0.35)} 48 ${round(centerX + quarterWaist * 0.35)} 48 ${round(waistRight)} 54 L${round(hemRight)} ${round(hemY)} C${round(centerX + hemHalfWidth * 0.38)} ${round(hemY + 8)} ${round(centerX - hemHalfWidth * 0.38)} ${round(hemY + 8)} ${round(hemLeft)} ${round(hemY)} Z`,
    waistline: `M${round(waistLeft)} 54 C${round(centerX - quarterWaist * 0.35)} 48 ${round(centerX + quarterWaist * 0.35)} 48 ${round(waistRight)} 54`,
    hipline: `M${round(hipLeft)} ${round(hipY)} C${round(centerX - quarterHip * 0.35)} ${round(hipY + 8)} ${round(centerX + quarterHip * 0.35)} ${round(hipY + 8)} ${round(hipRight)} ${round(hipY)}`,
    hemline: `M${round(hemLeft)} ${round(hemY - 16)} C${round(centerX - hemHalfWidth * 0.4)} ${round(hemY - 4)} ${round(centerX + hemHalfWidth * 0.4)} ${round(hemY - 4)} ${round(hemRight)} ${round(hemY - 16)}`,
    grainline: { x1: centerX, y1: 54, x2: centerX, y2: hemY },
    dart: {
      centerX,
      width: round(Math.max(1.5, quarterHip - quarterWaist) * 0.32),
      depth: round(Math.max(9, hipY - 14)),
    },
    hemY: round(hemY),
    hemHalfWidth: round(hemHalfWidth),
  };
}

export function draftAlineSkirt(input: AlineSkirtInput): AlineSkirtDraft {
  const measurements = {
    ...input,
    skirtLength: clamp(input.skirtLength, 48, 90),
    waistToHip: Math.max(12, input.waistToHip),
    hipEase: Math.max(0, input.hipEase),
  };

  const finishedHip = measurements.hip + measurements.hipEase;
  const quarterWaist = measurements.waist / 4;
  const quarterHip = finishedHip / 4;
  const lengthRatio = (measurements.skirtLength - 48) / 42;
  const hipY = 54 + measurements.waistToHip * 2.1;
  const hemY = 206 + lengthRatio * 62;
  const hemHalfWidth = quarterHip + 32 + lengthRatio * 24;

  const front = panelPath(170, quarterWaist, quarterHip, hemHalfWidth, hipY, hemY);
  const back = panelPath(374, quarterWaist, quarterHip + 1, hemHalfWidth + 2, hipY, hemY);

  const frontSide = lineLength({ x: 170 + quarterWaist, y: 54 }, { x: 170 + hemHalfWidth, y: hemY });
  const backSide = lineLength({ x: 374 + quarterWaist, y: 54 }, { x: 374 + hemHalfWidth + 2, y: hemY });
  const sideSeamDifferenceRatio = round(Math.abs(frontSide - backSide) / frontSide);
  const waistMessage = `PASS: 허리 완성 ${measurements.waist}cm가 입력 허리와 일치한다.`;
  const hipMessage = `PASS: 힙 완성 ${finishedHip}cm는 입력 힙 ${measurements.hip}cm에 여유 ${measurements.hipEase}cm를 더했다.`;
  const sideSeamPass = sideSeamDifferenceRatio <= 0.02;
  const sideSeamMessage = sideSeamPass ? "PASS: 옆선 오차가 2% 이내다." : "FAIL: 옆선 오차가 2%를 넘는다.";
  const skirtLengthMessage = `PASS: 스커트 길이 ${measurements.skirtLength}cm로 제도 범위 안에 있다.`;
  const hipEaseMessage = `PASS: 힙 여유량은 ${measurements.hipEase}cm로 음수 없이 정규화됐다.`;
  const correctionSources =
    input.correctionLogSources?.map((source) => ({
      id: source.id,
      label: source.sourceLabel,
      message: `${source.dateLabel} · ${source.request}`,
      fitRecord: source.fitRecord,
      nextAction: source.nextAction,
    })) ?? [];
  const preview = {
    height: round(116 + lengthRatio * 72),
    hemWidth: round(118 + lengthRatio * 44),
  };
  const report = {
    waist: {
      requested: input.waist,
      finished: measurements.waist,
      pass: measurements.waist === input.waist,
      message: waistMessage,
    },
    hip: {
      requested: measurements.hip,
      ease: measurements.hipEase,
      finished: finishedHip,
      pass: finishedHip === measurements.hip + measurements.hipEase,
      message: hipMessage,
    },
    sideSeam: {
      differenceRatio: sideSeamDifferenceRatio,
      pass: sideSeamPass,
      message: sideSeamMessage,
    },
    correctionSources,
    messages: [waistMessage, hipMessage, sideSeamMessage, skirtLengthMessage, hipEaseMessage],
  };

  return {
    measurements,
    front,
    back,
    preview,
    validation: {
      finishedWaist: measurements.waist,
      finishedHip,
      totalDartIntake: round(Math.max(0, finishedHip - measurements.waist)),
      sideSeamDifferenceRatio,
      scaleLabel: "검산용 1차 SVG",
    },
    report,
    fitProxy: {
      body: {
        waistWidth: measurements.waist,
        hipWidth: measurements.hip,
      },
      skirt: {
        waistWidth: measurements.waist,
        hipWidth: finishedHip,
        height: preview.height,
        hemWidth: preview.hemWidth,
      },
      checks: [
        { label: "허리 확인", pass: report.waist.pass, message: report.waist.message },
        { label: "힙 확인", pass: report.hip.pass, message: report.hip.message },
        { label: "옆선 확인", pass: report.sideSeam.pass, message: report.sideSeam.message },
      ],
      sketchReference: input.confirmedSketch ?? fallbackConfirmedSketch,
    },
  };
}
