# Collapsible

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/collapsible
- Chakra UI: https://chakra-ui.com/docs/components/collapsible

## Purpose

`Collapsible` reveals or hides one inline content region. Use it for supporting details, recovery
keys, secondary metadata, or a single disclosure row. Use `Accordion` for coordinated groups.

## Upstream model to preserve

- Uses Ark UI Collapsible directly.
- Keeps the Ark anatomy through the flat values `Collapsible`, `CollapsibleRootProvider`,
  `CollapsibleTrigger`, optional `CollapsibleIndicator`, and `CollapsibleContent`.
- Keeps Ark controlled state, render strategy, partial-collapse measurements, context, and
  `--height` / `--width` CSS variables unchanged.
- Layers the moduix-only `CollapsibleBody` helper inside `CollapsibleContent` for gap and
  consumer-provided padding without changing the measured Ark content part.

## Current behavior contract

- The public API uses flat values: `Collapsible` is the root and every other component value is
  prefixed with `Collapsible`.
- `Collapsible` supports Ark props including `open`, `defaultOpen`, `onOpenChange(details)`,
  `disabled`, `collapsedHeight`, `collapsedWidth`, `hideMode`, `lazyMount`, `unmountOnExit`, `ids`,
  and `onExitComplete`.
- `CollapsibleRootProvider` accepts the return value from moduix `useCollapsible()`.
- `CollapsibleIndicator` renders `ChevronDownIcon` when children are omitted.
- `CollapsibleBody` is an optional inner layout wrapper for gap, consumer-provided padding, and surfaces inside
  `CollapsibleContent`.
- Every DOM part forwards its Ark props, ref, `className`, and `asChild`. `CollapsibleTrigger asChild` supplies
  behavior and state attributes without imposing the default trigger class.

## Anatomy and exported parts

```text
Collapsible
├─ CollapsibleTrigger
│  ├─ label
│  └─ CollapsibleIndicator (optional)
└─ CollapsibleContent
   └─ CollapsibleBody
      └─ content
```

Provider composition uses `CollapsibleRootProvider` in place of `Collapsible`.

| Part                      | `data-slot`                 | Notes                                   |
| ------------------------- | --------------------------- | --------------------------------------- |
| `Collapsible`             | `collapsible-root`          | Styled Ark root.                        |
| `CollapsibleRootProvider` | `collapsible-root-provider` | Styled root backed by `useCollapsible`. |
| `CollapsibleTrigger`      | `collapsible-trigger`       | Styled Ark trigger button.              |
| `CollapsibleIndicator`    | `collapsible-indicator`     | Defaults to `ChevronDownIcon`.          |
| `CollapsibleContent`      | `collapsible-content`       | Animated Ark content region.            |
| `CollapsibleBody`         | `collapsible-body`          | Inner layout wrapper for content.       |

## Composition

