# Sféra pro domov — web služeb

Český web představující řešení pro domácí klima a energetiku. Spojuje stránky služeb, reference, redakční obsah a poptávkové formuláře s integrací systému Sanity.

**Stav:** Zdrojový kód webu do portfolia; nasazení, analytika a doručování poptávek nebyly při této úpravě znovu ověřeny.

## Co projekt obsahuje

- Stránky klimatizací, tepelných čerpadel, rekuperace, fotovoltaiky a elektroinstalací.
- Blog a reference včetně detailních stránek.
- Klient Sanity a vložené Studio pro správu obsahu.
- Sdílené prvky prezentace produktů a služeb, formuláře, souhlas s cookies a analytické komponenty.

## Technologie

Next.js, React, TypeScript, Tailwind CSS, Sanity.

## Architektura a struktura

- `app/` — stránky služeb, blogu, referencí a Studia
- `components/` — rozvržení, formuláře a sdílené prvky
- `app/lib/sanity.client.ts` — konfigurace klienta Sanity
- `SANITY_SETUP.md` — stávající poznámky k nastavení CMS

## Lokální vývoj

Potřebujete Node.js a npm. V kořenové složce repozitáře spusťte:

```sh
npm install
npm run dev
```

Příkaz pro sestavení uvedený v projektu: `npm run build`.

Jde o příkazy deklarované v repozitáři, nikoli o potvrzení úspěšného sestavení. Instalace závislostí, sestavení ani napojení na živé služby nebyly při úpravě dokumentace spuštěny.

## Konfigurace a omezení

Klient Sanity čte `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` a `SANITY_API_TOKEN`. Konfiguraci nastavte lokálně nebo v hostingu; soukromé tokeny ponechte na serveru. Před aktivací integrací projděte `SANITY_SETUP.md` a dokumentaci analytiky. Formulářové komponenty jsou přítomné, ale doručovací cíl vyžaduje samostatné ověření.

Repozitář obsahuje také generované soubory `dist/` a `.sanity/runtime/`. Za hlavní podklad implementace považujte zdrojové složky; v rámci této dokumentační úpravy nebyly generované soubory odstraňovány.

## Přínos pro portfolio

Ukazuje skládání udržovatelných stránek, integraci CMS a konfiguraci potřebnou k provozu firemního webu.

## Co doplnit do dokumentace

Snímky obrazovky s fiktivními daty, opakovatelný postup ověření a přehled skutečně otestovaných integrací. Přihlašovací údaje a konfigurace konkrétního nasazení patří mimo Git.
