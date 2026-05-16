# Plánované úkoly — DEdicto2

## Čekající

## Hotovo

- [x] [2026-05-16] **Task 18 — Deploy + Fáze 1 dokončena**: Build OK, firebase deploy → https://dedictio.web.app. 49/49 testů, 0 TS chyb.

- [x] [2026-05-16] **Task 17 — Firebase konfigurace**: `firebase.json` + `.firebaserc` (projekt `dedictio`). Commit: `5531c0e`.

- [x] [2026-05-16] **Task 15 — App.tsx root**: 43/43 testů, TS OK, build OK. Commit: `9fdcfdb`.

- [x] [2026-05-16] **Task 16 — PWA ikony**: Node.js script s sharp — generování 192x512 PNG placeholder ikon se znakem "D". Commit: `6ad29ea`.

- [x] [2026-05-16] **Task 14 — QuizScreen orchestrátor**: TDD test-first. 2 testy (WordCard+AnswerGrid display, FeedbackBar po výběru). Orchestrace všech komponent. Commit: `202bdee`.

- [x] [2026-05-16] **Task 13 — useQuiz hook**: TDD, 8 testů (init, 4 možnosti, select, scoring, next, end phase, restart). useReducer state machine. Commit: `515d656`.

- [x] [2026-05-16] **Task 12 — useWords hook**: TDD test-first. 3 testy (loading stav, načtení slova, error handling). Hook s fetch+parseWordsCsv. Commit: `fc632e2`.

- [x] [2026-05-16] **Task 11 — LangPairModal + EndScreen**: TDD test-first. LangPairModal 2 testy (3 páry, onSelect callback), EndScreen 2 testy (správné/špatné počty, onRestart callback). Komponenty + CSS. Commit: `704ff66`.

- [x] [2026-05-16] **Task 10 — FeedbackBar**: Vytvořit `src/components/FeedbackBar.tsx` komponentu s TDD (test-first). 3 testy: "Správně" při correct=true, "Špatně" při correct=false, zavolá onNext po kliknutí. Commit: `ce480ce`.

- [x] [2026-05-16] **Task 8 — WordCard komponenta**: TDD, 2 testy (zdrojové slovo, kategorie). Commit: `3ceb338`.

- [x] [2026-05-16] **Task 6 — LoadingScreen**: TDD, 3 testy (spinner, error hláška, spinner při chybě). Commit: `7b0dced`.

- [x] [2026-05-16] **Task 5 — CSS port**: CSS z design.html 1:1 do App.css (114 řádků). Build OK. Commit: `9bcfea4`.

- [x] [2026-05-16] **Task 9 — AnswerGrid komponenta**: TDD test-first (5 testů: 4 tlačítka, onSelect callback, disabled stav, correct/wrong CSS třídy). Komponenta s answer-btn, correct, wrong, dimmed stavy. Commit: `508e0b2`.

- [x] [2026-05-16] **Task 7 — ProgressBar komponenta**: Vytvořit `src/components/ProgressBar.tsx` s Props (current, total, score), 3 TDD testy. Commit: `4cf5877`.

- [x] [2026-05-16] **Task 4 — CSV parser**: Vytvořit `src/utils/csvParser.ts` s PapaParse wrapper, 3 TDD testy v `src/utils/csvParser.test.ts` (validní CSV, chybějící sloupec, konverze id). Commit: `d1d1555`.

- [x] [2026-05-16] **Task 3 — Fisher-Yates shuffle**: Vytvořit `src/utils/shuffle.ts` s Fisher-Yates algoritmem, 4 TDD testy v `src/utils/shuffle.test.ts`. Commit: `6236934`.

- [x] [2026-05-16] **Task 2 — TypeScript typy**: Vytvořit `src/types/word.ts` s interfacemi (Word, LangPair, QuizQuestion, QuizState), LANG_PAIRS array (3 páry), QUIZ_SIZE=15. TDD test-first. Commit: `4e1c952`.

- [x] [2026-05-16] **Task 1 — Project Setup**: Vite+React+TS scaffold, PWA config, test environment, git init. 2 commity: `517a1bf` + `a23966a`.

- [x] [2026-05-16] **Joke on start**: Přidat do skillu /start instrukci o tom, že mi má nejdřív říct nějaký fór.
- [x] [2026-05-16] **Ověření zápisu/mazání souborů**: Vytvořit `ABC.txt` v rootu projektu `d:\_FYKA\AI\DEdicto2`, pak ho smazat — ověřit, že zápis i mazání funguje bez blokování.
