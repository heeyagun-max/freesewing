# Lane A Git Cleanup Handoff

작성일: 2026-06-29
대상 repo: `D:/projects/freesewing`
역할 관점: Paul/Elly - PMO + 거버넌스/리스크 검토

이 문서는 push 전 정리 계획만 기록한다. `git add`, `git commit`, `git push`, `git reset`, 파일 삭제는 수행하지 않았다.

## 1. 현재 Git 상태

초기 handoff 작성 시점에는 `origin/main` 대비 로컬 커밋 3개가 앞서 있었다. 이후 HYDE가 A안을 실행해 Lane B tracked 7개 파일을 `c963e67c423 feat: add correction source detail toggles`로 커밋했다.

2026-06-29 11:52 재검증 기준 현재 브랜치는 `main`이고 `origin/main` 대비 로컬 커밋 4개가 앞서 있다.

```text
## main...origin/main [ahead 4]
```

현재 staged 변경은 없다. `git diff --cached --name-only` 결과가 비어 있으므로 push 전 staging 오염은 아직 발생하지 않았다.

아래 tracked 변경 7개 파일 목록은 초기 handoff 시점의 Lane B 미커밋 변경이다. 현재는 `c963e67c423`에 반영되어 working tree에 남아 있지 않다.

```text
M fashword/mvp/workspace-prototype/src/App.tsx
M fashword/mvp/workspace-prototype/src/components/PatternPreview.tsx
M fashword/mvp/workspace-prototype/src/data/mockWorkspace.ts
M fashword/mvp/workspace-prototype/src/engine/aLineSkirtEngine.ts
M fashword/mvp/workspace-prototype/src/styles.css
M fashword/mvp/workspace-prototype/tests/a-line-skirt-engine.spec.ts
M fashword/mvp/workspace-prototype/tests/workspace.spec.ts
```

untracked 항목은 로컬 에이전트 상태, Lane task prompt, 실행 스크립트, design artifacts, archive docs, tools, Lane B 검증 리포트로 섞여 있다.

```text
.omx/
fashword/mvp/.agent-lane-a-git-hygiene-task.md
fashword/mvp/.agent-lane-b-detail-toggle-task.md
fashword/mvp/.agent-lane-c-jina-product-ux-task.md
fashword/mvp/.agent-lane-c-ted-ai-layer-task.md
fashword/mvp/design-artifacts/
fashword/mvp/docs/archive/
fashword/mvp/run-lane-b-a-chain.sh
fashword/mvp/run-lane-c-jina-product-ux.sh
fashword/mvp/run-lane-c-ted-ai-layer.sh
fashword/mvp/tools/
fashword/mvp/workspace-prototype/CODEX_CORRECTION_DETAIL_TOGGLE_REPORT.md
fashword/mvp/workspace-prototype/CODEX_CORRECTION_LOG_REPORT.md
fashword/mvp/workspace-prototype/TED_LANE_B_VERIFICATION.md
```

주의: `git diff` 실행 중 workspace prototype 7개 tracked 파일에 대해 `LF will be replaced by CRLF the next time Git touches it` 경고가 반복됐다. 기능 변경과 별개로 line ending churn 리스크가 있으므로 push 전 diff 확인이 필요하다.

## 2. 로컬 ahead 커밋의 의미

초기 handoff 시점의 로컬 ahead 커밋은 3개였고, 이후 correction detail toggle 기능 커밋이 추가되어 현재 로컬 ahead 커밋은 4개다.

```text
c963e67c423 feat: add correction source detail toggles
7654c3e0a5d feat: promote confirmed sketch to workspace data
50d7798351e feat: link fitting proxy to confirmed sketch views
45821cdb261 feat: add fashword workspace prototype
```

`45821cdb261`은 FASHword MVP의 첫 실행 가능한 baseline이다. `fashword/mvp` 문서 1-5번, prototype package, Vite/React 소스, A라인 스커트 엔진, 테스트, build/review report까지 포함한다. 규모는 35 files, 4082 insertions다.

`50d7798351e`는 confirmed sketch와 fitting proxy를 화면/엔진/테스트에 연결한 후속 기능 커밋이다. 규모는 5 files, 44 insertions다.

