---
title: FASHword NVIDIA Inception 기술 활용 및 구현 로드맵
project: FASHword
date: 2026-06-28
status: current-technical-roadmap
sources:
  - D:/obsidian/LLM-Wiki-Obsidian/projects/FASHword/FASHword AI Pattern Compiler Service Plan.md
  - D:/obsidian/LLM-Wiki-Obsidian/projects/FASHword/FASHword NVIDIA Inception Benefits Priority.md
  - https://www.nvidia.com/en-us/startups/
  - https://www.nvidia.com/en-us/data-center/innovation-lab/
  - https://www.nvidia.com/en-us/startups/showcase/
---

# FASHword NVIDIA Inception 기술 활용 및 구현 로드맵

## 1. 현재 상태

FASHword는 NVIDIA Inception에 선정되었고, 현재 베네핏을 신청/확인 중이다. 문서와 지원사업 표현에서는 "선정 완료, 베네핏 신청 중"으로만 쓴다. 개별 베네핏 상태는 별도 상태표를 따르며, 아직 확정되지 않은 크레딧, 장비, 기술 지원을 받은 것처럼 쓰지 않는다.

공식 NVIDIA Inception 페이지 기준으로 Inception 멤버는 개발 도구와 교육, NVIDIA 하드웨어/소프트웨어 우대 가격, 파트너 오퍼, 클라우드 크레딧, 투자자 노출, 브랜드/시장 확장 리소스에 접근할 수 있다. Innovation Lab은 선별된 Inception 스타트업에 60일 동안 GPU와 통합 AI 소프트웨어, 전문가 지원을 제공하는 별도 가속 프로그램이다.

## 2. FASHword와 NVIDIA의 연결 원칙

FASHword의 현재 제품은 2D AI Pattern Compiler다. A라인 스커트 첫 PoC는 2D 패턴 규칙, 치수 입력, SVG/PDF 출력 검산, 실제 제작 후 피드백 루프가 핵심이다.

따라서 NVIDIA 기술은 MVP 코어를 갑자기 3D/physics AI로 바꾸는 수단이 아니다. NVIDIA는 다음 세 가지에 쓰인다.

1. 팀이 CUDA, Computer Vision, TensorRT, OpenUSD, Physics AI를 이해하는 교육 기반.
2. 로컬 RTX 3070 8GB로 어려운 GPU 실험을 클라우드에서 수행하는 확장 인프라.
3. 장기적으로 2D 패턴 데이터와 3D/virtual try-on/physics validation을 연결하기 위한 R&D 검증 채널.

## 3. 기술 사용 우선순위

| 우선순위 | 기술/베네핏 | 지금 쓸지 | FASHword 적용 |
| --- | --- | --- | --- |
| P0 | Google Cloud Credits | 즉시 확인/신청 | GPU/Vertex AI 실험, 이미지 기반 착장 미리보기, 데모 서버 |
| P0 | AWS Cloud Credits | 즉시 확인/신청 | MVP 웹앱/API, 패턴 파일 저장, 사용자 프로젝트 데이터, 출력 파일 관리 |
| P0 | NVIDIA DLI / Free Technical Courses | 즉시 | CUDA 기초, Computer Vision, TensorRT, OpenUSD 학습 |
| P0 | Developer Program / Forums | 즉시 | CUDA/OpenUSD/TensorRT/NGC 이슈 해결 |
| P1 | NVIDIA Innovation Lab | PoC 증거 후 신청 강화 | A라인 스커트 엔진 이후 3D/AI 검증 로드맵 피드백 |
| P1 | Lambda / Nebius GPU Credits | GPU 실험 시작 시 | virtual try-on, GPU inference, 로컬 RTX 3070 8GB 한계 보완 |
| P1 | NGC / GPU containers | GPU 실험 시작 시 | 재현 가능한 VTON, segmentation, inference 환경 |
| P1 | TensorRT / CUDA-X | 모델 실험 후 | virtual try-on 또는 이미지 모델 inference 최적화 |
| P2 | OpenUSD / Omniverse | 3D 미리보기 이후 | Blender-first preview의 호환 출력/R&D 레이어 |
| P2 | Warp / Physics AI | 장기 R&D | 원단/몸/패턴 관계의 toy simulation 또는 surrogate 연구 |
| P3 | Capital Connect | PoC/피치덱 후 | 투자/파트너 네트워크 접근 |
| P3 | Marketing Assets | 승인 조건 확인 후 | Inception member 신뢰도 표시, 피치덱/랜딩 보강 |

