# DEdicto — Kvíz slovíček

Webová aplikace (PWA) pro procvičování slovíček v češtině, angličtině a němčině.

**Živá verze:** https://dedictio.web.app

---

## Co to umí

- Multiple-choice kvíz: vždy 15 náhodně vybraných slov
- Tři jazykové páry: **CZ↔EN**, **CZ↔DE**, **EN↔DE**
- Zpětná vazba po každé odpovědi (správně / špatně + body)
- Výsledková obrazovka se skóre a možností opakování
- **PWA** — funguje offline po prvním spuštění, instalovatelné na mobilní plochu
- Mobilní design (dark theme, dotyková tlačítka)

---

## Slovíčka

Data jsou v souboru `public/slovicka.csv` (semicolon-separated, UTF-8):

```
id;cesky;anglicky;nemecky;kategorie
1;pes;dog;der Hund;zvířata
```

Soubor lze editovat přímo — žádný rebuild aplikace není potřeba.

---

## Lokální vývoj

```bash
npm install
npm run dev        # http://localhost:5173
npm run test       # Vitest (watch mode)
npm run build      # produkční build → dist/
```

---

## Deploy

```bash
npm run build
firebase deploy
```

Hosting je nakonfigurován na Firebase projekt `dedictio`.

---

## Architektura

```
public/slovicka.csv
  └─→ useWords()       — fetch + PapaParse
        └─→ useQuiz()  — Fisher-Yates shuffle, scoring, useReducer
              └─→ QuizScreen → komponenty
```

| Soubor | Zodpovědnost |
|--------|-------------|
| `src/hooks/useWords.ts` | Načtení a parsování CSV |
| `src/hooks/useQuiz.ts` | Celá kvízová logika (state machine) |
| `src/QuizScreen.tsx` | Orchestrátor komponent |
| `src/App.tsx` | Root — přepínání fází (loading / výběr páru / kvíz / výsledky) |
| `src/utils/shuffle.ts` | Fisher-Yates shuffle |
| `src/utils/csvParser.ts` | PapaParse wrapper s validací sloupců |

---

## Stack

- React 18 + TypeScript
- Vite + vite-plugin-pwa
- PapaParse
- Vitest + React Testing Library
- Firebase Hosting
- Vanilla CSS (bez UI knihovny)

---

## Testy

```bash
npm run test              # watch mode
npm run test -- --run     # jednorázově
```

49 testů, pokrytí všech komponent, hooků a utilit metodou TDD.
