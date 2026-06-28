# FASHword MVP Commit Staging Plan

작성일: 2026-06-28
작업 루트: `D:/projects/freesewing`

목표는 현재 `fashword/mvp` 신규 작업을 리뷰 가능한 커밋 단위로 나누는 것이다. 이 문서는 실행 계획만 정의한다. 실제 `git add`와 `git commit`은 수행하지 않는다.

## 운영 판단

커밋은 2개 필수, 1개 선택으로 간다. 현재 실행 staging은 리뷰 비용을 줄이기 위해 `docs/current`와 실행 가능한 `workspace-prototype`만 먼저 묶는다. `docs/archive`, Stitch 기반 design artifacts와 tools는 별도 optional commit으로 둔다.

3번을 optional로 두는 이유는 산출물 성격이 구현 필수 파일과 다르기 때문이다. HTML, PNG, JSON, Excalidraw, MCP 호출 스크립트는 디자인 근거와 재현 도구로는 가치가 있지만, MVP 실행 경로의 필수 런타임은 아니다. 첫 PR이나 첫 커밋 묶음에서는 1번과 2번만 먼저 올리고, 3번은 리뷰어가 디자인 출처와 생성 과정을 함께 보길 원할 때 별도 커밋으로 붙이는 게 운영상 낫다.

## Commit 1: 문서/아카이브 정리

의도: FASHword MVP의 현재 기준 문서, 커밋 staging plan, MVP 루트 README, MVP 전용 ignore 규칙을 먼저 고정한다. 과거 planning iteration archive는 리뷰 노이즈가 커서 optional 문서 보존 커밋으로 분리한다.

주의: `fashword/mvp/.gitignore`는 루트 `.gitignore`의 `.gitignore` 패턴에 걸리므로 반드시 `git add -f`가 필요하다.

```bash
git add -f fashword/mvp/.gitignore
git add \
  fashword/mvp/README.md \
  fashword/mvp/docs/current/01-engine-start-decision.md \
  fashword/mvp/docs/current/02-workspace-prototype-frontend-spec.md \
  fashword/mvp/docs/current/03-a-line-skirt-first-tester-functional-spec.md \
  fashword/mvp/docs/current/04-nvidia-inception-roadmap.md \
  fashword/mvp/docs/current/05-commit-staging-plan.md
git commit -m "docs: add fashword mvp planning baseline"
```

## Commit 2: Workspace Prototype + A라인 스커트 엔진

의도: 실제로 빌드/검증 가능한 Vite React prototype, A라인 스커트 엔진, 테스트, 빌드 리포트와 리뷰 리포트를 하나의 기능 커밋으로 묶는다.

주의: `fashword/mvp/workspace-prototype/.gitignore`도 루트 `.gitignore`의 `.gitignore` 패턴에 걸리므로 반드시 `git add -f`가 필요하다.

```bash
git add -f fashword/mvp/workspace-prototype/.gitignore
git add \
  fashword/mvp/workspace-prototype/ANTIGRAVITY_REVIEW.md \
  fashword/mvp/workspace-prototype/CODEX_BUILD_REPORT.md \
  fashword/mvp/workspace-prototype/index.html \
  fashword/mvp/workspace-prototype/package-lock.json \
  fashword/mvp/workspace-prototype/package.json \
  fashword/mvp/workspace-prototype/src/App.tsx \
  fashword/mvp/workspace-prototype/src/components/AppShell.tsx \
  fashword/mvp/workspace-prototype/src/components/BodyFeatureChips.tsx \
  fashword/mvp/workspace-prototype/src/components/Dashboard.tsx \
  fashword/mvp/workspace-prototype/src/components/FittingNotes.tsx \
  fashword/mvp/workspace-prototype/src/components/MeasurementsForm.tsx \
  fashword/mvp/workspace-prototype/src/components/OutputPrepCard.tsx \
  fashword/mvp/workspace-prototype/src/components/PatternPreview.tsx \
  fashword/mvp/workspace-prototype/src/components/ProgressStatus.tsx \
  fashword/mvp/workspace-prototype/src/components/ThreeDPreview.tsx \
  fashword/mvp/workspace-prototype/src/components/TodayTasks.tsx \
  fashword/mvp/workspace-prototype/src/components/TopBar.tsx \
  fashword/mvp/workspace-prototype/src/components/Workspace.tsx \
  fashword/mvp/workspace-prototype/src/data/mockWorkspace.ts \
  fashword/mvp/workspace-prototype/src/engine/aLineSkirtEngine.ts \
  fashword/mvp/workspace-prototype/src/main.tsx \
  fashword/mvp/workspace-prototype/src/styles.css \
  fashword/mvp/workspace-prototype/src/vite-env.d.ts \
  fashword/mvp/workspace-prototype/tests/a-line-skirt-engine.spec.ts \
  fashword/mvp/workspace-prototype/tests/workspace.spec.ts \
  fashword/mvp/workspace-prototype/tsconfig.json \
  fashword/mvp/workspace-prototype/vite.config.ts
git commit -m "feat: add fashword workspace prototype"
```