`7654c3e0a5d`는 confirmed sketch를 workspace data로 승격하고 관련 report와 테스트를 보강한 커밋이다. 규모는 7 files, 117 insertions, 13 deletions다.

`c963e67c423`은 correction source detail toggle을 추가한 커밋이다. PatternPreview에서 사용자 수정 기록 근거를 접기/펼치기로 확인하고, 엔진 report가 `fitRecord`와 `nextAction`을 보존하도록 테스트를 보강했다.

PMO 관점에서는 4개가 모두 같은 수직 슬라이스의 연속 커밋이며, 현재 변경과 충돌하는 별도 목적의 커밋은 아니다. Elly 관점에서는 `CODEX_*_REPORT.md`가 포함되어 있어 내부 작업 로그와 외부 공유 가능한 검증 보고서의 경계만 push 전 재확인해야 한다.

## 3. 현재 tracked/untracked 변경 분류

2026-06-29 11:52 재검증 기준 tracked 변경은 없다. Lane B detail toggle 계열 7개 파일은 `c963e67c423`에 반영됐다.

남은 untracked 중 A안 커밋 후보는 `06-git-cleanup-handoff-2026-06-29.md`, `CODEX_CORRECTION_DETAIL_TOGGLE_REPORT.md`, `CODEX_CORRECTION_LOG_REPORT.md`, `TED_LANE_B_VERIFICATION.md` 네 개다. 이들은 구현 기능이 아니라 검증/핸드오프 기록이다.

`tools/stitch/`는 재현 가능한 운영 도구라면 별도 chore commit 후보지만, 지금 기능 push에는 필수 런타임이 아니다. `docs/archive/`와 `design-artifacts/`는 추적성 자료로 가치가 있으나 리뷰 노이즈가 크므로 optional artifact commit으로 분리한다.

untracked 중 제외 후보는 명확하다. `.omx/`는 로컬 agent/session state이고, `.agent-lane-*.md`는 작업 지시 원문 성격이 강하다. `dist/`, `test-results/`, `*.log`는 생성물 또는 실행 결과라 기본 push 대상이 아니다.

## 4. 커밋 포함/제외 추천

포함 추천 1순위는 현재 tracked 7개 Lane B 코드/테스트 변경이다. 커밋 메시지는 `feat: add correction source detail toggles`가 적절하다.

포함 추천 2순위는 Lane B 검증 보고서 3개다. 단, 보고서 내용에 민감한 경로, 계정 정보, 내부 prompt 전문, 로컬 세션 상태가 없는지 먼저 읽고 확인한 뒤 `docs:` 또는 `test:` 성격의 별도 커밋으로 분리하는 편이 안전하다.

조건부 포함 대상은 `run-lane-*.sh`, `tools/stitch/`, `docs/archive/`, `design-artifacts/`다. 이들은 구현 기능보다 운영/디자인 근거 자료라서 첫 push에는 제외하거나, 리뷰어가 provenance를 요구할 때 `chore: add fashword design and lane tooling artifacts` 같은 별도 커밋으로만 묶는다.

제외 추천 대상은 `.omx/`, `.agent-lane-*.md`, `workspace-prototype/dist/`, `workspace-prototype/test-results/`, `*.log`다. 이 항목들은 로컬 상태, 실행 결과, 내부 작업 지시, 재생성 가능한 빌드 산출물이다.

## 5. generated artifact 제거 대상

여기서 "제거"는 실제 삭제가 아니라 커밋 대상에서 제외하거나, 별도 cleanup 승인 후 제거할 후보라는 뜻이다.

```text
.omx/
fashword/mvp/.agent-lane-*.md
fashword/mvp/*.log
fashword/mvp/workspace-prototype/dist/
fashword/mvp/workspace-prototype/test-results/
fashword/mvp/workspace-prototype/playwright-report/
fashword/mvp/workspace-prototype/*.log
```

`design-artifacts/`와 `tools/stitch/`는 generated 성격이 섞여 있지만 완전 제거 대상으로 단정하지 않는다. 디자인 의사결정 추적성과 재현 도구 가치가 있으므로, push 범위에서 제외하거나 optional commit으로 분리하는 쪽이 맞다.

## 6. 선택지

