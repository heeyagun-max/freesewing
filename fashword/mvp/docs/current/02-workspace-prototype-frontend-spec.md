---
title: FASHword Product Workspace Frontend Prototype Spec
project: FASHword
date: 2026-06-28
owner: Ted
target_dir: D:/projects/freesewing/fashword/mvp/workspace-prototype
status: implementation-ready
---

# FASHword Product Workspace 프론트 프로토타입 구현 명세서

이 문서는 `D:/projects/freesewing/fashword/mvp/workspace-prototype`에 구현할 프론트 프로토타입 기준서다. 방향은 Stitch B안 Product Workspace의 작업공간 감각을 따른다. 단, 화면은 기술 시연장이 아니라 홈소잉 사용자가 오늘 할 일, 진행 상태, 패턴 보기, 3D로 보기, 출력 준비, 가봉 후 수정 기록을 따라가는 제작 보드여야 한다.

사용자 화면에는 내부 기술어를 노출하지 않는다. 3D 미리보기는 정확도 보장이 아니라 입체 이해를 돕는 보조 화면으로만 표현한다. Fit Test Kit 판매, 유료 검수, 구독, 결제, 가격제 같은 미합의 수익모델은 어떤 화면에도 넣지 않는다.

## 1. 구현 목표와 비목표

구현 목표는 Vite + React + plain CSS로 정적 mock 기반 Product Workspace 프로토타입을 만드는 것이다. 범위는 Dashboard, Project Workspace, 치수 입력 mock, 몸 특징 선택 chip, 패턴 보기 mock SVG, 3D로 보기 placeholder, 출력 준비 카드, 가봉 후 수정 기록 mock까지다.

화면 구조는 상단에 `FASHword / 현재 의복 / 저장 / 패턴 만들기`, 중단에 `오늘 할 일 / 진행 상태`, 핵심 영역에 `패턴 보기 / 3D로 보기`, 하단에 `내 치수 / 몸 특징 / 출력 준비`, 후속 영역에 `가봉 후 수정 기록`을 배치한다. 900px 이하에서는 모든 주요 영역이 1열로 재배치되어야 한다.

비목표는 실제 패턴 계산, 실제 파일 출력, 로그인, 서버 저장, 사용자 계정, 원격 동기화, 외부 렌더링, 결제, 구독, 유료 검수, 가격 정책 구현이다. 프로토타입은 사용자가 제작 보드의 흐름을 이해할 수 있게 하는 화면 검증용이며, 완성된 상용 기능처럼 보이면 안 된다.

## 2. 기술 스택: Vite + React + plain CSS, 라이브러리 최소화

스택은 Vite + React + plain CSS로 고정한다. TypeScript는 사용해도 되지만 의존성과 구조를 늘리지 않는다. 스타일은 `src/styles.css` 하나에서 시작하고, CSS 변수와 className 규칙으로만 정리한다.

외부 UI 라이브러리, 라우터, 전역 상태관리, 차트 라이브러리, 3D 라이브러리, CSS 프레임워크는 쓰지 않는다. 버튼, 카드, chip, 진행 표시, mock SVG는 직접 작성한다. 아이콘이 꼭 필요하면 텍스트 또는 CSS 형태로 처리한다.

`package.json` 최소 기준은 다음과 같다.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "react": "latest",
    "react-dom": "latest",
    "typescript": "latest"
  }
}
```

## 3. 폴더/파일 구조

구현 대상 폴더는 `D:/projects/freesewing/fashword/mvp/workspace-prototype`다. 폴더가 없으면 생성한다.

```text
workspace-prototype/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  src/
    main.tsx
    App.tsx
    styles.css
    data/
      mockWorkspace.ts
    components/
      AppShell.tsx
      Dashboard.tsx
      Workspace.tsx
      TopBar.tsx
      TodayTasks.tsx
      ProgressStatus.tsx
      PatternPreview.tsx
      ThreeDPreview.tsx
      MeasurementsForm.tsx
      BodyFeatureChips.tsx
      OutputPrepCard.tsx
      FittingNotes.tsx