## 4. Phase 0: 베네핏 신청과 증빙 정리

기간은 지금부터 1주다.

해야 할 일은 Inception 포털에서 신청 가능한 베네핏을 표로 정리하고, 신청/대기/승인/거절 상태를 관리하는 것이다. DLI 교육 코드, Google/AWS/Lambda/Nebius 계열 클라우드 크레딧, Innovation Lab, Marketing Assets, Capital Connect를 분리해서 추적한다.

산출물은 `benefits-ledger.md`, 신청 문구, 포털 상태 스크린샷, 신청일/상태/다음 액션 표다.

금지할 것은 아직 받지 않은 크레딧을 받은 것처럼 쓰는 것이다.

## 5. Phase 1: A라인 스커트 2D 엔진 PoC

기간은 2~4주다.

목표는 NVIDIA 기술을 코어에 억지로 넣는 것이 아니라, 로컬 환경에서 A라인 미디 길이 스커트 2D 엔진과 Product Workspace를 검증하는 것이다.

구현 범위는 허리둘레, 힙둘레, 허리-힙 길이, 스커트 길이, 여유량 입력을 받아 앞판/뒤판, 허리선, 힙선, 중심선, 다트 위치를 산출하는 deterministic geometry 모듈이다. 출력은 SVG/PDF 중심이고, 검산은 허리 완성 치수, 힙 완성 치수, 다트량 합계, 앞뒤 옆선 길이, 출력 스케일을 본다.

NVIDIA 활용은 교육과 문서 수준이다. DLI/Developer Program을 통해 CUDA, Computer Vision, OpenUSD 계열 기초를 학습하되, 현재 엔진을 GPU 의존으로 만들지 않는다.

완료 증거는 A라인 스커트 mock SVG, 검산 리포트, Product Workspace 화면, 첫 테스터 제작 체크리스트다.

## 6. Phase 2: 클라우드 GPU 실험 환경

기간은 베네핏 승인 후 2~6주다.

목표는 로컬 RTX 3070 8GB에서 부담되는 실험을 클라우드 GPU로 분리하는 것이다. 우선순위는 virtual try-on이 아니라 데이터 파이프라인과 모델 실험 재현성이다.

실험 후보는 다음이다.

| 실험 | 목적 | NVIDIA/클라우드 연결 |
| --- | --- | --- |
| 착용/가봉 사진 비식별 처리 | 민감 사진에서 얼굴/배경 노출 최소화 | Computer Vision, GPU inference |
| 핏 피드백 분류 | 자연어/선택형 피드백을 결함 코드로 구조화 | LLM + lightweight classifier |
| 패턴 이미지 유사도 | 수정 전후 패턴 SVG 차이를 비교 | CV embedding, Siamese-style 검토 |
| virtual try-on 리서치 | 장기 3D/시각화 가능성 확인 | GPU cloud, TensorRT 후보 |

이 단계에서 NGC 또는 GPU 컨테이너 기반 환경을 쓰면 실험 재현성을 확보할 수 있다.

## 7. Phase 3: Product Workspace 3D/시각화 확장

기간은 A라인 스커트 제작 기록 1~3건 확보 후다.

목표는 "정확한 가상 피팅"이 아니라 사용자가 패턴과 몸/의복 구조를 이해하는 시각화 레이어를 만드는 것이다.

