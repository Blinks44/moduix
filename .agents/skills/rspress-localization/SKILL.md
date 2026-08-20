---
name: rspress-localization
description: Localize, add, review, or troubleshoot multilingual Rspress documentation in website. Use for Rspress locales, i18n.json, useI18n, useLang, locale-aware links and page lists, translated MDX, navigation parity, or localization audits.
---

# Rspress Localization

Use Rspress's public configuration, runtime hooks, and file-based routes. Keep translations as content and data, never as component branches.

## Read first

1. Read `website/rspress.config.ts`, `website/i18n.json`, and `website/tsconfig.json`.
2. Inspect equivalent MDX files and `_nav.json` / `_meta.json` files for every affected locale.
3. For uncertain API behavior, consult current official Rspress i18n and runtime-hook documentation. Verify options against the installed Rspress version before adding them.

## Model

- Configure every supported language in `locales`; set `lang` to the default language. The default language has no route prefix.
- Store locale-specific pages under the corresponding language directory in the docs root.
- Store shared UI phrases for custom React/MDX/theme components in `website/i18n.json`.
- Configure the TypeScript `i18n` path alias and use typed `useI18n<typeof import('i18n')>()`.
- Use i18n keys in `_nav.json` and `_meta.json` when one navigation label is intentionally shared. Otherwise keep each locale's navigation content in its own language.
- Keep prose, frontmatter, titles, descriptions, navigation, and user-visible component data in their locale files or `i18n.json`, according to their scope.

## Translation quality and terminology

Treat localization as technical editing, not string substitution.

- Translate meaning, intent, tone, accessibility guidance, warnings, constraints, and all reader-facing context. Do not omit details merely to make a sentence shorter.
- Write fluent, idiomatic text for the target audience. Prefer established documentation language over a literal or word-for-word machine translation.
- Preserve the source document's information architecture, precision, examples, cautions, and level of detail. A translation must be equally actionable and technically correct.
- Use existing project terminology consistently. When a term is ambiguous, inspect accepted pages, component docs, and upstream documentation before choosing a rendering; keep a small project glossary only when a term recurs.
- Preserve proper names and public identifiers exactly: component names such as `Collapsible`, product names such as `Formisch`, package names, imports, API members, props, events, CSS variables, design-token names, commands, file paths, URLs, and code identifiers.
- Translate surrounding prose and explanatory labels, but never translate a public identifier into a fictional API. Apply the separate code-example policy below to every fenced or file-backed example.
- Preserve Markdown/MDX structure, frontmatter field names, links, anchors, fenced-code languages, and syntax. Translate visible link text where appropriate, not the destination unless the locale has a real corresponding route.
- Review target-language typography, grammar, punctuation, capitalization, terminology, and naturalness. Reject unreviewed, awkward, or incomplete machine translation.

## Required language pass

After translating or editing reader-facing prose, review every changed paragraph as a native reader
would, independently of the source text. Rephrase it when it sounds translated rather than written
for that language.

- Translate the meaning and the documentation intent, not the source sentence's word order or
  grammar. Prefer a short, direct sentence over a literal construction.
- Preserve public identifiers exactly, but translate surrounding prose into the target language.
  Do not leave English implementation phrasing such as `layout` or `application-owned` in ordinary
  reader-facing text when the language has a natural equivalent.
- Replace calques with idiomatic wording. For example, write «свой контейнер» or «своя разметка»
  instead of «собственный layout» in Russian, and «un conteneur de votre choix» rather than «votre
  propre layout» in French.
- Read changed sentences in their local paragraph, not in isolation. Check that pronouns, article
  choice, technical terms, and sentence rhythm are natural in the target language.
- When no idiomatic translation is clear, simplify the explanation. Do not preserve an awkward
  source-language metaphor or invent a pseudo-technical term.

## Choose the smallest native mechanism

The best localization solution is the simplest one that meets the reader's need with Rspress's public API. Prefer a locale file, `i18n.json`, or one documented hook over a new abstraction. Add a helper only when those mechanisms genuinely cannot express the requirement; keep it shared, small, and tied to a concrete need.

| Need                                           | Use                                                |
| ---------------------------------------------- | -------------------------------------------------- |
| Page prose, headings, frontmatter              | Localized MDX file                                 |
| Shared React/MDX/theme UI phrase               | `i18n.json` + typed `useI18n`                      |
| Built-in theme text override                   | `i18n.json` or `i18nSource`                        |
| Current language for routing or page filtering | `useLang`                                          |
| Current-language page index/gallery            | `usePages()` filtered by `page.lang === useLang()` |
| Markdown or MDX internal link                  | Locale-neutral route such as `/docs/button`        |
| TSX link that navigates the documentation site | Shared `useLocalizedPath` plus Rspress `Link`      |

