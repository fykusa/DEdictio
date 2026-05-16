# DEdicto

Aplikace pro procvičování cizojazyčných slovíček formou výběru ze čtyř možností.

## Language

**Slovíčko**:
Jeden záznam s překladem do tří jazyků (čeština, angličtina, němčina) a kategorií.
_Avoid_: slovo, položka, záznam

**Jazykový pár**:
Jednosměrná kombinace zdrojového a cílového jazyka. Určuje, co je zobrazeno jako otázka a co jako správná odpověď. Existuje 6 párů (všechny kombinace CZ/EN/DE v obou směrech).
_Avoid_: jazyk, směr, mód

**Kolo**:
Jedna sekvence 15 náhodně vybraných Slovíček v daném Jazykovém páru. Kolo končí zobrazením výsledku. Kola nemají paměť — každé nové Kolo generuje novou náhodnou sadu bez ohledu na výsledky předchozího.
_Avoid_: session, hra, test, round

**Otázka**:
Jedno Slovíčko v rámci Kola: zobrazí se zdrojový tvar, uživatel vybírá správný cílový tvar ze čtyř možností.
_Avoid_: karta, úkol, položka kola

**Distraktory**:
Tři nesprávné možnosti v Otázce, náhodně vybrané z ostatních Slovíček ve stejném cílovém jazyce.
_Avoid_: špatné odpovědi, falešné možnosti

**Skóre**:
Počet bodů získaných v Kole. +10 za každou správně zodpovězenou Otázku.
_Avoid_: body, výsledek

**Výchozí jazykový pár**:
Jazykový pár aktivní při prvním spuštění aplikace bez jakékoli interakce uživatele. Je to DE→CZ.
_Avoid_: default, počáteční nastavení

## Relationships

- **Kolo** obsahuje právě 15 **Otázek**
- Každá **Otázka** má právě jednu správnou odpověď a tři **Distraktory**
- **Distraktory** jsou vybírány ze Slovíček stejného **Jazykového páru** (cílový jazyk)
- **Skóre** je vlastností **Kola**, ne uživatele (není persistováno)

## Rules

- Změna **Jazykového páru** okamžitě restartuje aktuální **Kolo** — progres se zahodí, generuje se nová sada Slovíček.
- **Distraktoré** nesmí být shodné se správnou odpovědí (string porovnání) — duplicitní překlady se ze seznamu kandidátů vyfiltrují.
- **EndScreen** nabízí dvě akce: „Hrát znovu" (nové Kolo ve stejném Jazykovém páru) a „Změnit jazyk" (otevře LangPairModal, výběr páru spustí nové Kolo).

## Example dialogue

> **Dev:** "Když uživatel restartuje, vrátíme stejná Slovíčka nebo nová?"
> **Domain expert:** "Nová — každé Kolo je nezávislé, žádná paměť předchozích Kol."

> **Dev:** "Jsou Distraktory vybírány z celého CSV nebo jen z aktuálního Kola?"
> **Domain expert:** "Z celého CSV — větší pool znamená různorodější Distraktory."

**Kategorie**:
Informační štítek Slovíčka (např. „zvířata", „jídlo") zobrazený na kartě Otázky. V Fázi 1 slouží pouze k orientaci uživatele — neovlivňuje výběr Slovíček do Kola.
_Avoid_: skupina, téma, filtr

## Flagged ambiguities

- _(zatím žádné)_