첫 구현은 Blender-first preview를 유지한다. 이후 OpenUSD 호환 출력은 장기 호환 레이어로 검토한다. Omniverse나 OpenUSD는 현재 제품 코어가 아니라, NVIDIA Innovation Lab 또는 기술 멘토링에서 검토받을 로드맵 항목이다.

완료 증거는 2D 패턴 조각과 단순 3D 미리보기의 연결 데모, "최종 핏은 실제 제작 후 기록으로 확인" 고지, OpenUSD/Blender 호환성 메모다.

## 8. Phase 4: Innovation Lab 신청 패키지

Innovation Lab은 지금 바로 "3D 완성"을 주장하며 신청하면 위험하다. A라인 스커트 엔진 PoC와 제작 기록이 생긴 뒤 신청 패키지를 강화한다.

신청 패키지에 넣을 증거는 다음이다.

1. Product Workspace B안 화면과 사용 흐름.
2. A라인 스커트 2D 패턴 출력 또는 mock SVG.
3. 치수 입력과 검산 리포트.
4. 첫 테스터 제작 체크리스트와 제작 후 수정 기록.
5. 장기 로드맵: 2D pattern compiler -> 3D preview -> virtual try-on -> physics-informed validation.

요청할 도움은 GPU 인프라, AI software framework 검토, OpenUSD/3D preview 방향성, TensorRT/inference 최적화, physics AI 가능성 검토다.

## 9. Phase 5: Physics AI / Warp 장기 R&D

이 단계는 현재 MVP가 아니다.

Warp, Physics AI, Omniverse, digital twin은 A라인 스커트 엔진과 제작 피드백 루프가 검증된 뒤에만 다룬다. 초기 연구 주제는 완전한 cloth simulation이 아니라 toy-level simulation이다. 예를 들어 2D 패턴 세그먼트 면적, 허리/힙 둘레, 다트량, 단순 바디 치수 사이의 불일치를 heatmap으로 보여주는 정도가 현실적이다.

목표는 패턴사가 검토할 보정 후보를 빠르게 찾는 것이다. 원단 물성까지 정확히 시뮬레이션한다고 주장하지 않는다.

## 10. 지원사업 문구

안전한 한국어 문구는 다음이다.

> FASHword는 NVIDIA Inception 선정 이후, 클라우드 GPU·기술 교육·AI 소프트웨어 리소스를 신청/확인 중입니다. 현재는 A라인 미디 길이 스커트 2D 패턴 엔진과 Product Workspace를 중심으로 통제된 PoC를 진행하고, 이후 NVIDIA 리소스를 활용해 가봉 사진 비식별 처리, 핏 피드백 구조화, 3D 미리보기, 장기 physics AI 검증 로드맵을 단계적으로 실험할 계획입니다.

안전한 영어 문구는 다음이다.

> FASHword has been selected for NVIDIA Inception and is currently applying for and confirming relevant benefits. Our immediate focus is a controlled A-line midi skirt 2D pattern compiler and Product Workspace. NVIDIA resources will be used to support GPU-based experiments, technical training, privacy-aware fitting-photo processing, visual preview research, and a longer-term roadmap toward 3D and physics-informed validation.

금지 문구는 다음이다.

- NVIDIA가 FASHword 기술을 검증했다.
- NVIDIA GPU로 이미 3D fitting simulation을 구현했다.
- Omniverse 기반 제품이 완성됐다.
- AI가 최종 패턴을 자동 제작한다.
- Inception 베네핏을 이미 모두 확보했다.

## 11. 다음 작업

1. Inception 포털에서 신청 가능한 베네핏 상태표를 만든다.
2. DLI/Training은 바로 신청하고 수강 우선순위를 정한다.
3. A라인 스커트 Product Workspace 기능명세서를 구현 기준으로 고정한다.
4. A라인 스커트 2D 엔진 PoC의 최소 수학/검산 스펙을 별도 작성한다.
5. PoC 화면과 출력 증거가 생기면 Innovation Lab 신청 패키지를 만든다.
6. 지원사업 문서에는 "선정 완료, 베네핏 신청 중, 단계적 활용 계획"까지만 쓴다.