```

컴포넌트가 작으면 첫 구현에서는 일부를 합쳐도 된다. 단, `PatternPreview`, `ThreeDPreview`, `MeasurementsForm`, `BodyFeatureChips`, `OutputPrepCard`, `FittingNotes`는 사용자가 보는 핵심 블록이므로 독립 컴포넌트로 두는 것을 권장한다.

## 4. 컴포넌트 설계

`AppShell`은 전체 배경, 상단 바, Dashboard와 Workspace를 감싸는 레이아웃을 담당한다. 화면 전환은 라우터 없이 local state로 처리한다.

`TopBar`는 브랜드명 `FASHword`, 현재 의복명, `저장`, `패턴 만들기` 버튼을 보여준다. 버튼에는 명확한 `aria-label`을 넣고, 화면 문구와 보조 문구 모두 사용자 언어만 사용한다.

`Dashboard`는 프로젝트 목록과 오늘 이어서 할 작업을 보여주는 시작 화면이다. 최소한 현재 의복 카드, 최근 수정일, 진행률, `작업공간 열기` 버튼을 포함한다.

`Workspace`는 메인 제작 보드다. 상단에는 `오늘 할 일`과 `진행 상태`, 중앙에는 `패턴 보기`와 `3D로 보기`, 하단에는 `내 치수`, `몸 특징`, `출력 준비`, 후속에는 `가봉 후 수정 기록`을 둔다.

`PatternPreview`는 mock SVG로 앞판, 뒤판, 기준선, 여유분 표시, 조각 이름을 보여준다. 사용자에게는 `패턴 보기`, `앞판`, `뒤판`, `기준선`, `여유분` 같은 용어만 사용한다.

`ThreeDPreview`는 실제 3D 렌더링이 아니라 검산용 3D 피팅 프록시다. 입력 치수로 단순 바디 실루엣을 만들고, 패턴 보기에서 확인한 A라인 스커트 도식화 기준값을 스커트 프록시로 얹어 보여준다. 게임 엔진의 캐릭터 체형 보정, 의상 스케일, 스키닝 개념을 제품 내부 방향으로 차용하되 화면에는 기술어를 노출하지 않는다. 안내 문구는 "입체 형태를 이해하기 위한 미리보기입니다. 최종 핏은 가봉 후 수정 기록으로 확인하세요."로 둔다.

`MeasurementsForm`은 키, 가슴둘레, 허리둘레, 엉덩이둘레, 어깨너비, 소매길이 입력 mock을 제공한다. 모든 input은 visible label과 연결한다.

`BodyFeatureChips`는 몸 특징 선택 chip을 제공한다. 예시는 `어깨가 앞으로 말림`, `허리 곡선 큼`, `좌우 어깨 높이 차이`, `팔 움직임 여유 필요`, `엉덩이 여유 필요`다.

`OutputPrepCard`는 출력 전 확인 상태를 보여준다. 예시는 `용지 크기`, `페이지 나눔`, `기준선 확인`, `입체 파일 저장 준비`다.

`FittingNotes`는 가봉 후 수정 기록 mock이다. `수정 요청`, `내 핏 기록`, `다음 작업`을 중심으로 보여준다.

## 5. mock 데이터 스키마

mock 데이터는 `src/data/mockWorkspace.ts`에 둔다. 표시 문자열에는 금지 용어를 넣지 않는다.

```ts
export type WorkspaceProject = {
  id: string;
  garmentName: string;
  garmentType: string;
  updatedAtLabel: string;
  progressPercent: number;
  currentStep: string;
  tasks: Array<{
    id: string;
    title: string;
    status: "todo" | "doing" | "done";
  }>;
  measurements: Array<{
    id: string;
    label: string;
    value: string;
    unit: "cm";
  }>;
  bodyFeatures: Array<{
    id: string;
    label: string;
    selected: boolean;
  }>;
  outputPrep: Array<{
    id: string;
    label: string;
    state: "ready" | "check";
    helper: string;
  }>;
  fittingNotes: Array<{
    id: string;
    dateLabel: string;
    request: string;
    fitRecord: string;
    nextAction: string;
  }>;
};
```

권장 mock 값은 `린넨 셔츠`, `첫 패턴`, `검토된 패턴`, `소매 움직임 여유 확인`, `허리선 수정 요청`, `내 핏 기록 업데이트`처럼 사용자가 제작 흐름으로 이해할 수 있는 문구를 사용한다.

## 6. 화면 와이어프레임

데스크톱 레이아웃은 12컬럼 감각의 제작 보드로 구성한다. 상단 바는 고정 높이로 두고, 본문은 최대 너비 1180px 안에서 카드형 작업 영역을 배치한다.

```text
┌──────────────────────────────────────────────────────────────┐
│ FASHword        현재 의복: 린넨 셔츠     [저장] [패턴 만들기] │
├──────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐ ┌──────────────────────────────┐ │
│ │ 오늘 할 일              │ │ 진행 상태                    │ │
│ │ - 치수 확인             │ │ 첫 패턴 -> 검토된 패턴       │ │
│ │ - 몸 특징 선택          │ │ 진행률 / 다음 작업           │ │
│ └─────────────────────────┘ └──────────────────────────────┘ │
│ ┌─────────────────────────┐ ┌──────────────────────────────┐ │
│ │ 패턴 보기               │ │ 3D로 보기                    │ │
│ │ mock SVG                │ │ 이해 보조 placeholder        │ │
│ └─────────────────────────┘ └──────────────────────────────┘ │
│ ┌──────────────┐ ┌──────────────┐ ┌───────────────────────┐ │
│ │ 내 치수      │ │ 몸 특징      │ │ 출력 준비             │ │
│ └──────────────┘ └──────────────┘ └───────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 가봉 후 수정 기록                                       │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

