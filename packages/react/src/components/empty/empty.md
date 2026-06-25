# Empty

Upstream docs:

- Ark UI: no dedicated Empty primitive; use https://ark-ui.com/docs/guides/composition and
  https://ark-ui.com/docs/guides/styling plus https://ark-ui.com/docs/guides/ref
- Chakra UI: no dedicated recipe used for this wrapper

## Purpose

Use `Empty` for zero-data, no-results, and first-run screens that need a short explanation plus
optional next-step actions.

## Upstream model to preserve

Ark UI does not ship an Empty primitive. This component is a moduix-owned, Ark-aligned factory
wrapper built with `@ark-ui/react/factory`.

Preserve these Ark guide concepts:

- every exported part is an `ark.*` element and accepts `asChild`;
- `asChild` requires one semantic child that can carry the part's attributes and ref;
- styling exposes Ark-style `data-scope="empty"` and `data-part` attributes;
- there are no provider, context, state, callback, `ids`, `HiddenInput`, or `Field`/`Fieldset`
  contracts to mirror because the component is presentational only.

## Current behavior contract

- `Empty` is the callable root and is equivalent to `Empty.Root`.
- `Empty.Icon`, `Empty.Content`, `Empty.Title`, `Empty.Description`, and `Empty.Actions` are
  namespaced parts on the root component.
- Every part forwards its ref to the rendered DOM element.
- `Empty.Title` renders `h3` by default. Use `asChild` with a heading element when the page outline
  needs a different level.
- `Empty.Description` renders a `div`, not a `p`, so it can safely contain paragraphs, links, or
  short block content.
- The component does not provide built-in button props, icon props, variants, alignment flags, or
  state logic. Those concerns stay in composition.

## Anatomy and exported parts

```text
Empty / Empty.Root
├─ Empty.Icon (optional)
├─ Empty.Content
│  ├─ Empty.Title
│  └─ Empty.Description
└─ Empty.Actions (optional)
```

| Part                | Element | `data-part`   | `data-slot`         |
| ------------------- | ------- | ------------- | ------------------- |
| `Empty`             | `div`   | `root`        | `empty-root`        |
| `Empty.Root`        | `div`   | `root`        | `empty-root`        |
| `Empty.Icon`        | `div`   | `icon`        | `empty-icon`        |
| `Empty.Content`     | `div`   | `content`     | `empty-content`     |
| `Empty.Title`       | `h3`    | `title`       | `empty-title`       |
| `Empty.Description` | `div`   | `description` | `empty-description` |
| `Empty.Actions`     | `div`   | `actions`     | `empty-actions`     |

## Composition

```tsx
import { Button, Empty, MapIcon } from '@moduix/react';

export function EmptyResults() {
  return (
    <Empty>
      <Empty.Icon>
        <MapIcon />
      </Empty.Icon>
      <Empty.Content>
        <Empty.Title>No saved places</Empty.Title>
        <Empty.Description>
          Save frequently used destinations to keep them close to your workspace.
        </Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <Button>Add place</Button>
        <Button variant="outline">Import list</Button>
      </Empty.Actions>
    </Empty>
  );
}
```

For a different heading level, use Ark factory composition:

```tsx
<Empty.Title asChild>
  <h2>No saved places</h2>
</Empty.Title>
```

## Upstream feature coverage

- Ark dedicated component docs: not applicable; there is no Empty primitive or official Empty
  examples to cover.
- Ark factory composition: covered by every part using `ark.*` and `HTMLArkProps`.
- Ark `asChild`: supported on every part. Consumers must pass a single semantic child.
- Ark styling: covered by `data-scope`, `data-part`, `className`, and public `--empty-*` variables.
- Ark state management, callbacks, context hooks, `RootProvider`, `ids`, `HiddenInput`, and form
  context: intentionally absent because the component has no interactive state.

## Accessibility and state

`Empty` adds no role, ARIA state, keyboard behavior, or focus management by default. Consumers should
choose the correct surrounding landmark, live-region behavior, and heading level for the screen.

