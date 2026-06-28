import type { AlineSkirtDraft } from "../engine/aLineSkirtEngine";

type ThreeDPreviewProps = {
  skirtLength: number;
  draft: AlineSkirtDraft;
};

export default function ThreeDPreview({ skirtLength, draft }: ThreeDPreviewProps) {
  return (
    <article className="panel preview-panel shape-panel" data-testid="shape-preview" aria-labelledby="shape-title">
      <div className="panel-header">
        <p className="eyebrow">3D로 보기</p>
        <h2 id="shape-title">A라인 길이 미리보기</h2>
      </div>
      <p className="proxy-caption">도식화 기준 형태</p>
      <div className="sketch-reference" aria-label="도식화 컨펌 기준">
        {draft.fitProxy.sketchReference.views.map((view) => (
          <span key={view}>{view} 도식화</span>
        ))}
      </div>
      <div className="shape-placeholder" aria-hidden="true">
        <span
          className="body-proxy"
          data-testid="body-proxy"
          style={{
            width: `${draft.fitProxy.body.hipWidth * 1.15}px`,
          }}
        />
        <span
          className="body-waist-guide"
          style={{
            width: `${draft.fitProxy.body.waistWidth * 1.08}px`,
          }}
        />
        <span className="skirt-waist" />
        <span
          className="skirt-shape"
          data-testid="skirt-proxy"
          style={{
            height: `${draft.fitProxy.skirt.height}px`,
            width: `${draft.fitProxy.skirt.hemWidth}px`,
          }}
        />
        <span className="shape-line hip" />
        <span className="shape-line hem" style={{ top: `${82 + draft.fitProxy.skirt.height}px`, width: `${draft.fitProxy.skirt.hemWidth}px` }} />
      </div>
      <div className="fit-proxy-report" data-testid="fit-proxy-report" aria-label="입체 미리보기 확인 결과">
        {draft.fitProxy.checks.map((check) => (
          <p key={check.label} className={check.pass ? "fit-pass" : "fit-fail"}>
            <strong>{check.label}</strong>
            <span>{check.message}</span>
          </p>
        ))}
      </div>
      <p className="shape-helper">
        {skirtLength}cm 길이 요청을 반영한 형태 참고입니다. 최종 핏은 실제 제작 후 수정 기록으로 확인하세요.
      </p>
    </article>
  );
}
