# FASHword MVP Workspace

현재 MVP 작업 루트다. 기획 문서, 디자인 산출물, 프론트엔드 프로토타입, 스커트 원형 엔진을 분리한다.

## Current docs

- `docs/current/01-engine-start-decision.md` — Product Workspace + A라인 미디 스커트 엔진 착수 결정
- `docs/current/02-workspace-prototype-frontend-spec.md` — 현재 프론트엔드 프로토타입 구현 기준
- `docs/current/03-a-line-skirt-first-tester-functional-spec.md` — 첫 테스터 기능 기준선
- `docs/current/04-nvidia-inception-roadmap.md` — NVIDIA/Inception 활용 로드맵

## Archive

- `docs/archive/2026-06-28-planning-iterations/` — 이전 기획안, 프롬프트, 리뷰 출력, superseded 문서

## Design artifacts

- `design-artifacts/stitch/` — Stitch 시안, 캡처 이미지, HTML, JSON, Excalidraw
- `tools/stitch/` — Stitch MCP 호출/수집용 임시 도구

## Prototype

- `workspace-prototype/` — React/Vite Product Workspace 프로토타입

## Engine direction

다음 단계는 `workspace-prototype` 안에 A라인 스커트 원형 deterministic geometry engine을 붙이는 것이다. LLM이 좌표를 직접 만들지 않고, 치수 입력 → 기하 계산 → SVG/검산 리포트 순서로 간다.
