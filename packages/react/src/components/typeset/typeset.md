# Typeset

## Upstream docs

Ark UI does not provide a typesetting primitive. `Typeset` is a moduix-owned semantic HTML contract
implemented with the [Ark factory](https://ark-ui.com/docs/guides/composition#the-ark-factory).
Its CSS-first rhythm is informed by [Chakra Prose](https://chakra-ui.com/docs/components/prose) and
[shadcn/typeset](https://ui.shadcn.com/docs/typeset), without adding a Markdown renderer, parser,
or shadcn-specific wrapper API. These sources were reviewed on 2026-09-12.

## Purpose

`Typeset` gives rendered Markdown, CMS content, and streaming chat output a scoped reading rhythm
while the application retains content, sanitization, layout, and reading-measure ownership.

## Upstream model to preserve

Preserve standard semantic HTML and the Ark factory's `asChild`, ref, and native prop behavior. The
style contract must remain append-safe: new streamed nodes add only their own layout and never change
the styles of content already on screen.

## Current behavior contract

- `Typeset` renders a `div` by default.
- `asChild` preserves exactly one semantic container such as `article` or `section`.
- `TypesetScroll` is an opt-in horizontal scroller for a wide table or another rendered block. It
  defaults to `tabIndex={0}` so an overflowing static block is keyboard reachable; consumers can
  pass another `tabIndex` or native ARIA props when needed. Give user-facing scrollers an
  `aria-label` or `aria-labelledby`: this also adds `role="region"` unless the consumer passes a
  role explicitly.
- The rhythm controls are `--moduix-typeset-size`, `--moduix-typeset-leading`, and `--moduix-typeset-flow`. Optional
  font variables are `--moduix-typeset-font-body`, `--moduix-typeset-font-heading`, and `--moduix-typeset-font-mono`.
- Colors, borders, and radius come from existing moduix theme tokens; Typeset has no second palette
  or width prop.
- `.not-typeset` and `data-not-typeset` exclude a subtree, including any nested Typeset root.
- Paragraphs, headings, inline semantics, lists, task lists, blockquotes, code, keyboard keys,
  tables, math, media, disclosures, definition lists, and GFM footnotes are styled from semantic
  HTML.

## Anatomy and exported parts

```text
Typeset                 data-slot="typeset"
└─ TypesetScroll         data-slot="typeset-scroll"
```

`[data-scope="typeset"][data-part="root"]` and `[data-part="scroll"]` are stable public hooks.

## Composition

```tsx
<Typeset asChild>
  <article>
    <h1>Release notes</h1>
    <p>Rendered Markdown keeps a consistent rhythm.</p>
  </article>
</Typeset>
```

Use `TypesetScroll` in a renderer's table component when a table should scroll instead of compress.
It owns its horizontal overflow; keep it inside a `Typeset` boundary because the flow spacing and
table widening for the wrapped block come from the Typeset element rules. Both parts forward refs to
their rendered element; with `asChild`, that is the one semantic child.
Do not put Markdown parsing, sanitization, or fixed reading width into this component.

## Upstream feature coverage

- Container-relative type, theme-token colors, CSS presets, low-specificity element styles, and
  streaming stability are supported.
- `TypesetScroll` is moduix sugar for the wide-block wrapper; the underlying table remains native.
- No shadcn builder, generic `.typeset` class, Tailwind dependency, or generated CSS file is
  required. Registry consumers own the copied TSX and CSS Module sources.

## Accessibility and state

- Typeset has no state machine, callbacks, form behavior, `HiddenInput`, context, or provider.
- The consumer chooses one semantic container element with `asChild`; rendered HTML retains its
  native roles and keyboard behavior.
- Task-list checkboxes remain native controls. `details` and `summary` retain native disclosure
  behavior.
- Refs forward to the rendered root or scroll element through the Ark factory. `TypesetScroll` is
  focusable by default so its native horizontal scrolling works with a keyboard. A user-facing
  scroller needs an accessible name so assistive technology can identify its region.

## Defaults and styling

- The root follows the surrounding font by default, then applies a small-screen type-size bump below
  `48rem`. Above that breakpoint and when printing, it uses `--moduix-typeset-size` as-is.
- Element rules live in `@layer components` with the `--moduix-typeset-*` defaults in `@layer base`,
  and use `:where()` element selectors, allowing ordinary application CSS to override an individual
  rendered element.
- Plain `ul` and `ol` elements always restore their semantic markers: disc, circle, then square for
  unordered nesting; decimal for ordered lists, with the native `type` attribute (`a`, `A`, `i`,
  `I`) still respected. Task lists keep their checkbox treatment instead.
- Table cells keep the native `align` attribute (`left`, `center`, `right`) as physical alignment,
  also in right-to-left content.
- Colors, borders, radius, and focus rings use foundation tokens directly, without fallbacks; the
  registry item depends on foundation.
- Block spacing only uses `margin-block-start`; no layout rule uses `:last-child`, `:has()`, or
  `:empty`. Cell borders, rather than row-position selectors, separate appended table rows.
- Page layout owns measure. The root has no fixed or maximum width.

## Intentional sugar and differences from upstream

`TypesetScroll` removes the repeated overflow wrapper needed for wide blocks while keeping the raw
table markup and custom renderer path available. The component exposes Ark `asChild` and data slots
because moduix distributes a React component; the visual contract remains CSS-first rather than
prop-driven.

## Agent notes

- Keep the API limited to semantic structure. Do not add parser, renderer, sanitization, theme, or
  layout props.
- Every future element rule must preserve the `.not-typeset` / `data-not-typeset` escape hatch,
  including nested Typeset roots and scroll wrappers, plus append-stability constraints.