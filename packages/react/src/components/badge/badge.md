# Badge

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling
- Chakra UI: https://chakra-ui.com/docs/components/badge

## Purpose

`Badge` is a compact, non-interactive label for short metadata such as status, category, version,
or small counts.

Ark UI does not ship a dedicated `Badge` primitive, so moduix models the component as an Ark-style
factory wrapper with explicit parts.

## Upstream model to preserve

- Uses the Ark factory composition model instead of a dedicated Ark primitive.
- Keeps the public surface intentionally small: `Badge` / `Badge.Root` and `Badge.Dot`.
- Keeps Ark-style DOM ownership through `asChild` without adding managed state or behavior.

## Current behavior contract

- `Badge` is the root shorthand and `Badge.Root` exposes the same root part explicitly.
- `Badge.Dot` is the optional decorative indicator part.
- `Badge.Root` accepts Ark factory span props plus local `variant`.
- `Badge.Dot` accepts Ark factory span props and renders `aria-hidden="true"` by default.
- `Badge` remains presentational. It does not add focus, keyboard, disabled, or controlled state.
- Badge numbers use tabular figures, and badge text is not user-selectable by default.

## Anatomy and exported parts

```text
Badge / Badge.Root
├─ content
├─ Badge.Dot (optional)
└─ svg icon (optional)
```

Every exported part accepts `className` and receives stable hooks:

| Part                   | `data-slot`  | Notes                                                    |
| ---------------------- | ------------ | -------------------------------------------------------- |
| `Badge` / `Badge.Root` | `badge-root` | Root label with variant colors, spacing, and truncation. |
| `Badge.Dot`            | `badge-dot`  | Optional decorative dot that inherits `currentColor`.    |

Direct child `svg` icons are styled by the root and inherit `currentColor`.

## Composition

```tsx
import { Badge } from '@moduix/react';

export function BadgeDemo() {
  return <Badge>New</Badge>;
}
```

Use `Badge.Dot` or a direct child icon next to the label when a badge needs an extra visual cue:

```tsx
<Badge variant="default">
  <Badge.Dot />
  Online
</Badge>
```

## Upstream feature coverage

- `Composition`: preserved through Ark factory `asChild` behavior on the exported parts.
- `Refs`: forwarded to the rendered root and dot DOM elements.
- `Styling`: follows Ark `data-scope` / `data-part` targeting and accepts `className`.
- `Chakra Badge examples`: variants and inline icons are covered; sizing remains a CSS-variable
  contract instead of a local `size` prop.
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
- `Badge asChild` and `Badge.Root asChild` require one semantic child. Interactive children keep their native
  keyboard and accessibility behavior and must provide their own interaction-specific focus and
  hover styling.
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
- moduix adds the decorative `Badge.Dot` part; Chakra's upstream recipe is single-part.
- moduix exposes sizing through CSS variables rather than Chakra's `size` recipe prop.
- moduix keeps the part surface narrow and does not add interactive or stateful behavior.

## Agent notes

- Keep `Badge` presentational.
- If the component needs interaction, prefer a dedicated interactive component. When `asChild` is
  appropriate, use one semantic interactive child and preserve visible focus treatment.
- Keep direct child icon sizing tied to `--badge-icon-size` and `currentColor`.

## Local changelog

- 2026-07-02: Removed redundant public Badge prop and variant type aliases while preserving the
  callable root, `Badge.Dot`, Ark factory composition, refs, variants, and styling contract.
- 2026-06-24: Reconfirmed the local Ark factory contract, aligned docs around the `Badge` root
  shorthand, simplified variant CSS selectors, and fixed the registry dependency on Ark UI.
- 2026-06-18: Completed the Ark factory audit, documented Chakra parity and intentional
  differences, added `asChild` guidance, and aligned numeric/presentational styling.
- 2026-06-17: Migrated the component to an Ark-style wrapper built with `@ark-ui/react/factory`.
- 2026-06-17: Replaced the legacy flat `BadgeDot` export with `Badge.Dot`.
- 2026-06-17: Added Ark-style `asChild`, `data-scope`, and `data-part` hooks on exported parts.