900px 이하에서는 상단 바의 버튼을 유지하되 본문 grid는 1열로 바꾼다. `패턴 보기`와 `3D로 보기`도 세로로 쌓는다. 입력 폼은 2열을 강제하지 말고 1열에서 label과 input이 읽히게 한다.

## 7. 사용자 플로우

사용자는 Dashboard에서 현재 의복 카드를 보고 `작업공간 열기`를 누른다. Workspace에 진입하면 오늘 할 일에서 치수 확인, 몸 특징 선택, 패턴 보기, 출력 준비를 순서대로 확인한다.

치수 입력 mock에서는 값을 바꿀 수 있어야 한다. 저장 버튼은 실제 저장 대신 "작업 내용이 이 화면에 반영되었습니다" 수준의 짧은 상태 메시지를 보여준다.

몸 특징 chip은 토글된다. 선택된 chip은 색, 테두리, `aria-pressed`로 상태를 표현한다.

`패턴 만들기` 버튼은 실제 계산을 수행하지 않는다. 클릭 시 현재 화면 안에서 `패턴 보기` 영역의 상태 문구만 `검토된 패턴을 준비했습니다`처럼 바꾼다.

`3D로 보기`는 placeholder에서 한 단계 발전한 바디-스커트 프록시를 보여준다. 사용자는 이 영역을 정확한 착용 결과로 오해하면 안 된다. 허리, 힙, 옆선은 draft report의 pass/fail 결과를 색상과 짧은 문구로 연결하고, 화면 문구는 "도식화 기준 형태", "확인 결과" 같은 사용자 언어만 사용한다.

가봉 후 수정 기록은 mock 데이터 목록으로 보여준다. 사용자가 남긴 기록이 다음 작업으로 이어지는 구조를 보여주는 것이 목적이다.

## 8. 상태/인터랙션 정의

필수 상태는 `activeView`, `selectedProject`, `measurements`, `bodyFeatures`, `patternStatus`, `saveStatus`, `activePreviewTab`다. `activePreviewTab`은 `pattern` 또는 `threeD`가 아니라 사용자 문구 기준으로 `patternView`와 `shapePreview`처럼 작성한다. 화면 문구는 `패턴 보기`, `3D로 보기`만 쓴다.

주요 인터랙션은 Dashboard에서 Workspace 열기, 저장 버튼 클릭, 패턴 만들기 버튼 클릭, 치수 입력 변경, 몸 특징 chip 토글, 패턴 보기와 3D로 보기 전환 또는 병렬 확인이다.

주요 섹션에는 `data-testid`를 부착한다. 필수 값은 `top-bar`, `dashboard`, `workspace`, `today-tasks`, `progress-status`, `pattern-preview`, `shape-preview`, `measurements-form`, `body-feature-chips`, `output-prep`, `fitting-notes`다.

모든 버튼은 `button` 요소를 사용하고 label을 명확히 둔다. 모든 form input은 `label htmlFor`와 `id`로 연결한다. chip 버튼에는 `aria-pressed`를 둔다.

## 9. 금지 용어와 대체 용어

사용자 화면, aria-label, title, visible helper text, mock 표시 데이터에는 아래 금지 용어를 쓰지 않는다.

| 금지 용어 | 대체 용어 |
| --- | --- |
| API | 작업 |
| Pattern DSL | 패턴 규칙 |
| Geometry Engine | 패턴 계산 |
| Validation | 확인 결과 |
| Blender | 3D로 보기 |
| USD | 입체 파일 저장 |
| P1-S | 첫 패턴 |
| P1-A | 검토된 패턴 |
| revision | 수정 요청 |
| fit data | 내 핏 기록 |

코드 파일명과 내부 변수명도 가능하면 대체어를 따른다. 꼭 필요한 개발 설정 파일의 기술 용어는 허용하지만, 사용자가 보는 문자열에는 절대 노출하지 않는다.

