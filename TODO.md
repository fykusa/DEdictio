# DEdicto — Fáze 1: Todo checklist

> Detailní implementační plán: `docs/superpowers/plans/2026-05-16-faze1-kviz.md`

---

## Wave 1 — Project Setup

- [ ] **Task 1: Project Setup** — Vite + React + TS, závislosti, vite.config.ts (PWA + Vitest), přesun slovicka.csv do public/

---

## Wave 2 — Typy, utils, CSS, komponenty (paralelní)

- [ ] **Task 2: TypeScript typy** — `src/types/word.ts` (Word, LangPair, QuizState, LANG_PAIRS, QUIZ_SIZE)
- [ ] **Task 3: Fisher-Yates shuffle** — `src/utils/shuffle.ts`
- [ ] **Task 4: CSV parser** — `src/utils/csvParser.ts` (PapaParse wrapper, validace sloupců)
- [ ] **Task 5: CSS port** — obsah `<style>` z design.html → `src/App.css` beze změny
- [ ] **Task 6: LoadingScreen** — `src/components/LoadingScreen.tsx`
- [ ] **Task 7: ProgressBar** — `src/components/ProgressBar.tsx`
- [ ] **Task 8: WordCard** — `src/components/WordCard.tsx`
- [ ] **Task 9: AnswerGrid** — `src/components/AnswerGrid.tsx` (correct / wrong / dimmed stavy)
- [ ] **Task 10: FeedbackBar** — `src/components/FeedbackBar.tsx`
- [ ] **Task 11: LangPairModal + EndScreen** — `src/components/LangPairModal.tsx` + `src/components/EndScreen.tsx`

---

## Wave 3 — Hooks (paralelní)

- [ ] **Task 12: useWords** — `src/hooks/useWords.ts` (fetch + parse CSV, loading/error state)
- [ ] **Task 13: useQuiz** — `src/hooks/useQuiz.ts` (useReducer, shuffle, scoring, select/next/restart)

---

## Wave 4 — Orchestrátor

- [ ] **Task 14: QuizScreen** — `src/QuizScreen.tsx` (propojí všechny komponenty a useQuiz)

---

## Wave 5 — Root

- [ ] **Task 15: App.tsx** — root komponenta, useWords, přepínání Loading/Quiz, langPair state

---

## Wave 6 — PWA + Firebase (paralelní)

- [ ] **Task 16: PWA ikony** — `public/icons/icon-192.png` + `icon-512.png`
- [ ] **Task 17: Firebase konfigurace** — `firebase.json` + `.firebaserc`

---

## Wave 7 — Deploy

- [ ] **Task 18: Finální ověření a deploy**
  - [ ] Celá test suite (`npx vitest run --coverage`)
  - [ ] Build (`npm run build`)
  - [ ] TypeScript check (`npx tsc --noEmit`)
  - [ ] `firebase deploy`
  - [ ] Smoke test v prohlížeči (mobilní UA)
