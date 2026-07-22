# Typeset

## Upstream docs

Ark UI does not provide a typesetting primitive. `Typeset` is a moduix-owned semantic HTML contract
implemented with the [Ark factory](https://ark-ui.com/docs/guides/composition#the-ark-factory).
Its CSS-first rhythm is informed by [shadcn/typeset](https://ui.shadcn.com/docs/typeset), without
adding a Markdown renderer, parser, or shadcn-specific wrapper API.

## Purpose

`Typeset` gives rendered Markdown, CMS content, and streaming chat output a scoped reading rhythm
while the application retains content, sanitization, layout, and reading-measure ownership.

## Upstream model to preserve

Preserve standard semantic HTML and the Ark factory's `asChild`, ref, and native prop behavior. The
style contract must remain append-safe: new streamed nodes add only their own layout and never change
the styles of content already on screen.

## Current behavior contract

- `Typeset` renders a `div` by default. `Typeset.Root` is an alias with the same contract.
- `asChild` preserves a single semantic container such as `article` or `section`.
- `Typeset.Scroll` is an opt-in horizontal scroller for a wide table or another rendered block.
- The rhythm controls are `--moduix-typeset-size`, `--moduix-typeset-leading`, and `--moduix-typeset-flow`. Optional
  font variables are `--moduix-typeset-font-body`, `--moduix-typeset-font-heading`, and `--moduix-typeset-font-mono`.
- Colors, borders, and radius come from existing moduix theme tokens; Typeset has no second palette
  or width prop.
- `.not-typeset` and `data-not-typeset` exclude a subtree, including any nested Typeset root.
- Paragraphs, headings, lists, task lists, blockquotes, code, tables, media, disclosures,
  definition lists, and GFM footnotes are styled from semantic HTML.

## Anatomy and exported parts

```text
Typeset / Typeset.Root  data-slot="typeset"
└─ Typeset.Scroll       data-slot="typeset-scroll"
```

`[data-scope="typeset"][data-part="root"]` and `[data-part="scroll"]` are stable public hooks.

## Composition

```tsx
<Typeset asChild className="article">
  <article>
    <h1>Release notes</h1>
    <p>Rendered Markdown keeps a consistent rhythm.</p>
  </article>
</Typeset>
```

Use `Typeset.Scroll` in a renderer's table component when a table should scroll instead of compress.
Do not put Markdown parsing, sanitization, or fixed reading width into this component.

## Upstream feature coverage

- Container-relative type, theme-token colors, CSS presets, low-specificity element styles, and
  streaming stability are supported.
- `Typeset.Scroll` is moduix sugar for the wide-block wrapper; the underlying table remains native.
- No shadcn builder, generic `.typeset` class, Tailwind dependency, or generated CSS file is
  required. Registry consumers own the copied TSX and CSS Module sources.

## Accessibility and state

- Typeset has no state machine, callbacks, form behavior, `HiddenInput`, context, or provider.
- The consumer chooses semantic container elements with `asChild`; rendered HTML retains its native
  roles and keyboard behavior.
- Task-list checkboxes remain native controls. `details` and `summary` retain native disclosure
  behavior.
- Refs forward to the rendered root or scroll `div` through the Ark factory.

## Defaults and styling

- The root follows the surrounding font by default, then applies a small-screen type-size bump below
  `48rem`. Above that breakpoint and when printing, it uses `--moduix-typeset-size` as-is.
- Styles live in `@layer moduix.components` and use `:where()` element selectors, allowing ordinary
  application CSS to override an individual rendered element.
- Plain `ul` and `ol` elements always restore their semantic markers: disc, circle, then square for
  unordered nesting; decimal, lower-alpha, then lower-roman for ordered nesting. Task lists keep
  their checkbox treatment instead.
- Block spacing only uses `margin-block-start`; no layout rule uses `:last-child`, `:has()`, or
  `:empty`. Cell borders, rather than row-position selectors, separate appended table rows.
- Page layout owns measure. The root has no fixed or maximum width.

## Intentional sugar and differences from upstream

`Typeset.Scroll` removes the repeated overflow wrapper needed for wide blocks while keeping the raw
table markup and custom renderer path available. The component exposes Ark `asChild` and data slots
because moduix distributes a React component; the visual contract remains CSS-first rather than
prop-driven.

## Agent notes

- Keep the API limited to semantic structure. Do not add parser, renderer, sanitization, theme, or
  layout props.
- Every future element rule must preserve the `.not-typeset` / `data-not-typeset` escape hatch and
  append-stability constraints.

## Local changelog

- 2026-07-22: Moved styles into the namespaced `moduix.components` cascade layer.
- 2026-07-20: Made basic list markers explicit and expanded the recommended Basic example to cover
  nested lists, ordered lists, quotations, code, tables, and disclosures.
- 2026-07-20: Simplified the public CSS contract to rhythm and font variables, added the standard
  opt-out class, broadened semantic Markdown coverage, and documented responsive/streaming rules.
- 2026-07-20: Added the CSS-first Typeset root and optional scroll wrapper for rendered HTML and
  Markdown.