# DEdicto2 — Kontext pro agenta

**Datum poslední aktualizace:** 2026-05-16  
**Stav projektu:** Fáze 1 kompletně nasazena → https://dedictio.web.app
zname chyby:
 - nefunkcni prepinani jazyku
 - po vyberu neskoci na dalsi slovo
 - design jiny nez pozadovany v src\design.html

---

## Co to je

**DEdicto** je PWA kvízová aplikace pro učení slovíček ve třech jazycích: čeština / angličtina / němčina. Uživatel vybere jazykový pár (CS↔EN, CS↔DE, EN↔DE) a prochází 15 náhodně vybraných slov v multiple-choice formátu.

---

## Co bylo uděláno (Fáze 1)

Celá Fáze 1 byla naplánována a implementována v jednom dni (2026-05-16) metodou TDD v 18 krocích:

| Task | Co bylo uděláno |
|------|----------------|
| 1 | Vite + React + TS scaffold, vite-plugin-pwa, Vitest + RTL, git init |
| 2 | TypeScript typy: `Word`, `LangPair`, `QuizQuestion`, `QuizState`, `LANG_PAIRS`, `QUIZ_SIZE=15` |
| 3 | `shuffle.ts` — Fisher-Yates, 4 TDD testy |
| 4 | `csvParser.ts` — PapaParse wrapper, validace sloupců, 3 TDD testy |
| 5 | CSS port z `design.html` 1:1 do `App.css` (114 řádků, dark theme) |
| 6 | `LoadingScreen.tsx` — spinner + error hláška, 3 TDD testy |
| 7 | `ProgressBar.tsx` — pruh + "X/Y" + skóre, 3 TDD testy |
| 8 | `WordCard.tsx` — zobrazení slova a kategorie, 2 TDD testy |
| 9 | `AnswerGrid.tsx` — 4 tlačítka, correct/wrong/dimmed stavy, 5 TDD testů |
| 10 | `FeedbackBar.tsx` — zpětná vazba + tlačítko Dál, 3 TDD testy |
| 11 | `LangPairModal.tsx` + `EndScreen.tsx` — výběr páru, výsledková obrazovka |
| 12 | `useWords` hook — fetch + parseWordsCsv, 3 TDD testy |
| 13 | `useQuiz` hook — useReducer state machine, 8 TDD testů |
| 14 | `QuizScreen.tsx` — orchestrátor všech komponent, 2 TDD testy |
| 15 | `App.tsx` — root, přepínání fází (loading/lang-select/quiz/end) |
| 16 | PWA ikony 192×512 px generované Node.js scriptem (sharp) |
| 17 | `firebase.json` + `.firebaserc` (projekt `dedictio`) |
| 18 | `npm run build` → `firebase deploy` → nasazeno, 49/49 testů, 0 TS chyb |

---

## Klíčové soubory

```
dedicto2/
├── public/
│   ├── slovicka.csv          ← zdrojová data (editovatelná bez rebuildu)
│   └── icons/icon-192.png, icon-512.png
├── src/
│   ├── types/word.ts
│   ├── utils/csvParser.ts, shuffle.ts
│   ├── hooks/useWords.ts, useQuiz.ts
│   ├── components/
│   │   ├── LoadingScreen.tsx
│   │   ├── WordCard.tsx, AnswerGrid.tsx
│   │   ├── ProgressBar.tsx, FeedbackBar.tsx
│   │   ├── LangPairModal.tsx, EndScreen.tsx
│   ├── QuizScreen.tsx, App.tsx, App.css, main.tsx
├── firebase.json, .firebaserc
├── vite.config.ts
└── docs/
    ├── superpowers/specs/2026-05-16-faze1-kviz-design.md  ← detailní spec
    └── superpowers/plans/2026-05-16-faze1-kviz.md         ← 18-taskový TDD plán
```

---

## Stack

- React 18 + TypeScript + Vite
- PapaParse (CSV parsing)
- vite-plugin-pwa (service worker, offline)
- Vitest + React Testing Library
- Firebase Hosting (projekt: `dedictio`)
- Vanilla CSS (dark theme, mobile-first, 430px max-width)

---

## Plánované fáze

| Fáze | Obsah | Stav |
|------|-------|------|
| 1 | Základní kvíz PWA | ✅ Nasazeno |
| 2 | Filtry podle kategorie | Neplánováno |
| 3 | Firebase Auth + Firestore progress | Neplánováno |
| 4 | SM-2 spaced repetition + písemný mód | Neplánováno |

---

## Důležité poznámky pro agenta

- **CSV zůstává v `public/`** — aktualizace slovíček nevyžaduje rebuild
- **Žádná externí state knihovna** — pouze `useState` + `useReducer`
- **TDD přístup** — každá komponenta a hook má testy napsané před implementací
- **GateGuard hook** je nakonfigurován v `CLAUDE.md` projektu
- Tasky se evidují v `.claude/tasks.md`
