# Collapsible

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/collapsible

## Purpose

`Collapsible` reveals or hides one inline content region. Use it for supporting details, recovery
keys, secondary metadata, or a single disclosure row. Use `Accordion` for coordinated groups.

## Upstream model to preserve

- Uses Ark UI Collapsible directly.
- Keeps the Ark anatomy: `Root` or `RootProvider`, `Trigger`, optional `Indicator`, and `Content`.
- Keeps Ark controlled state, render strategy, partial-collapse measurements, context, and
  `--height` / `--width` CSS variables unchanged.

## Current behavior contract

- The public API is the Ark-shaped `Collapsible.*` namespace.
- `Collapsible.Root` supports Ark props including `open`, `defaultOpen`, `onOpenChange(details)`,
  `disabled`, `collapsedHeight`, `collapsedWidth`, `lazyMount`, `unmountOnExit`, `ids`, and
  `onExitComplete`.
- `Collapsible.RootProvider` accepts the return value from `useCollapsible`.
- `Collapsible.Context` exposes Ark state through a render function.
- `Collapsible.Indicator` renders `ChevronRightIcon` when children are omitted.
- Every DOM part forwards its Ark props, ref, `className`, and `asChild`. `Trigger asChild` supplies
  behavior and state attributes without imposing the default trigger class.

## Anatomy and exported parts

```text
Collapsible.Root
├─ Collapsible.Trigger
│  ├─ label
│  └─ Collapsible.Indicator (optional)
└─ Collapsible.Content
   └─ content wrapper
```

Provider composition replaces `Root` with `RootProvider`.

| Part                       | `data-slot`                 | Notes                                    |
| -------------------------- | --------------------------- | ---------------------------------------- |
| `Collapsible.Root`         | `collapsible-root`          | Styled Ark root.                         |
| `Collapsible.RootProvider` | `collapsible-root-provider` | Styled root backed by `useCollapsible`.  |
| `Collapsible.Trigger`      | `collapsible-trigger`       | Styled Ark trigger button.               |
| `Collapsible.Indicator`    | `collapsible-indicator`     | Defaults to `ChevronRightIcon`.          |
| `Collapsible.Content`      | `collapsible-content`       | Animated Ark content region.             |
| `Collapsible.Context`      | none                        | Render-prop access to Ark context state. |

The package also exports `useCollapsible`, `useCollapsibleContext`, and the related Ark types.

## Composition

```tsx
import { Collapsible } from '@moduix/react';

export function CollapsibleExample() {
  return (
    <Collapsible>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="contentBody">Store these keys somewhere safe.</div>
      </Collapsible.Content>
    </Collapsible>
  );
}
```

Controlled callbacks keep the Ark details object:

```tsx
<Collapsible open={open} onOpenChange={(details) => setOpen(details.open)}>
  {/* parts */}
</Collapsible>
```

## Upstream feature coverage

- `Initial Open`: `defaultOpen` is forwarded by `Collapsible.Root`.
- `Controlled`: `open` and `onOpenChange(details)` are forwarded without remapping.
- `Disabled`: `disabled` is forwarded and exposed through Ark `data-disabled` hooks.
- `Lazy Mount`: `lazyMount` and `unmountOnExit` are forwarded.
- `Nested`: independent `Collapsible.Root` trees can be nested inside content.
- `Partial Collapse`: `collapsedHeight` and `collapsedWidth` are forwarded; the content animation
  uses Ark `--height`, `--width`, `--collapsed-height`, and `--collapsed-width` measurements.
- `Root Provider`: `useCollapsible` and `Collapsible.RootProvider` are exported.
- `Context`: `Collapsible.Context` and `useCollapsibleContext` are exported unchanged.

## Accessibility and state

- Ark owns trigger semantics, `aria-expanded`, `aria-controls`, ids, keyboard activation, and disabled
  behavior.
- Ark callbacks are not converted. `onOpenChange` receives `{ open }`.
- Ark context exposes `open` for intended state and `visible` for mounted visibility during exit
  animations.
- Ark `data-scope="collapsible"` and `data-part` identify root, trigger, indicator, and content.
- `data-state="open" | "closed"` appears on root, trigger, indicator, and content.
- `data-collapsible` appears on content.
- `data-disabled` appears on trigger, indicator, and content when disabled.
- `data-has-collapsed-size` appears on content for partial-collapse configurations.
- Content exposes Ark runtime variables `--height`, `--width`, `--collapsed-height`, and
  `--collapsed-width`.