## Commit 3: Optional Archive / Design Artifacts / Tools

판단: 별도 optional commit으로 둔다. 이 커밋은 구현 기능이 아니라 과거 기획 반복 이력, 디자인 근거, Stitch 생성 산출물, 반복 재생성 도구를 남기는 목적이다. 리뷰 비용이 커지면 제외하고, 디자인 결정의 추적성이 필요하면 아래 명령으로 별도 커밋한다.

```bash
git add \
  fashword/mvp/docs/archive/2026-06-28-planning-iterations \
  fashword/mvp/design-artifacts/stitch/03-ui-mockup.html \
  fashword/mvp/design-artifacts/stitch/06-ui-mockup-balanced-user-facing.html \
  fashword/mvp/design-artifacts/stitch/08-ia-ux-user-facing-diagram.html \
  fashword/mvp/design-artifacts/stitch/09-ia-ux-user-facing-diagram.excalidraw \
  fashword/mvp/design-artifacts/stitch/11-stitch-b-color-check.html \
  fashword/mvp/design-artifacts/stitch/fashword_mvp_screens_contact_sheet.png \
  fashword/mvp/design-artifacts/stitch/screen_5d37c7069c494981a3084eadc53dea82.png \
  fashword/mvp/design-artifacts/stitch/screen_5e7c8c04dafa40c1a9c716f805700d7d.png \
  fashword/mvp/design-artifacts/stitch/screen_619b3f88f4b143e880a5086b7d4049fe.png \
  fashword/mvp/design-artifacts/stitch/screen_e20d6f904a2649a982bc9f6c9d8d6b97.png \
  fashword/mvp/design-artifacts/stitch/screen_fc66dd32641d4dc2b612ad72f46a86cd.png \
  fashword/mvp/design-artifacts/stitch/stitch-gallery.html \
  fashword/mvp/design-artifacts/stitch/stitch_generate_result.json \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/619b3f88f4b143e880a5086b7d4049fe.fetch_screen_code.json \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/619b3f88f4b143e880a5086b7d4049fe.fetch_screen_image.json \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/619b3f88f4b143e880a5086b7d4049fe.get_screen.json \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/619b3f88f4b143e880a5086b7d4049fe.html \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/e20d6f904a2649a982bc9f6c9d8d6b97.fetch_screen_code.json \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/e20d6f904a2649a982bc9f6c9d8d6b97.fetch_screen_image.json \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/e20d6f904a2649a982bc9f6c9d8d6b97.get_screen.json \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/e20d6f904a2649a982bc9f6c9d8d6b97.html \
  fashword/mvp/design-artifacts/stitch/stitch_outputs/screens.json \
  fashword/mvp/design-artifacts/stitch/stitch_refs/refinement/stitch_ui_design_guide_refinement/assetkim/code.html \
  fashword/mvp/design-artifacts/stitch/stitch_refs/refinement/stitch_ui_design_guide_refinement/assetkim/screen.png \
  fashword/mvp/design-artifacts/stitch/stitch_refs/refinement/stitch_ui_design_guide_refinement/assetkim_professional/DESIGN.md \
  fashword/mvp/design-artifacts/stitch/stitch_refs/refinement/stitch_ui_design_guide_refinement/assetkim_v1.1.md \
  fashword/mvp/design-artifacts/stitch/stitch_refs/refinement/stitch_ui_design_guide_refinement/assetkim_webapp_design_guide_v1.md \
  fashword/mvp/design-artifacts/stitch/stitch_refs/stitch_sample/DESIGN.md \
  fashword/mvp/design-artifacts/stitch/stitch_refs/stitch_sample/code.html \
  fashword/mvp/design-artifacts/stitch/stitch_refs/stitch_sample/screen.png \
  fashword/mvp/design-artifacts/stitch/stitch_tools_schema.txt \
  fashword/mvp/design-artifacts/stitch/stitch_variants/5d37c7069c494981a3084eadc53dea82.code.json \
  fashword/mvp/design-artifacts/stitch/stitch_variants/5d37c7069c494981a3084eadc53dea82.html \
  fashword/mvp/design-artifacts/stitch/stitch_variants/5d37c7069c494981a3084eadc53dea82.image.json \
  fashword/mvp/design-artifacts/stitch/stitch_variants/5e7c8c04dafa40c1a9c716f805700d7d.code.json \
  fashword/mvp/design-artifacts/stitch/stitch_variants/5e7c8c04dafa40c1a9c716f805700d7d.html \
  fashword/mvp/design-artifacts/stitch/stitch_variants/5e7c8c04dafa40c1a9c716f805700d7d.image.json \
  fashword/mvp/design-artifacts/stitch/stitch_variants/fc66dd32641d4dc2b612ad72f46a86cd.code.json \
  fashword/mvp/design-artifacts/stitch/stitch_variants/fc66dd32641d4dc2b612ad72f46a86cd.html \
  fashword/mvp/design-artifacts/stitch/stitch_variants/fc66dd32641d4dc2b612ad72f46a86cd.image.json \
  fashword/mvp/design-artifacts/stitch/stitch_variants/variants_result.json \
  fashword/mvp/tools/stitch/call_stitch_mcp.py \
  fashword/mvp/tools/stitch/fetch_stitch_known_ids.py \
  fashword/mvp/tools/stitch/fetch_stitch_outputs.py \
  fashword/mvp/tools/stitch/inspect_stitch_mcp.py \
  fashword/mvp/tools/stitch/run_stitch_generate.py \
  fashword/mvp/tools/stitch/run_stitch_variants.py
git commit -m "chore: add fashword design artifacts"
```

