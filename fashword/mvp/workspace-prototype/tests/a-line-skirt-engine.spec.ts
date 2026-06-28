import { expect, test } from "@playwright/test";
import { draftAlineSkirt } from "../src/engine/aLineSkirtEngine";

test("drafts A-line skirt geometry from tester measurements", () => {
  const draft = draftAlineSkirt({
    waist: 70,
    hip: 94,
    waistToHip: 20,
    skirtLength: 72,
    hipEase: 4,
  });

  expect(draft.measurements.skirtLength).toBe(72);
  expect(draft.validation.finishedHip).toBe(98);
  expect(draft.front.path).toContain("M");
  expect(draft.back.path).toContain("M");
  expect(draft.front.grainline.y2).toBeGreaterThan(draft.front.grainline.y1);
  expect(draft.validation.sideSeamDifferenceRatio).toBeLessThanOrEqual(0.02);
});

test("longer request changes hem depth and preview silhouette", () => {
  const base = draftAlineSkirt({ waist: 70, hip: 94, waistToHip: 20, skirtLength: 72, hipEase: 4 });
  const longer = draftAlineSkirt({ waist: 70, hip: 94, waistToHip: 20, skirtLength: 76, hipEase: 4 });

  expect(longer.measurements.skirtLength).toBe(76);
  expect(longer.front.hemY).toBeGreaterThan(base.front.hemY);
  expect(longer.front.hemHalfWidth).toBeGreaterThan(base.front.hemHalfWidth);
  expect(longer.preview.height).toBeGreaterThan(base.preview.height);
  expect(longer.preview.hemWidth).toBeGreaterThan(base.preview.hemWidth);
});

test("normalizes unsafe inputs before draft validation report", () => {
  const draft = draftAlineSkirt({ waist: 70, hip: 94, waistToHip: 20, skirtLength: 112, hipEase: -6 });
  const shortDraft = draftAlineSkirt({ waist: 70, hip: 94, waistToHip: 20, skirtLength: 31, hipEase: 4 });

  expect(draft.measurements.skirtLength).toBe(90);
  expect(shortDraft.measurements.skirtLength).toBe(48);
  expect(draft.measurements.hipEase).toBe(0);
  expect(draft.validation.finishedHip).toBe(94);
  expect(draft.report.messages).toContain("PASS: 스커트 길이 90cm로 제도 범위 안에 있다.");
  expect(draft.report.messages).toContain("PASS: 힙 여유량은 0cm로 음수 없이 정규화됐다.");
  expect(shortDraft.report.messages).toContain("PASS: 스커트 길이 48cm로 제도 범위 안에 있다.");
});

test("returns output draft report with waist hip and side seam checks", () => {
  const draft = draftAlineSkirt({ waist: 70, hip: 94, waistToHip: 20, skirtLength: 72, hipEase: 4 });

  expect(draft.report.waist).toEqual({
    requested: 70,
    finished: 70,
    pass: true,
    message: "PASS: 허리 완성 70cm가 입력 허리와 일치한다.",
  });
  expect(draft.report.hip).toEqual({
    requested: 94,
    ease: 4,
    finished: 98,
    pass: true,
    message: "PASS: 힙 완성 98cm는 입력 힙 94cm에 여유 4cm를 더했다.",
  });
  expect(draft.report.sideSeam.pass).toBe(true);
  expect(draft.report.sideSeam.message).toBe("PASS: 옆선 오차가 2% 이내다.");
  expect(draft.report.messages).toEqual([
    draft.report.waist.message,
    draft.report.hip.message,
    draft.report.sideSeam.message,
    "PASS: 스커트 길이 72cm로 제도 범위 안에 있다.",
    "PASS: 힙 여유량은 4cm로 음수 없이 정규화됐다.",
  ]);
});

test("returns 3d fitting proxy values from the same draft measurements and report", () => {
  const draft = draftAlineSkirt({ waist: 70, hip: 94, waistToHip: 20, skirtLength: 72, hipEase: 4 });

  expect(draft.fitProxy.body).toEqual({
    waistWidth: 70,
    hipWidth: 94,
  });
  expect(draft.fitProxy.skirt).toEqual({
    waistWidth: 70,
    hipWidth: 98,
    height: draft.preview.height,
    hemWidth: draft.preview.hemWidth,
  });
  expect(draft.fitProxy.checks).toEqual([
    { label: "허리 확인", pass: true, message: draft.report.waist.message },
    { label: "힙 확인", pass: true, message: draft.report.hip.message },
    { label: "옆선 확인", pass: true, message: draft.report.sideSeam.message },
  ]);
});

test("links 3d fitting proxy to confirmed front and back flat sketch views", () => {
  const draft = draftAlineSkirt({ waist: 70, hip: 94, waistToHip: 20, skirtLength: 72, hipEase: 4 });

  expect(draft.fitProxy.sketchReference).toEqual({
    sourceLabel: "도식화 컨펌본",
    views: ["앞면", "뒷면"],
    guides: ["허리선", "힙선", "밑단선"],
  });
});
