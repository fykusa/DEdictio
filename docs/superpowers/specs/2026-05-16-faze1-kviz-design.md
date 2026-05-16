# DEdicto — Fáze 1: Kvízová aplikace (Design Spec)

**Datum:** 2026-05-16  
**Stav:** Schváleno uživatelem  
**Rozsah:** Fáze 1 ze 4 — základní kvíz s reálnými daty, PWA, Firebase Hosting

---

## Kontext

Existující `src/design.html` je plně funkční vizuální prototyp kvízové aplikace (dark theme, mobile-first, animace) s hardcoded vzorovou datovou sadou 15 slov. Zdrojová data jsou v `src/slovicka.csv` — semicolon-separated, UTF-8, sloupce: `id;cesky;anglicky;nemecky;kategorie`.

Cílem Fáze 1 je přepsat prototyp do produkčního React + TypeScript projektu napojeného na reálná CSV data, nasaditelného na Firebase Hosting jako PWA.

---

## Stack

| Vrstva | Technologie |
|--------|------------|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| CSV parsing | PapaParse |
| PWA | vite-plugin-pwa |
| Deploy | Firebase Hosting |
| Styling | Vanilla CSS (přeneseno z design.html beze změny) |
| State | React hooks (useState + useReducer) — žádná externí knihovna |

---

## Architektura — datový tok

```
public/slovicka.csv
  └─→ fetch() při startu aplikace
        └─→ useWords() — PapaParse, vrátí Word[]
              └─→ useQuiz(words, langPair) — shuffle, scoring, stav kola
                    └─→ QuizScreen → komponenty
```

CSV zůstává v `public/` jako editovatelný zdroj pravdy. Aktualizace slovíček nevyžaduje rebuild aplikace.

---

## TypeScript typy (`src/types/word.ts`)

```ts
interface Word {
  id: number
  cesky: string
  anglicky: string
  nemecky: string
  kategorie: string
}

interface LangPair {
  id: 'cs-en' | 'cs-de' | 'en-de'
  srcLang: 'cesky' | 'anglicky' | 'nemecky'
  tgtLang: 'cesky' | 'anglicky' | 'nemecky'
  srcLabel: string   // např. "Čeština"
  tgtLabel: string   // např. "Angličtina"
  srcFlag: string    // např. "🇨🇿"
  tgtFlag: string    // např. "🇬🇧"
}

interface QuizQuestion {
  word: Word
  options: string[]    // 4 možnosti včetně správné, shufflované
  correctIndex: number
}

interface QuizState {
  questions: QuizQuestion[]
  currentIndex: number
  score: number
  correctCount: number
  wrongCount: number
  answered: boolean
  phase: 'loading' | 'quiz' | 'end'
}
```

---

## Struktura projektu

```
dedicto2/
├── public/
│   ├── slovicka.csv          ← zdrojová data
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── types/
│   │   └── word.ts
│   ├── utils/
│   │   ├── csvParser.ts      ← PapaParse wrapper + validace sloupců
│   │   └── shuffle.ts        ← Fisher-Yates shuffle
│   ├── hooks/
│   │   ├── useWords.ts       ← fetch + parse CSV, { words, loading, error }
│   │   └── useQuiz.ts        ← celá kvízová logika
│   ├── components/
│   │   ├── LoadingScreen.tsx
│   │   ├── WordCard.tsx
│   │   ├── AnswerGrid.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── FeedbackBar.tsx
│   │   ├── LangPairModal.tsx
│   │   └── EndScreen.tsx
│   ├── QuizScreen.tsx        ← orchestrátor, volá useQuiz, žádná logika
│   ├── App.tsx               ← root, useWords, přepínání fází
│   ├── App.css               ← CSS z design.html 1:1
│   └── main.tsx
├── firebase.json
├── .firebaserc
└── vite.config.ts
```

---

## Komponenty — zodpovědnosti

| Komponenta | Zodpovědnost | Props |
|-----------|-------------|-------|
| `App.tsx` | Volá `useWords()`, drží `langPair`, přepíná Loading/Quiz/End | — |
| `QuizScreen.tsx` | Volá `useQuiz()`, rozdistribuuje stav do child komponent | `words`, `langPair`, `onChangeLang` |
| `WordCard.tsx` | Zobrazí slovo, kategorii, příkladovou větu, CSS animace flip-in/out | `question: QuizQuestion` |
| `AnswerGrid.tsx` | 4 tlačítka odpovědí, correct/wrong/dimmed stav | `options`, `selectedIdx`, `correctIdx`, `onSelect` |
| `ProgressBar.tsx` | Procentuální pruh + text "X / Y" a skóre | `current`, `total`, `score` |
| `FeedbackBar.tsx` | Zpětná vazba po odpovědi + tlačítko Dál | `correct`, `score`, `onNext` |
| `LangPairModal.tsx` | Bottom sheet pro výběr jazykového páru | `pairs`, `activePairId`, `onSelect`, `onClose` |
| `EndScreen.tsx` | Výsledky kola (správně/chybně/body), restart | `correctCount`, `wrongCount`, `score`, `total`, `onRestart` |
| `LoadingScreen.tsx` | Spinner během načítání CSV, chybová hláška | `error?: string` |

---

## Kvízová logika (`useQuiz`)

- Každé kolo = `QUIZ_SIZE = 15` náhodně vybraných slov z celého CSV (Fisher-Yates shuffle)
- Distraktoré pro AnswerGrid: 3 náhodná slova z téhož CSV (stejný cílový jazyk), shufflovaná se správnou odpovědí
- Skóre: +10 bodů za správnou odpověď
- Po výběru odpovědi: `answered = true`, tlačítka disabled, zobrazí FeedbackBar
- Po kliknutí Dál: `currentIndex++`, pokud `>= QUIZ_SIZE` → fáze `end`

---

## Mobile-first & PWA

Aplikace je navržena primárně pro mobilní prohlížeče:
- Šířka `min(430px, 100vw)`, výška `100dvh`
- Dotyková tlačítka `min-height: 64px`
- `viewport-fit=cover` pro notch/Dynamic Island

PWA konfigurace (`vite-plugin-pwa`):
- `display: 'standalone'` — bez adresního řádku prohlížeče
- `theme_color: '#0F1117'`
- Service worker strategie `CacheFirst` pro `slovicka.csv` → offline funguje po prvním spuštění
- Ikony: 192×192 a 512×512 px

---

## Deploy pipeline

```
npm run build          # vite build → dist/
firebase deploy        # nahraje dist/ na Firebase Hosting
```

`firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

---

## Co je mimo rozsah Fáze 1

Následující funkce jsou záměrně odloženy do pozdějších fází:
- Filtry podle kategorie (Fáze 2)
- Firebase Auth + Firestore progress (Fáze 3)
- Spaced repetition algoritmus SM-2 (Fáze 4)
- Písemný mód odpovědí (Fáze 4)