## 10. Codex 구현 체크리스트

Codex는 구현 전에 `workspace-prototype` 폴더 존재 여부를 확인하고 없으면 생성한다. 기존 파일이 있으면 먼저 읽고 사용자 변경을 보존한다.

프로젝트를 Vite + React + plain CSS로 구성한다. 외부 UI 라이브러리는 추가하지 않는다.

Dashboard와 Project Workspace를 모두 구현한다. Dashboard에는 현재 의복 카드와 작업공간 진입 버튼이 있어야 한다.

Workspace에는 상단 `FASHword / 현재 의복 / 저장 / 패턴 만들기`, 중단 `오늘 할 일 / 진행 상태`, 핵심 `패턴 보기 / 3D로 보기`, 하단 `내 치수 / 몸 특징 / 출력 준비`, 후속 `가봉 후 수정 기록`이 있어야 한다.

치수 입력 mock은 visible label을 가진 input으로 구현한다. 몸 특징은 토글 가능한 chip 버튼으로 구현한다.

패턴 보기는 mock SVG를 사용한다. 3D로 보기는 정확도 보장이 아닌 이해 보조 프록시로 구현한다. `draft.report.waist`, `draft.report.hip`, `draft.report.sideSeam` 메시지를 3D 영역에도 표시해 2D 패턴 검산과 입체 미리보기가 같은 계산값을 보고 있음을 보여준다.

주요 섹션에 지정된 `data-testid`를 붙인다. 900px 이하에서 1열 반응형이 적용되어야 한다.

사용자 화면에서 금지 용어와 미합의 수익모델 문구가 보이지 않는지 확인한다.

구현 후 `npm run build`를 실행하고 통과 여부를 기록한다.

## 11. HYDE 검수 체크리스트

HYDE 검수는 화면 기준으로 한다. 코드가 존재해도 화면에서 보이지 않거나 사용자가 이해할 수 없으면 통과가 아니다.

`PASS` 기준은 Dashboard에서 Workspace로 이동할 수 있고, Workspace에서 제작 보드의 순서가 한눈에 읽히는 것이다.

`PASS` 기준은 상단 바에 `FASHword`, 현재 의복, `저장`, `패턴 만들기`가 보이는 것이다.

`PASS` 기준은 `오늘 할 일`, `진행 상태`, `패턴 보기`, `3D로 보기`, `내 치수`, `몸 특징`, `출력 준비`, `가봉 후 수정 기록`이 모두 화면에 존재하는 것이다.

`PASS` 기준은 치수 input이 label과 연결되어 있고, 몸 특징 chip이 선택 상태를 시각적으로 보여주는 것이다.

`PASS` 기준은 3D 영역이 정확도 보장이 아니라 이해 보조라는 점을 명확히 말하는 것이다.

`PASS` 기준은 3D 영역에 바디 실루엣, 스커트 실루엣, 허리/힙/옆선 확인 결과가 함께 보이는 것이다. 단, Blend Shape, Bone Scale, Skinning, Cloth Simulation 같은 내부 기술어는 화면에 노출하지 않는다.

`PASS` 기준은 화면에 API, Pattern DSL, Geometry Engine, Validation, Blender, USD, P1-S, P1-A가 보이지 않는 것이다.

`PASS` 기준은 Fit Test Kit 판매, 유료 검수, 구독, 결제, 가격제가 화면에 보이지 않는 것이다.

`PASS` 기준은 900px 이하에서 주요 섹션이 1열로 내려가고 텍스트가 겹치지 않는 것이다.

`FAIL` 기준은 route smoke나 build 통과만으로 화면 검수를 완료했다고 보고하는 것이다. HYDE 검수는 반드시 브라우저에서 실제 화면을 열어 확인해야 한다.

## 12. 빌드/실행 명령

구현 폴더로 이동한다.

```powershell
cd D:/projects/freesewing/fashword/mvp/workspace-prototype
```

의존성을 설치한다.

```powershell
npm install
```

개발 서버를 실행한다.

```powershell
npm run dev
```

빌드를 검증한다.

```powershell
npm run build
```

프리뷰가 필요하면 다음 명령을 사용한다.

```powershell
npm run preview
```

최종 완료 조건은 `npm run build` 통과, 주요 `data-testid` 부착, 버튼과 폼 label 확인, 900px 이하 1열 반응형 확인이다. UI/UX/IA 완료 보고에는 실제 브라우저 화면 확인 증거가 별도로 필요하다.
