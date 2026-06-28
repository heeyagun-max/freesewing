export type TaskStatus = "todo" | "doing" | "done";
export type PrepState = "ready" | "check";

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
    status: TaskStatus;
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
    state: PrepState;
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

export const workspaceProject: WorkspaceProject = {
  id: "a-line-midi-skirt",
  garmentName: "A라인 미디 스커트",
  garmentType: "첫 테스터 패턴",
  updatedAtLabel: "오늘 오전 11:20",
  progressPercent: 68,
  currentStep: "출력 전 길이 확인",
  tasks: [
    { id: "measure", title: "치수 확인", status: "doing" },
    { id: "length", title: "스커트 길이 요청 반영", status: "doing" },
    { id: "pattern", title: "앞판/뒤판 패턴 보기", status: "todo" },
    { id: "print", title: "출력 준비 점검", status: "todo" },
  ],
  measurements: [
    { id: "waist", label: "허리둘레", value: "70", unit: "cm" },
    { id: "hip", label: "엉덩이둘레", value: "94", unit: "cm" },
    { id: "waistToHip", label: "허리-힙 길이", value: "20", unit: "cm" },
    { id: "skirtLength", label: "스커트 길이", value: "72", unit: "cm" },
    { id: "ease", label: "힙 여유량", value: "4", unit: "cm" },
  ],
  bodyFeatures: [
    { id: "waist-curve", label: "허리 곡선 큼", selected: true },
    { id: "hip-room", label: "엉덩이 여유 필요", selected: true },
    { id: "belly-room", label: "앞허리 들뜸 확인", selected: false },
    { id: "side-balance", label: "옆선 균형 확인", selected: false },
    { id: "hem-length", label: "밑단 길이 민감", selected: true },
  ],
  outputPrep: [
    {
      id: "paper",
      label: "용지 크기",
      state: "ready",
      helper: "A4 기준으로 나눠 볼 수 있습니다.",
    },
    {
      id: "pages",
      label: "페이지 나눔",
      state: "check",
      helper: "가로선과 세로선이 이어지는지 확인하세요.",
    },
    {
      id: "guide",
      label: "기준선 확인",
      state: "ready",
      helper: "앞판과 뒤판 기준선이 표시되어 있습니다.",
    },
    {
      id: "shape-file",
      label: "입체 미리보기 확인",
      state: "check",
      helper: "길이 요청이 실루엣에 반영되는지만 확인합니다.",
    },
  ],
  fittingNotes: [
    {
      id: "note-1",
      dateLabel: "출력 전 요청",
      request: "기본 미디 길이보다 조금 더 길게",
      fitRecord: "무릎 아래로 내려오는 A라인 비율을 원합니다.",
      nextAction: "길이를 76cm로 올리고 밑단 폭 변화를 확인합니다.",
    },
    {
      id: "note-2",
      dateLabel: "제작 후 확인",
      request: "허리 뜸과 힙 당김 기록",
      fitRecord: "최종 핏은 실제 제작 후 허리, 힙, 옆선 기준으로 기록합니다.",
      nextAction: "가봉 사진과 착용 메모를 Correction Log로 정리합니다.",
    },
  ],
};
