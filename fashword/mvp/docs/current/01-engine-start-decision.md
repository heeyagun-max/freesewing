---
title: FASHword Product Workspace 방향 및 A라인 미디 스커트 엔진 착수
project: FASHword
date: 2026-06-25
status: decision
---

# FASHword Product Workspace 방향 및 A라인 미디 스커트 엔진 착수

## 확정 결정
- UI 디자인 방향은 Stitch 시안 중 Product Workspace 계열로 간다.
- MVP 8주는 제품 MVP까지의 일정이다.
- 우선 개발은 스커트 엔진으로 시작한다.
- 첫 의복은 A라인 미디 길이 스커트로 잡는다.

## 개발 순서
1. A라인 미디 스커트 패턴 엔진 설계
2. 치수 입력 스키마 확정
3. 기준 원형과 A라인 전개 규칙 정의
4. 2D 패턴 좌표 생성
5. 패턴 검산
6. SVG/PDF 출력
7. Blender/3D 미리보기 연결
8. 가봉 피드백 기록 구조 연결

## 3D 옷 입혀보기 방향
구글이 공개한 사진 기반 virtual try-on/garment transfer 계열 오픈소스 모델은 FASHword의 3D/착장 UX에 참고 가능하다. 다만 이 계열은 이미지 기반 시각화이며, 봉제 가능한 패턴 좌표를 보장하지 않는다. 따라서 FASHword에서는 최종 패턴 엔진의 근거가 아니라, 사용자가 결과를 이해하는 미리보기/콘텐츠 레이어로만 차용한다.

## NVIDIA에서 찾아볼 후보
- NVIDIA Inception
- Omniverse / OpenUSD
- RTX / rendering 관련 developer resources
- NIM / NeMo 관련 startup credit 또는 technical enablement
- NVIDIA Developer Program
- Cloud/GPU credit 또는 partner cloud benefit
- synthetic data / simulation 관련 grant 또는 startup support

## 리스크
사진 기반 옷 입혀보기 모델을 패턴 정확도 근거로 쓰면 위험하다. 해당 모델은 시각적 착장 합성에는 유용하지만, 실제 2D 패턴 치수/다트/봉제선 검산과는 별개다. 패턴 엔진의 신뢰성은 A라인 스커트의 좌표 계산, 출력 치수, 실제 가봉 피드백으로 증명해야 한다.
