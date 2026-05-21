# PT-BR review support notes

Structural fixes applied
- Normalized all PT frontmatter values from `lang: "pt-BR"` to `lang: "pt"` across `content/pt`.
- Added/aligned missing `translationKey` metadata for PT/EN pairs.
- Fixed PT date locale in `components/ArticleCard.tsx` to use `pt-BR`.
- Wrapped the remaining raw PT HTML table in `best-ai-tools-in-2026-the-ones-i-actually-use.mdx` with `table-wrap`.
- Revalidated PT/EN metadata parity and PT table wrapper usage.

Conservative PT-BR editorial pass applied
- Replaced clear PT-PT forms and awkward anglicisms in a limited set of PT articles.
- Kept technical terms, product names, code paths and API names when changing them would reduce accuracy.
- Repaired accidental wording corruptions introduced during replacements (`vocêstemas`, `vocêntetizar`, broken image path risk).

Validation snapshot
- PT lang counts: 31 files with `lang: "pt"`.
- Missing PT translationKey: 0.
- Missing EN translationKey: 0.
- PT HTML tables without `table-wrap`: 0.
- `ArticleCard.tsx` confirmed with `article.lang === 'pt' ? 'pt-BR' : 'en-US'`.

Known remaining issue outside content review scope
- `npm run lint` still fails on pre-existing React/ESLint issues in:
  - `app/[lang]/[slug]/page.tsx`
  - `components/ArticleLayout.tsx`
  - `components/ThemeToggle.tsx`
- There are also existing unused-variable warnings in a few files.

Intent
- This file is a local support note for the PT-BR/content audit workflow and is not part of the public site output.
