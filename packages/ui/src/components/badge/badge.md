# Badge

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition

## Purpose

`Badge` is a compact, non-interactive label for short metadata such as status, category, version,
or small counts.

Ark UI does not ship a dedicated `Badge` primitive, so moduix models the component as an Ark-style
factory wrapper with explicit parts.

## Upstream model to preserve

- Uses the Ark factory composition model instead of a dedicated Ark primitive.
- Keeps the public surface intentionally small: `Badge.Root` and `Badge.Dot`.
- Keeps Ark-style DOM ownership through `asChild` without adding managed state or behavior.

## Current behavior contract

- Public API is part-first: `Badge.Root` and `Badge.Dot`.
- The callable `Badge` export remains the root part itself, but docs and examples should use
  explicit part names.
- `Badge.Root` accepts Ark factory span props plus local `variant`.
- `Badge.Dot` accepts Ark factory span props and renders `aria-hidden="true"` by default.
- `Badge` remains presentational. It does not add focus, keyboard, disabled, or controlled state.

## Anatomy and exported parts

```text
Badge.Root
├─ content
├─ Badge.Dot (optional)
└─ svg icon (optional)
```

Every exported part accepts `className` and receives stable hooks:

| Part         | `data-slot`  | Notes                                                    |
| ------------ | ------------ | -------------------------------------------------------- |
| `Badge.Root` | `badge-root` | Root label with variant colors, spacing, and truncation. |
| `Badge.Dot`  | `badge-dot`  | Optional decorative dot that inherits `currentColor`.    |

Direct child `svg` icons are styled by the root and inherit `currentColor`.

## Composition

```tsx
import { Badge } from 'moduix';

export function BadgeDemo() {
  return <Badge.Root>New</Badge.Root>;
}
```

Use `Badge.Dot` or a direct child icon next to the label when a badge needs an extra visual cue:

```tsx
<Badge.Root variant="default">
  <Badge.Dot />
  Online
</Badge.Root>
```

## Upstream feature coverage

- `Composition`: preserved through Ark factory `asChild` behavior on the exported parts.
- `Dedicated primitive features`: not applicable because Ark has no dedicated `Badge` component
  page for this wrapper to mirror.
- `Stateful or interactive patterns`: intentionally unsupported; `Badge` stays presentational.

## Accessibility and state

- `Badge.Root` writes:
  - `data-scope="badge"`
  - `data-part="root"`
  - `data-slot="badge-root"`
  - `data-variant="<variant>"`
- `Badge.Dot` writes:
  - `data-scope="badge"`
  - `data-part="dot"`
  - `data-slot="badge-dot"`
- `Badge.Dot` is hidden from assistive technology by default with `aria-hidden="true"`.
- Long labels stay on one line and are clipped with ellipsis. Add `title` when users need the full
  value.

## Defaults and styling

| Entry     | Default   | Values / Notes                                            |
| --------- | --------- | --------------------------------------------------------- |
| `variant` | `default` | `default`, `secondary`, `destructive`, `outline`, `ghost` |
| `asChild` | `false`   | Ark factory composition on `Badge.Root`                   |

Public CSS variables:

| Variable               | Default                                            | Applies to   |
| ---------------------- | -------------------------------------------------- | ------------ |
| `--badge-bg`           | variant-specific background                        | `Badge.Root` |
| `--badge-border-color` | `transparent`; `var(--color-border)` for `outline` | `Badge.Root` |
| `--badge-border-width` | `var(--border-width-sm)`                           | `Badge.Root` |
| `--badge-color`        | variant-specific foreground                        | `Badge.Root` |
| `--badge-dot-size`     | `0.375rem`                                         | `Badge.Dot`  |
| `--badge-font-size`    | `var(--text-xs)`                                   | `Badge.Root` |
| `--badge-font-weight`  | `var(--weight-medium)`                             | `Badge.Root` |
| `--badge-gap`          | `0.375rem`                                         | `Badge.Root` |
| `--badge-height`       | `1.25rem`                                          | `Badge.Root` |
| `--badge-icon-size`    | `0.75rem`                                          | child `svg`  |
| `--badge-line-height`  | `var(--line-height-text-xs)`                       | `Badge.Root` |
| `--badge-padding-x`    | `0.625rem`                                         | `Badge.Root` |
| `--badge-padding-y`    | `0`                                                | `Badge.Root` |
| `--badge-radius`       | `var(--radius-full)`                               | `Badge.Root` |

## Intentional sugar and differences from upstream

- Ark UI has no dedicated `Badge` primitive here; moduix uses Ark factory parts.
- moduix adds the local `variant` styling API and ships pre-styled defaults.
- moduix keeps the part surface narrow and does not add interactive or stateful behavior.

## Agent notes

- Keep `Badge` presentational.
- If the component needs interaction, compose `Badge.Root asChild` with a real interactive element
  or use another component that matches the intended behavior.
- Keep direct child icon sizing tied to `--badge-icon-size` and `currentColor`.

## Local changelog

- 2026-06-17: Migrated the component to an Ark-style wrapper built with `@ark-ui/react/factory`.
- 2026-06-17: Replaced the legacy flat `BadgeDot` export with `Badge.Dot`.
- 2026-06-17: Added Ark-style `asChild`, `data-scope`, and `data-part` hooks on exported parts.