import type { WorkspaceProject } from "../data/mockWorkspace";

type FittingNotesProps = {
  notes: WorkspaceProject["fittingNotes"];
};

export default function FittingNotes({ notes }: FittingNotesProps) {
  return (
    <article className="panel fitting-panel" data-testid="fitting-notes" aria-labelledby="fitting-title">
      <div className="panel-header">
        <p className="eyebrow">가봉 후 수정 기록</p>
        <h2 id="fitting-title">다음 작업으로 이어지는 기록</h2>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <section className="note-card" key={note.id}>
            <p className="note-date">{note.dateLabel}</p>
            <h3>{note.request}</h3>
            <dl>
              <div>
                <dt>내 핏 기록</dt>
                <dd>{note.fitRecord}</dd>
              </div>
              <div>
                <dt>다음 작업</dt>
                <dd>{note.nextAction}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>
    </article>
  );
}
