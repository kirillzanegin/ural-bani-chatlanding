# AGENTS.md

## Project

This is a React + Vite landing page for turnkey countryside bathhouses.

The site language is Russian.

## Main workflow

Work in small sequential modules.

Do not rewrite the whole project unless explicitly asked.

After each task:
1. Run the available checks.
2. Fix errors before finishing.
3. Report what changed.
4. Report which commands were executed.
5. Report whether the build passed.
6. If npm install is blocked by environment restrictions, say that clearly and rely on GitHub Actions CI as the build verification source.

## Required checks

Always try to run:

```bash
npm install
npm run build
```

If dependencies cannot be installed in the current environment, do not pretend that the build passed.

## Text rules

User-facing text must be in Russian.

Do not use the word:
- металлокаркас

Do not use:
- душевая

Use:
- помывочная
- по всему Уралу
- от 100 000 ₽/м²
- от 1 500 000 ₽
- от 2 000 000 ₽
- от 3 000 000 ₽
- от 4 000 000 ₽
- от 6 000 000 ₽

All prices must use only “от”.
Never write upper price limits.

Do not write fixed guarantees about exact final price or fixed full package.

Use cautious wording:
- может входить
- рассчитывается индивидуально
- после уточнения комплектации
- после уточнения площади и особенностей проекта

## Hero rules

The first screen must not show the price.

Hero title:

Бани под ключ от 15 м²

Hero subtitle:

Парная, помывочная, комната отдыха, инженерия и готовность к использованию. Строим по всему Уралу.

Hero facts:
- не готовый модуль
- монтаж от 3 недель
- гарантия 3 года
- индивидуальная планировка

## Design direction

Modern countryside premium.

Use:
- graphite
- warm beige
- wood tones
- copper/amber accent
- white cards
- calm large typography
- clean spacing
- premium architectural feeling

Avoid:
- cheap dacha style
- barrel sauna feeling
- overloaded wooden textures
- bright yellow backgrounds
- visual feeling of temporary buildings or cabins

## Project structure

Keep components modular.

Keep data in /src/data where possible.

Avoid hardcoding repeated cards directly inside components if the content belongs in data files.

## Current priority

The first project goal is a working static React/Vite landing page with:
- all sections rendered
- responsive layout
- placeholder visual blocks
- chat quiz structure
- thanks page
- clean production build
