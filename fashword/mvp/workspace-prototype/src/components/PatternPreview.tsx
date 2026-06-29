import { useState } from "react";
import type { AlineSkirtDraft } from "../engine/aLineSkirtEngine";

type PatternPreviewProps = {
  status: string;
  skirtLength: number;
  draft: AlineSkirtDraft;
  onSkirtLengthChange: (value: number) => void;
};

export default function PatternPreview({
  status,
  skirtLength,
  draft,
  onSkirtLengthChange,
}: PatternPreviewProps) {
  const [openSourceIds, setOpenSourceIds] = useState<Set<string>>(new Set());

  const toggleSource = (sourceId: string) => {
    setOpenSourceIds((current) => {
      const next = new Set(current);
      if (next.has(sourceId)) {
        next.delete(sourceId);
      } else {
        next.add(sourceId);
      }
      return next;
    });
  };

  return (
    <article className="panel preview-panel" data-testid="pattern-preview" aria-labelledby="pattern-title">
      <div className="panel-header">
        <p className="eyebrow">패턴 보기</p>
        <h2 id="pattern-title">{status}</h2>
      </div>
      <div className="length-control" data-testid="length-control">
        <div>
          <p className="length-label">스커트 길이 요청</p>
          <strong data-testid="skirt-length-value">{skirtLength}cm</strong>
        </div>
        <div className="length-actions" aria-label="스커트 길이 빠른 조정">
          <button type="button" onClick={() => onSkirtLengthChange(skirtLength - 4)}>
            더 짧게
          </button>
          <button type="button" onClick={() => onSkirtLengthChange(72)}>
            기본
          </button>
          <button type="button" onClick={() => onSkirtLengthChange(skirtLength + 4)}>
            더 길게
          </button>
        </div>
        <label className="range-field" htmlFor="skirt-length-range">
          <span>48cm</span>
          <input
            id="skirt-length-range"
            type="range"
            min="48"
            max="90"
            step="1"
            value={skirtLength}
            onChange={(event) => onSkirtLengthChange(Number(event.target.value))}
          />
          <span>90cm</span>
        </label>
      </div>
      <svg className="pattern-svg" viewBox="0 0 520 300" role="img" aria-label="앞판과 뒤판 패턴 보기">
        <rect x="0" y="0" width="520" height="300" rx="18" fill="#f7f1e8" />
        <path d={draft.front.path} fill="#fffdf8" stroke="#2d2a26" strokeWidth="3" />
        <path d={draft.back.path} fill="#fffdf8" stroke="#2d2a26" strokeWidth="3" />
        <path
          d={`M${draft.front.grainline.x1} ${draft.front.grainline.y1} L${draft.front.grainline.x2} ${draft.front.grainline.y2}`}
          stroke="#b64f35"
          strokeWidth="2"
          strokeDasharray="8 7"
        />
        <path
          d={`M${draft.back.grainline.x1} ${draft.back.grainline.y1} L${draft.back.grainline.x2} ${draft.back.grainline.y2}`}
          stroke="#b64f35"
          strokeWidth="2"
          strokeDasharray="8 7"
        />
        <path d={draft.front.hipline} fill="none" stroke="#7a8b62" strokeWidth="3" />
        <path d={draft.back.hipline} fill="none" stroke="#7a8b62" strokeWidth="3" />
        <path d={draft.front.hemline} fill="none" stroke="#42677a" strokeWidth="2" />
        <path d={draft.back.hemline} fill="none" stroke="#42677a" strokeWidth="2" />
        <text x="128" y="285">앞판</text>
        <text x="350" y="285">뒤판</text>
        <text x="232" y="60" className="svg-label">허리선</text>
        <text x="226" y="104" className="svg-label">힙선</text>
        <text x="226" y="134" className="svg-label">A라인 밑단</text>
      </svg>
      <p className="validation-copy">
        검산: 힙 완성 {draft.validation.finishedHip}cm · 다트량 {draft.validation.totalDartIntake}cm · 옆선 오차 {Math.round(draft.validation.sideSeamDifferenceRatio * 1000) / 10}%
      </p>
      <div className="draft-report" data-testid="draft-report" aria-label="출력용 검산 리포트">
        {draft.report.messages.map((message) => (
          <p key={message}>{message}</p>
        ))}
        {draft.report.correctionSources.length > 0 ? (
          <div className="correction-source-list" aria-label="사용자 수정 기록 근거">
            {draft.report.correctionSources.map((source) => {
              const isOpen = openSourceIds.has(source.id);
              const sourceTitle = source.message.split(" · ")[0] ?? source.label;

              return (
                <section className="correction-source-item" key={source.id}>
                  <p>
                    <span>{source.label}</span>
                    {source.message}
                  </p>
                  <button
                    type="button"
                    className="source-detail-toggle"
                    aria-expanded={isOpen}
                    onClick={() => toggleSource(source.id)}
                  >
                    {sourceTitle} 세부 기록 {isOpen ? "접기" : "보기"}
                  </button>
                  {isOpen ? (
                    <dl className="source-detail" data-testid={`correction-source-detail-${source.id}`}>
                      <div>
                        <dt>핏 기록</dt>
                        <dd>{source.fitRecord}</dd>
                      </div>
                      <div>
                        <dt>다음 조치</dt>
                        <dd>{source.nextAction}</dd>
                      </div>
                    </dl>
                  ) : null}
                </section>
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}