```tsx
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';

export function CollapsibleExample() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>Store these keys somewhere safe.</CollapsibleBody>
      </CollapsibleContent>
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

- `Initial Open`: `defaultOpen` is forwarded by `Collapsible`.
- `Controlled`: `open` and `onOpenChange(details)` are forwarded without remapping.
- `Disabled`: `disabled` is forwarded and exposed through Ark `data-disabled` hooks.
- `Lazy Mount`: `lazyMount` and `unmountOnExit` are forwarded.
- `Hide Mode`: `hideMode` supports the default `display-none` mode and React 19 `activity` mode for
  mounted closed content.
- `Nested`: independent `Collapsible` trees can be nested inside content.
- `Partial Collapse`: `collapsedHeight` and `collapsedWidth` are forwarded; the content animation
  uses Ark `--height`, `--width`, `--collapsed-height`, and `--collapsed-width` measurements.
- `Root Provider`: `CollapsibleRootProvider` and `useCollapsible()` are exported for state created
  outside the rendered root.
- `Context`: `CollapsibleContext` and `useCollapsibleContext()` are exported for descendant state
  access.
- `CollapsibleBody`: moduix adds an inner wrapper for padding and content layout; Ark does not expose this as
  a primitive part.

## Accessibility and state

- Ark owns trigger semantics, `aria-expanded`, `aria-controls`, ids, keyboard activation, and disabled
  behavior.
- Ark callbacks are not converted. `onOpenChange` receives `{ open }`.
- Ark state created with `useCollapsible()` exposes `open` for intended state and `visible` for
  mounted visibility during exit animations.
- moduix exports `useCollapsible()` for `CollapsibleRootProvider` composition and `useCollapsibleContext()` for
  descendant state access.
- Interactive elements in a partially collapsed content area become inert until the region opens.
- Ark `data-scope="collapsible"` and `data-part` identify root, trigger, indicator, and content.
- `data-state="open" | "closed"` appears on root, trigger, indicator, and content.
- `data-collapsible` appears on content.
- `data-disabled` appears on trigger, indicator, and content when disabled.
- `data-has-collapsed-size` appears on content for partial-collapse configurations.
- Content exposes Ark runtime variables `--height`, `--width`, `--collapsed-height`, and
  `--collapsed-width`.
- `CollapsibleBody` is a moduix-owned wrapper and exposes `data-scope="collapsible"`, `data-part="body"`, and
  `data-slot="collapsible-body"`.
- Use `asChild` when another semantic element must own the rendered DOM node.

## Defaults and styling

- `Collapsible` and `CollapsibleRootProvider` are column flex containers with `width: 100%` and
  `max-width: 100%` by default so disclosure content does not resize the component while toggling.
  Constrain width in stories or app-level layout when a compact disclosure block is desired.
- `CollapsibleTrigger` includes moduix hover, active, focus-visible, and disabled styling.
- `CollapsibleIndicator` defaults to `ChevronDownIcon` and rotates upward on `data-state="open"`.
- `CollapsibleContent` animates between Ark `--height` / `--width` and collapsed-size variables; put padding
  and surfaces on `CollapsibleBody` for clean measurement.
- `CollapsibleTrigger` uses logical text alignment so its label follows the document direction.

Primary CSS variables:

| Variable                                        | Default                                                         |
| ----------------------------------------------- | --------------------------------------------------------------- |
| `--moduix-collapsible-body-gap`                 | `var(--moduix-spacing-2)`                                       |
| `--moduix-collapsible-body-padding`             | `0`                                                             |
| `--moduix-collapsible-color`                    | `var(--moduix-color-foreground)`                                |
| `--moduix-collapsible-width`                    | `100%`                                                          |
| `--moduix-collapsible-max-width`                | `100%`                                                          |
| `--moduix-collapsible-disabled-opacity`         | `var(--moduix-opacity-disabled)`                                |
| `--moduix-collapsible-focus-ring-color`         | `var(--moduix-color-ring)`                                      |
| `--moduix-collapsible-focus-ring-offset`        | `var(--moduix-border-width-sm)`                                 |
| `--moduix-collapsible-focus-ring-width`         | `var(--moduix-focus-ring-width, var(--moduix-border-width-md))` |
| `--moduix-collapsible-indicator-open-transform` | `rotate(180deg)`                                                |
| `--moduix-collapsible-indicator-size`           | `var(--moduix-spacing-3)`                                       |
| `--moduix-collapsible-indicator-transition`     | `var(--moduix-transition-default)`                              |
| `--moduix-collapsible-content-color`            | `var(--moduix-color-muted-foreground)`                          |
| `--moduix-collapsible-content-closed-opacity`   | `0.01`                                                          |
| `--moduix-collapsible-content-font-size`        | `var(--moduix-text-sm)`                                         |
| `--moduix-collapsible-content-line-height`      | `var(--moduix-line-height-text-sm)`                             |
| `--moduix-collapsible-content-open-opacity`     | `1`                                                             |
| `--moduix-collapsible-content-transition`       | `var(--moduix-transition-default)`                              |
| `--moduix-collapsible-trigger-bg`               | `transparent`                                                   |
| `--moduix-collapsible-trigger-bg-active`        | trigger hover background                                        |
| `--moduix-collapsible-trigger-bg-hover`         | trigger background                                              |
| `--moduix-collapsible-trigger-color`            | `var(--moduix-collapsible-color)`                               |
| `--moduix-collapsible-trigger-font-size`        | `var(--moduix-text-sm)`                                         |
| `--moduix-collapsible-trigger-gap`              | `var(--moduix-spacing-2)`                                       |
| `--moduix-collapsible-trigger-line-height`      | `var(--moduix-line-height-text-sm)`                             |
| `--moduix-collapsible-trigger-padding-x`        | `0`                                                             |
| `--moduix-collapsible-trigger-padding-y`        | `var(--moduix-spacing-1)`                                       |
| `--moduix-collapsible-trigger-radius`           | `0`                                                             |
| `--moduix-collapsible-trigger-transition`       | `var(--moduix-transition-default)`                              |

## Intentional sugar and differences from upstream

- moduix adds default styling and public theme variables; Ark is unstyled.
- `CollapsibleIndicator` supplies `ChevronDownIcon` when children are omitted.
- `CollapsibleBody` supplies the recommended inner content wrapper so consumers do not need to
  hand-roll padding wrappers in every disclosure.
- moduix re-exports Ark `useCollapsible()` and `useCollapsibleContext()` for the standard provider
  and descendant-context composition paths, while Ark type aliases remain direct escape hatches.
- No legacy flat exports, aliases, or converted callback signatures are retained.

## Upstream comparison (reviewed 2026-08-30)

| Source                                                               | Finding                                                                                                                             | Decision                                                                                                                                            |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Ark UI](https://ark-ui.com/docs/components/collapsible)             | Defines the anatomy, `asChild`, controlled state, partial-collapse measurements, inert collapsed content, and keyboard interaction. | **Required correctness** - preserve Ark props, callback details, state attributes, and runtime measurement variables without translation. Verified. |
| [Chakra UI](https://www.chakra-ui.com/docs/components/collapsible)   | Recommends an inner content wrapper so padding does not interfere with size animation.                                              | **Consumer friction** - moduix `CollapsibleBody` supplies that wrapper while keeping the real Ark content part available.                           |
| [shadcn/ui](https://ui.shadcn.com/docs/components/radix/collapsible) | Favors a compact, discoverable root/trigger/content recipe and controlled-state example.                                            | **Intentional difference** - retain the moduix-prefixed flat parts and optional default indicator.                                                  |

## Agent notes

- Preserve Ark callback details, `asChild`, context/provider composition, render strategy, and
  partial-collapse measurements.
- Keep `CollapsibleRootProvider`, `useCollapsible()`, and `useCollapsibleContext()` aligned with Ark. Duplicate
  type aliases remain direct Ark escape hatches.
- Keep `CollapsibleContent` reserved for the real Ark content part.
- Keep spacing on `CollapsibleBody` or another inner content wrapper so `--height` animation
  remains accurate.
- Keep content and indicator motion aligned with the user's `prefers-reduced-motion` setting.

## Local changelog

- 2026-08-10: Completed the release audit against Ark UI, Chakra UI, and shadcn/ui; added
  reduced-motion handling and regression coverage for partial-collapse accessibility and
  consumer-owned `CollapsibleTrigger asChild` refs.
- 2026-07-26: Aligned the trigger focus ring with Accordion, added RTL-safe trigger alignment,
  regression coverage, and docs examples for `collapsedWidth` and descendant context control.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-09: Re-exported `useCollapsible()` from moduix for the standard `CollapsibleRootProvider` path.

- 2026-07-08: Added `CollapsibleBody` as the recommended inner layout wrapper, documented its
  styling hooks, and synchronized CSS variable defaults for width and indicator rotation.
- 2026-07-08: Changed the default indicator icon to `ChevronDownIcon`, updated the open-state
  rotation to point upward, and set the root width default to `100%` to avoid disclosure width
  jumps while still allowing docs and apps to constrain layout explicitly.
- 2026-07-02: Simplified the public surface to the visual parts plus `CollapsibleRootProvider`; advanced
  context access and duplicate type exports now come from `@ark-ui/react/collapsible` directly.
- 2026-07-01: Made `CollapsibleTrigger asChild` behavior-only so a composed button keeps its own visual
  contract without inheriting Collapsible trigger layout.
- 2026-06-24: Audited the Ark UI migration, fixed the docs `CollapsibleRootProvider` example, removed an
  unused docs CSS module, and synchronized documented styling hooks with Ark `data-collapsible` and
  the full moduix CSS variable surface.
- 2026-06-18: Migrated to Ark UI and introduced the flat `Collapsible` parts, `CollapsibleRootProvider`,
  `CollapsibleContext`, and `useCollapsible`, adopted Ark callback/state hooks, and replaced
  legacy motion variables with Ark `--height` / `--collapsed-height`.
- 2026-06-18: Exposed `useCollapsibleContext` from the public barrel to match Ark's state access
  surface and synchronized public docs previews with Code, Styles, and Data tabs.
- 2026-06-18: Updated content animation to respect Ark `--width` and `--collapsed-width` for
  `collapsedWidth` partial-collapse usage.