## Force-add 대상

아래 2개는 현재 루트 `.gitignore` 규칙 때문에 일반 `git add`로는 들어가지 않는다.

```bash
git add -f fashword/mvp/.gitignore
git add -f fashword/mvp/workspace-prototype/.gitignore
```

## 제외 대상

아래 항목은 이번 staging plan에서 제외한다.

```text
node_modules/
dist/
test-results/
.omo/
.omx/
.codegraph/
playwright-report/
*.log
fashword/mvp/.agent-paul-commit-plan-prompt.md
fashword/mvp/.agent-ted-engine-next-prompt.md
.omx/logs/omx-2026-06-28.jsonl
.omx/state/session.json
```

제외 이유는 생성물, 로컬 에이전트 상태, 실행 로그, 다음 에이전트용 prompt이기 때문이다. 특히 `.agent-*.md`는 작업 지시 원문에 가까워 커밋 이력에 남길 가치보다 노이즈와 내부 상태 노출 리스크가 크다.

## 최종 실행 순서

실제 실행 시에는 아래 순서로 진행한다. 3번 커밋은 선택이다.

```bash
git status --short --untracked-files=all

# commit 1
git add -f fashword/mvp/.gitignore
git add fashword/mvp/README.md fashword/mvp/docs/current fashword/mvp/docs/archive
git commit -m "docs: add fashword mvp planning baseline"

# commit 2
git add -f fashword/mvp/workspace-prototype/.gitignore
git add fashword/mvp/workspace-prototype
git commit -m "feat: add fashword workspace prototype"

# optional commit 3
git add fashword/mvp/design-artifacts/stitch fashword/mvp/tools/stitch
git commit -m "chore: add fashword design artifacts"

# final check
git status --short --untracked-files=all
```

실행 전 체크 기준은 단순하다. `git diff --cached --name-only`로 각 커밋 직전 staged 목록을 확인하고, `.agent-*.md`, `.omx/`, `.omo/`, `.codegraph/`, `node_modules/`, `dist/`, `test-results/`가 staged에 섞이면 커밋하지 말고 staging을 바로 정리한다.