Refs point at the rendered part elements. `asChild` can replace a host element, but the child must
remain semantic: use a heading for `Empty.Title`, a neutral container for `Empty.Description`, and a
button/link wrapper only where that semantic role is intentional.

## Defaults and styling

Every part accepts `className` and emits `data-scope="empty"` plus its `data-part` and `data-slot`.
The CSS module preserves the moduix visual identity: centered grid layout, tokenized spacing, card
surface colors, rounded icon container, and wrapping action row.

Public CSS variables:

| Variable                          | Default fallback                                                 |
| --------------------------------- | ---------------------------------------------------------------- |
| `--empty-actions-gap`             | `var(--spacing-2)`                                               |
| `--empty-bg`                      | `color-mix(in oklab, var(--color-card) 92%, var(--color-muted))` |
| `--empty-border-color`            | `var(--color-border)`                                            |
| `--empty-border-width`            | `var(--border-width-sm)`                                         |
| `--empty-color`                   | `var(--color-card-foreground)`                                   |
| `--empty-content-gap`             | `var(--spacing-1)`                                               |
| `--empty-content-max-width`       | `28rem`                                                          |
| `--empty-description-color`       | `var(--color-muted-foreground)`                                  |
| `--empty-description-font-size`   | `var(--text-sm)`                                                 |
| `--empty-description-line-height` | `var(--line-height-text-sm)`                                     |
| `--empty-gap`                     | `var(--spacing-4)`                                               |
| `--empty-icon-bg`                 | `var(--color-muted)`                                             |
| `--empty-icon-color`              | `var(--color-muted-foreground)`                                  |
| `--empty-icon-padding`            | `var(--spacing-3)`                                               |
| `--empty-icon-size`               | `1.5rem`                                                         |
| `--empty-padding`                 | `var(--spacing-8)`                                               |
| `--empty-radius`                  | `var(--radius-xl)`                                               |
| `--empty-shadow`                  | `none`                                                           |
| `--empty-title-color`             | `currentColor`                                                   |
| `--empty-title-font-size`         | `var(--text-xl)`                                                 |
| `--empty-title-font-weight`       | `var(--weight-semibold)`                                         |
| `--empty-title-line-height`       | `var(--line-height-text-xl)`                                     |

## Intentional sugar and differences from upstream

- There is no upstream Ark Empty API. The namespace is moduix-owned but shaped like other
  Ark-aligned factory wrappers in this package.
- The previous flat exports (`EmptyIcon`, `EmptyContent`, `EmptyTitle`, `EmptyDescription`,
  `EmptyActions`) were removed in favor of `Empty.*` namespaced parts.
- The previous `EmptyTitle as` prop was removed. Use Ark factory `asChild` instead.
- Optional parts are omitted through normal JSX composition rather than through boolean props.

## Agent notes

- Keep `Empty` presentational. Do not add variants, alignment flags, image-loading helpers, state
  hooks, or built-in action props without a concrete product requirement.
- Preserve `Empty.Description` as a `div`; replacing it with `p` makes block content composition
  error-prone.
- If public `--empty-*` variables change, update `theme.css`, stories, docs examples, and the CSS
  properties reference in the same task.
- Registry consumers need `@ark-ui/react` because the shipped source imports
  `@ark-ui/react/factory`.

## Local changelog

- 2026-06-25: Audited the Ark factory migration, confirmed the TSX and CSS contracts, and aligned
  public docs with the required local-only Ark factory API reference text.
- 2026-06-19: Migrated `Empty` to an Ark-aligned factory wrapper with `data-scope`/`data-part`,
  namespaced `Empty.*` parts, forwarded refs, and `asChild` composition. Removed flat part exports
  and `EmptyTitle as`.
- Added `Empty` as a standalone empty-state surface with optional icon, content, and actions parts.
- Rewrote the docs contract to match the current component-page structure and styling guidance.