- Use `asChild` when another semantic element must own the rendered DOM node.

## Defaults and styling

- `Collapsible`, `Root`, and `RootProvider` are column flex containers with a `14rem` default
  width.
- `Trigger` includes moduix hover, active, focus-visible, and disabled styling.
- `Indicator` rotates on `data-state="open"`.
- `Content` animates between Ark `--height` / `--width` and collapsed-size variables; put padding
  and surfaces on an inner wrapper for clean measurement.

Primary CSS variables:

| Variable                                 | Default                         |
| ---------------------------------------- | ------------------------------- |
| `--collapsible-color`                    | `var(--color-foreground)`       |
| `--collapsible-width`                    | `14rem`                         |
| `--collapsible-max-width`                | `100%`                          |
| `--collapsible-disabled-opacity`         | `var(--opacity-disabled)`       |
| `--collapsible-focus-ring-color`         | `var(--color-ring)`             |
| `--collapsible-focus-ring-offset`        | `var(--border-width-sm)`        |
| `--collapsible-focus-ring-width`         | `var(--border-width-sm)`        |
| `--collapsible-indicator-open-transform` | `rotate(90deg)`                 |
| `--collapsible-indicator-size`           | `0.75rem`                       |
| `--collapsible-indicator-transition`     | `var(--transition-default)`     |
| `--collapsible-content-color`            | `var(--color-muted-foreground)` |
| `--collapsible-content-closed-opacity`   | `0.01`                          |
| `--collapsible-content-font-size`        | `var(--text-sm)`                |
| `--collapsible-content-line-height`      | `var(--line-height-text-sm)`    |
| `--collapsible-content-open-opacity`     | `1`                             |
| `--collapsible-content-transition`       | `var(--transition-default)`     |
| `--collapsible-trigger-bg`               | `transparent`                   |
| `--collapsible-trigger-bg-active`        | trigger hover background        |
| `--collapsible-trigger-bg-hover`         | trigger background              |
| `--collapsible-trigger-color`            | `var(--collapsible-color)`      |
| `--collapsible-trigger-font-size`        | `var(--text-sm)`                |
| `--collapsible-trigger-gap`              | `var(--spacing-2)`              |
| `--collapsible-trigger-line-height`      | `var(--line-height-text-sm)`    |
| `--collapsible-trigger-padding-x`        | `var(--spacing-2)`              |
| `--collapsible-trigger-padding-y`        | `var(--spacing-1)`              |
| `--collapsible-trigger-radius`           | `0`                             |
| `--collapsible-trigger-transition`       | `var(--transition-default)`     |

## Intentional sugar and differences from upstream

- moduix adds default styling and public theme variables; Ark is unstyled.
- `Collapsible.Indicator` supplies `ChevronRightIcon` when children are omitted.
- No legacy flat exports, aliases, or converted callback signatures are retained.

## Agent notes

- Preserve Ark callback details, `asChild`, context/provider composition, render strategy, and
  partial-collapse measurements.
- Keep `Content` reserved for the real Ark content part.
- Keep spacing on an inner content wrapper so `--height` animation remains accurate.

## Local changelog

- 2026-07-01: Made `Trigger asChild` behavior-only so a composed button keeps its own visual
  contract without inheriting Collapsible trigger layout.
- 2026-06-24: Audited the Ark UI migration, fixed the docs `RootProvider` example, removed an
  unused docs CSS module, and synchronized documented styling hooks with Ark `data-collapsible` and
  the full moduix CSS variable surface.
- 2026-06-18: Migrated to Ark UI, replaced flat exports with `Collapsible.*`, added
  `RootProvider`, `Context`, and `useCollapsible`, adopted Ark callback/state hooks, and replaced
  legacy motion variables with Ark `--height` / `--collapsed-height`.
- 2026-06-18: Exposed `useCollapsibleContext` from the public barrel to match Ark's state access
  surface and synchronized public docs previews with Code, Styles, and Data tabs.
- 2026-06-18: Updated content animation to respect Ark `--width` and `--collapsed-width` for
  `collapsedWidth` partial-collapse usage.