# Highlight

Upstream docs:

- Ark UI: https://ark-ui.com/docs/utilities/highlight
- Chakra UI: no dedicated Highlight recipe used for this wrapper

## Purpose

`Highlight` emphasizes matched words or phrases inside existing copy with moduix-styled `<mark>`
elements.

## Upstream model to preserve

The wrapper stays close to Ark UI's `Highlight` utility. Ark owns the matching algorithm, query
options, and the contract that matched segments render as native `<mark>` elements while unmatched
segments remain plain text nodes.

Preserve these upstream behaviors:

- `query`, `text`, `ignoreCase`, `matchAll`, and `exactMatch` pass through unchanged;
- mark-element props such as `className`, `style`, `title`, `id`, and `data-*` apply to every
  matched `<mark>`;
- there is no wrapper element, ref target, provider, context, `RootProvider`, `ids`,
  `HiddenInput`, or field-state integration.

## Current behavior contract

- `Highlight` is the callable root and `Highlight.Root` is the same component.
- The component renders one `<mark>` per matched chunk and plain text nodes for unmatched chunks.
- If the query does not match, the component renders only plain text with no `<mark>` output.
- `className` and other mark props are applied to every matched `<mark>` segment.
- moduix adds stable `data-scope`, `data-part`, and `data-slot` hooks plus default highlight styles.
- The package exports the styled root only; there is no chunk-rendering API.

## Anatomy and exported parts

```text
Highlight / Highlight.Root
└─ repeated <mark> segments for matched ranges inside the provided text
```

| Part                           | `data-slot`      | Notes                                                                    |
| ------------------------------ | ---------------- | ------------------------------------------------------------------------ |
| `Highlight` / `Highlight.Root` | `highlight-root` | Applied to every matched `<mark>` segment; no outer wrapper is rendered. |

## Composition

Canonical usage:

```tsx
import { Highlight, Text } from '@moduix/react';

export function Example() {
  return (
    <Text>
      <Highlight
        query="component"
        text="Ark UI is a headless component library for building accessible web applications."
      />
    </Text>
  );
}
```

Use it inside an existing text container such as `Text`, `Heading`, a list item, or table cell,
because `Highlight` only renders matched `<mark>` segments and not a layout root of its own.

For multiple search terms:

```tsx
<Highlight
  query={['React', 'Vue']}
  text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
/>
```

`Highlight` intentionally renders native `<mark>` elements for matched ranges and does not expose a
chunk renderer. Compose custom markup directly when a different element or per-match rendering is
required.

## Upstream feature coverage

- Ark basic usage: covered by `query` plus `text`.
- Ark dynamic query usage: covered; consumers can control `query` from React state.
- Ark multiple queries: covered by string-array `query`.
- Ark case sensitivity: covered by `ignoreCase`.
- Ark first-match versus all-matches behavior: covered by `matchAll`.
- Ark whole-word matching: covered by `exactMatch`.

## Accessibility and state

`Highlight` keeps native `<mark>` semantics for matched content. It does not add keyboard behavior,
focus management, ARIA state, refs, field context, hidden inputs, or controlled/uncontrolled state.

Every matched `<mark>` writes:

- `data-scope="highlight"`
- `data-part="root"`
- `data-slot="highlight-root"`

There are no Ark runtime CSS variables or state attributes because the component is not stateful.

## Defaults and styling

Matched ranges inherit the surrounding typography and receive moduix styling through the default
`mark` class.

Public CSS variables:

| Variable                  | Default fallback                                                     |
| ------------------------- | -------------------------------------------------------------------- |
| `--highlight-bg`          | `color-mix(in oklab, var(--color-warning) 40%, var(--color-accent))` |
| `--highlight-color`       | `var(--color-foreground)`                                            |
| `--highlight-font-weight` | `var(--weight-medium)`                                               |
| `--highlight-padding-x`   | `0.25rem`                                                            |
| `--highlight-padding-y`   | `0.0625rem`                                                          |
| `--highlight-radius`      | `var(--radius-xs)`                                                   |
| `--highlight-shadow`      | `none`                                                               |

## Intentional sugar and differences from upstream

- moduix adds default highlight styling and stable `data-slot` hooks on every matched `<mark>`.
- moduix exposes `Highlight.Root` for consistency with other root-only components in the package.
- moduix keeps the public API narrow and does not add a chunk-rendering API.

## Agent notes

- Keep the wrapper thin. Do not add local parsing, match preprocessing, or alternate render paths.
- Preserve the no-wrapper contract. The component styles matched `<mark>` tags; it does not own the
  surrounding text layout.
- If public `--highlight-*` variables change, update `theme.css`, stories, docs examples, the local
  markdown file, and the docs page in the same task.

## Local changelog

- 2026-07-05: Added the moduix `Highlight` wrapper around Ark Highlight with shared mark styling,
  stable data hooks, Storybook coverage, local component documentation, and public docs.
- 2026-07-10: Clarified that custom chunk rendering is outside the Highlight contract and aligned the
  public examples with the documented ordering.