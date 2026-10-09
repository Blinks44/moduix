# Highlight

## Upstream reference

- Ark UI: https://ark-ui.com/docs/utilities/highlight
- Chakra UI: https://chakra-ui.com/docs/components/highlight

## Purpose

`Highlight` emphasizes matched words or phrases inside existing copy with moduix-styled native
`<mark>` elements.

## Public contract

`Highlight` is the flat root export. It renders one `<mark>` for each matched chunk and plain text
for unmatched chunks without adding a wrapper element. The public props are `query`, `text`,
`ignoreCase`, `matchAll`, and `exactMatch`; native fallthrough attributes, listeners, `style`,
`title`, `id`, `data-*`, and `class` attributes apply to every matched `<mark>`.

There is no provider, context, `RootProvider`, ref target, hidden input, or controlled state. The
component owns no surrounding text layout; compose it inside `Text`, a heading, a list item, or a
table cell.

## Preservation notes

- Ark owns the matching algorithm and query options; the Vue adapter wraps Ark's
  `Highlight` component directly.
- `matchAll` defaults to `false` for a string query and to `true` for a string-array query. A string
  array requires `matchAll` to remain `true`.
- `exactMatch` preserves Ark's JavaScript word-boundary behavior, including its limitation for
  Cyrillic and some other non-ASCII scripts.
- A non-matching query renders plain text only.
- Keep the no-wrapper anatomy and native `<mark>` semantics; do not add local parsing, child
  scanning, or a second matching state.

## Anatomy and styling

```text
Highlight
└─ repeated <mark> segments for matched ranges inside the provided text
```

Every matched `<mark>` receives:

- `data-scope="highlight"`
- `data-part="root"`
- `data-slot="highlight-root"`

The CSS Modules track applies the component defaults through these public variables:

| Variable                         | Default fallback                                                                   |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `--moduix-highlight-bg`          | `color-mix(in oklab, var(--moduix-color-warning) 40%, var(--moduix-color-accent))` |
| `--moduix-highlight-color`       | `var(--moduix-color-foreground)`                                                   |
| `--moduix-highlight-font-weight` | `var(--moduix-weight-medium)`                                                      |
| `--moduix-highlight-padding-x`   | `var(--moduix-spacing-1)`                                                          |
| `--moduix-highlight-padding-y`   | `0.0625rem`                                                                        |
| `--moduix-highlight-radius`      | `var(--moduix-radius-xs)`                                                          |
| `--moduix-highlight-shadow`      | `none`                                                                             |

## Canonical Vue composition

```vue
<script setup lang="ts">
import { Highlight } from '@moduix/vue/highlight';
import { Text } from '@moduix/vue/text';
</script>

<template>
  <Text>
    <Highlight
      query="component"
      text="Ark UI is a headless component library for building accessible web applications."
    />
  </Text>
</template>
```

For several terms, pass a string array and keep `matchAll` enabled:

```vue
<Highlight
  :query="['React', 'Vue']"
  text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
/>
```

## Accessibility

`Highlight` keeps native `<mark>` semantics and adds no keyboard behavior, focus management, ARIA
state, or runtime Ark CSS variables. Consumers may use native Vue fallthrough attrs and listeners;
the adapter applies them to every matched mark.

## Differences from upstream

Ark Vue 5.39.3 forwards fallthrough attributes, classes, styles, and listeners to each matched
`<mark>`. Both styling tracks use the direct primitive wrapper, and their browser tests cover
attribute forwarding and clicks on multiple matched segments.

## Local changelog

- 2026-10-07: Removed the outdated attribute-forwarding warning after checking Ark 5.39.3 and
  the passing regression tests in both styling tracks.
- 2026-10-02: Reviewed the migration, removed the local mark-rendering workaround, and recorded
  the upstream attribute-forwarding production blocker.