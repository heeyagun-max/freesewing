# Correction Source Detail Toggle Report

## Conclusion

Correction source summary provenance is preserved, and each source now exposes `fitRecord` and `nextAction` only after the user opens its detail toggle.

## RED Evidence

- `npx playwright test tests/a-line-skirt-engine.spec.ts` failed before implementation because `draft.report.correctionSources` dropped `fitRecord` and `nextAction`.
- `npx playwright test tests/workspace.spec.ts --grep "desktop workspace"` failed before implementation because the `제작 후 확인 세부 기록 보기` toggle button did not exist.

## GREEN Evidence

- `npm run build` passed.
- `npx playwright test tests/a-line-skirt-engine.spec.ts` passed: 8 passed.
- `npx playwright test` passed: 10 passed.
- Visual evidence inspected:
  - `test-results/ulw-evidence/workspace-browser-desktop-longer.png`
  - `test-results/ulw-evidence/workspace-browser-mobile.png`

## Modified Files

- `src/engine/aLineSkirtEngine.ts`
  - Keeps `CorrectionLogSource.fitRecord` and `CorrectionLogSource.nextAction` in `draft.report.correctionSources`.
- `src/components/PatternPreview.tsx`
  - Adds per-source detail toggles in the draft report area.
  - Keeps the existing source summary visible while detail content stays collapsed by default.
- `src/styles.css`
  - Adds compact styles for the correction source toggle and expanded detail block.
- `tests/a-line-skirt-engine.spec.ts`
  - Adds the data-preservation RED/GREEN contract.
- `tests/workspace.spec.ts`
  - Adds the UI collapse, expand, and re-collapse contract.

## Risk

- The toggle label derives its short title from the summary message prefix before ` · `. If future source messages remove that separator, the fallback is still safe but the button label may be less specific.
- The preview server on `127.0.0.1:4173` was already running before this task. I reused it and did not reclaim it because it was not agent-owned.
- A separate Browser MCP navigation attempt to `http://127.0.0.1:4173` timed out after the Playwright CLI verification. The accepted UI evidence is the passing Playwright run plus inspected screenshots above.

## Next Recommendation

Add one focused accessibility assertion for `aria-expanded` state changes if this report area becomes a repeated interaction pattern across more pattern types.