### A: 커밋 3개 유지 + 현재 변경 추가 커밋

현재 3개 ahead 커밋을 보존하고 Lane B tracked 변경을 4번째 커밋으로 추가한다. 가장 작은 조작이며, 실제 이력 재작성 없이 push 전 검증만 강화하면 된다.

장점은 위험이 낮고 기존 수직 슬라이스의 작업 맥락을 유지한다는 점이다. 단점은 첫 커밋이 4082 insertions로 크고, 일부 report 문서가 기능 커밋에 함께 들어가 있어 리뷰 단위가 완벽히 정제되어 있지는 않다는 점이다.

### B: soft reset 후 재구성

`origin/main` 이후 3개 커밋을 soft reset으로 풀고, 문서 baseline, prototype, confirmed sketch/fitting proxy, Lane B correction detail을 새 커밋 묶음으로 재구성한다.

장점은 커밋 메시지와 diff 단위가 가장 깨끗해진다는 점이다. 단점은 실제 이력 변경이 필요하고, 현재 지시의 금지 범위인 `git reset`에 해당하므로 지금은 실행 불가다. 별도 명시 승인과 백업 브랜치 확인 없이는 선택하면 안 된다.

### C: hard reset 후 선별 복원

로컬 3개 커밋과 working tree를 버리고 필요한 파일만 복원해 새로 구성한다.

장점은 오염 제거가 가장 강하다는 점이다. 하지만 현재 repo에는 실행 가능한 MVP baseline과 Lane B 작업이 이미 누적되어 있고, hard reset은 손실 위험이 크며 현재 명시 금지에 정면으로 걸린다. 지금 단계에서는 추천하지 않는다.

## 7. 추천안과 이유

추천안은 A다. 현재 커밋 3개는 모두 FASHword MVP workspace prototype의 연속된 기능 커밋이고, working tree의 tracked 변경도 같은 맥락의 Lane B 보강이다. push 전 리스크는 이력 구조 자체보다 untracked/generated artifact와 report 문서의 노출 범위에 있다.

운영적으로는 3개 커밋을 유지한 채 Lane B 코드/테스트 변경을 추가 커밋으로 묶고, report 문서는 민감도 확인 후 별도 커밋 또는 제외로 판단하는 방식이 가장 빠르고 안전하다. 거버넌스 관점에서도 reset 계열 이력 재작성보다 현재 증거를 보존한 선별 staging이 낫다.

## 8. push 전 차단 조건

아래 조건 중 하나라도 있으면 push를 보류한다.

```text
git diff --cached --name-only 에 .omx/, .agent-lane-*.md, dist/, test-results/, *.log 가 포함됨
Lane B report 문서에 내부 prompt 전문, 계정 정보, 토큰, 로컬 세션 상태가 포함됨
workspace-prototype 테스트 또는 빌드가 실패함
line ending 변경만 대량으로 섞여 기능 diff를 흐림
origin/main이 이동해서 ahead 3 기준이 깨짐
```

추가로 `git status --short --branch`가 `ahead 3`이 아닌 다른 상태를 보이면, push 전 계획을 다시 작성해야 한다. 특히 `behind`, `diverged`, 충돌 파일, staged unknown artifacts가 보이면 그대로 push하면 안 된다.

## 9. HYDE가 다음에 검증할 명령

HYDE는 실제 staging 전에 아래 명령으로 현재 상태를 다시 확인한다.

```bash
cd /d/projects/freesewing
git status --short --branch
git log --oneline -8 --decorate
git diff --name-only
git diff --cached --name-only
git diff --stat
git diff --check
git status --short --untracked-files=all
```

workspace prototype 검증은 아래 순서로 한다.

```bash
cd /d/projects/freesewing/fashword/mvp/workspace-prototype
npx playwright test
npm run build
```

staging 직전에는 아래 제외 조건을 눈으로 확인한다.

```bash
cd /d/projects/freesewing
git diff --cached --name-only
git status --short --untracked-files=all
```

최종 PMO 판단은 `A: 커밋 3개 유지 + 현재 변경 추가 커밋`이다. 단, 이 문서 작성 턴에서는 금지 조건에 따라 staging, commit, push, reset, 파일 삭제를 하지 않았다.