`usePages()` returns metadata for all languages. Always filter it by `page.lang` before rendering a locale-specific collection. Do not infer the locale from a route prefix; default and non-default locales use different prefixes.

## Message design, formatting, and accessibility

- Store each reader-facing UI message as one complete locale-owned string. Do not build sentences by concatenating translated fragments, appending translated suffixes, or selecting keys from English text.
- Design dynamic copy for the grammar of every locale. If a variable count, date, unit, gender, or word order would make a shared sentence awkward, simplify the UI wording or use a complete locale-specific message; do not introduce a custom translation engine for it.
- Use descriptive, stable i18n keys. Keep translation context evident from the key and component; add only a short nearby code comment when the context would otherwise be unclear.
- Format reader-facing dates, numbers, currencies, and units with the platform `Intl` APIs and the current language from `useLang`; never hand-format locale data.
- Localize user-facing accessible text in the documentation UI too: alternative text, `aria-label`, `title`, validation and error messages, status messages, and empty states. Preserve the actual HTML, ARIA, and API attribute names unchanged. Literal copy inside a shared, copyable code example and its runnable preview follows the code-example policy below.
- Review rendered translations in context. Check labels, headings, controls, and cards for truncation, awkward wrapping, and lost meaning. Plan explicit direction and layout testing before introducing a right-to-left locale.

## Links and incomplete translations

- Keep links locale-neutral in Markdown, MDX, and navigation JSON; let Rspress resolve the locale.
- Use `useLocalizedPath` only in custom TSX links that navigate the documentation site, where Rspress `Link` does not localize `href` itself. Application routes in a copyable recipe are example data, not documentation routes.
- Before creating a localized internal link, verify that its target exists for that locale. Do not silently generate 404 links.
- Verify locale-specific anchor fragments as well as page routes; a translated heading can change its generated anchor.
- If a locale intentionally lacks a page, choose and document one product decision: omit the link/card, link explicitly to the default-language page, or add the missing page. Do not implement hidden fallback rules.
- Keep translation status honest: update paired locale content when the source changes, and report deliberate gaps rather than implying language parity.

## Prohibited patterns

- Do not use `lang === 'ru'`, `locale === '…'`, `isRussian`, `t(english, russian)`, or inline per-language dictionaries for reader-facing text.
- Do not pass a manual `locale` prop through MDX merely to translate a component.
- Do not duplicate translated snippets, preview files, or whole React components only to change text.
- Do not add route-prefix string logic in individual components.
- Do not add a translation abstraction, fallback router, generated locale tree, or speculative generic helper when `i18n.json`, `useI18n`, `useLang`, `usePages`, or the shared link helper already cover the case.

## Code examples: one shared source

Keep one default-language source for every copyable example. Preserve its code content byte-for-byte across locale pages: public API names, commands, identifiers, comments, fixtures, human-readable UI literals, `aria-label`, `title`, and code semantics all stay in the source language. Its runnable preview is part of that same example and keeps the same copy.

Translate the surrounding prose and documentation UI, not the example implementation. Do not duplicate locale-specific snippet trees, pass a locale into an example, add Rspress i18n to copyable recipe code, or create locale-only preview wrappers merely to change example copy. The example must remain self-contained and usable when copied into a consumer application.

Locale pages may use a different relative `file` directive solely to reference the one shared source. That path difference is allowed; it is not a translated code change.

## Verification

1. Compare affected locales for route, MDX structure, frontmatter, navigation, links, and shared UI behavior. Report intentional gaps.
2. Search `website/src` for manual locale branches and in-component language dictionaries.
3. Confirm every referenced i18n key has text for every configured locale.
4. Complete the required language pass. Read the translation as a target-language document: verify
   semantic completeness, preserved identifiers, consistent terminology, grammar, locale formatting,
   accessible text, and reader-ready language.
5. Build the docs when the change affects routes, MDX file references, navigation, or links; otherwise run proportionate TypeScript and lint checks.
6. If the installed Rspress version supports `languageParity`, consider enabling it with explicit includes/excludes. Do not add unsupported configuration.

## References

- https://rspress.rs/guide/basic/i18n
- https://rspress.rs/ui/hooks/use-i18n
- https://rspress.rs/ui/hooks/use-pages
- https://rspress.rs/api/config/config-basic
- https://developers.google.com/style/translation
- https://learn.microsoft.com/en-us/globalization/localization/localize-content
- https://learn.microsoft.com/en-us/globalization/localization/managing-terminology