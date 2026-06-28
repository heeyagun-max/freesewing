import { expect, test } from "@playwright/test";

const appUrl = "http://127.0.0.1:4173";
const evidenceDir = "test-results/ulw-evidence";
const bannedInternalTerms = [
  "Blend Shape",
  "Bone Scale",
  "Skinning",
  "Cloth Simulation",
  "Pattern DSL",
  "Geometry Engine",
  "Validation",
  "Blender",
  "USD",
];

const requiredWorkspaceIds = [
  "top-bar",
  "workspace",
  "today-tasks",
  "progress-status",
  "pattern-preview",
  "shape-preview",
  "measurements-form",
  "body-feature-chips",
  "output-prep",
  "fitting-notes",
];

test("desktop workspace visible contract @desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(appUrl);

  await expect(page.getByTestId("dashboard")).toBeVisible();
  await page.getByRole("button", { name: "작업공간 열기" }).click();

  for (const testId of requiredWorkspaceIds) {
    await expect(page.getByTestId(testId)).toBeVisible();
  }

  await expect(page.getByTestId("shape-preview")).toContainText(
    "길이 요청을 반영한 형태 참고입니다.",
  );
  await expect(page.getByTestId("shape-preview")).toContainText("도식화 기준 형태");
  await expect(page.getByTestId("shape-preview")).toContainText("앞면 도식화");
  await expect(page.getByTestId("shape-preview")).toContainText("뒷면 도식화");
  await expect(page.locator(".sketch-reference")).toHaveAttribute("data-sketch-source", "도식화 컨펌본");
  await expect(page.getByTestId("body-proxy")).toBeVisible();
  await expect(page.getByTestId("skirt-proxy")).toBeVisible();
  await expect(page.getByTestId("fit-proxy-report")).toContainText("허리 확인");
  await expect(page.getByTestId("fit-proxy-report")).toContainText("힙 확인");
  await expect(page.getByTestId("fit-proxy-report")).toContainText("옆선 확인");
  for (const term of bannedInternalTerms) {
    await expect(page.getByText(term)).toHaveCount(0);
  }

  await expect(page.getByTestId("skirt-length-value")).toHaveText("72cm");
  await page.getByRole("button", { name: "더 길게" }).click();
  await expect(page.getByTestId("skirt-length-value")).toHaveText("76cm");
  await expect(page.getByTestId("pattern-preview")).toContainText(
    "76cm A라인 스커트 길이를 미리 봅니다.",
  );
  await expect(page.getByTestId("pattern-preview")).toContainText("검산: 힙 완성 98cm");
  await expect(page.getByTestId("draft-report")).toContainText("PASS: 허리 완성 70cm가 입력 허리와 일치한다.");
  await expect(page.getByTestId("draft-report")).toContainText(
    "PASS: 힙 완성 98cm는 입력 힙 94cm에 여유 4cm를 더했다.",
  );
  await expect(page.getByTestId("draft-report")).toContainText("PASS: 옆선 오차가 2% 이내다.");
  await page.screenshot({
    path: `${evidenceDir}/workspace-browser-desktop-longer.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "더 짧게" }).click();
  await expect(page.getByTestId("skirt-length-value")).toHaveText("72cm");

  await page.screenshot({
    path: `${evidenceDir}/workspace-browser-desktop.png`,
    fullPage: true,
  });
});

test("mobile workspace stacks without overflow @mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(appUrl);
  await page.getByRole("button", { name: "작업공간 열기" }).click();

  for (const testId of requiredWorkspaceIds) {
    await expect(page.getByTestId(testId)).toBeVisible();
  }

  await expect(page.getByTestId("length-control")).toBeVisible();
  await expect(page.getByRole("button", { name: "더 길게" })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);

  const columns = await page.evaluate(() => {
    const grid = document.querySelector(".preview-grid");
    return grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 0;
  });
  expect(columns).toBe(1);

  await page.screenshot({
    path: `${evidenceDir}/workspace-browser-mobile.png`,
    fullPage: true,
  });
});
