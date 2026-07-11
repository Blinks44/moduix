# RatingGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/rating-group
- Chakra UI: https://chakra-ui.com/docs/components/rating

## Purpose

`RatingGroup` lets users choose a numeric rating with a row of star-shaped items.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/rating-group`. Preserve Ark parts, `count`,
`allowHalf`, controlled `value`, uncontrolled `defaultValue`, `onValueChange(details)`,
`onHoverChange(details)`, `RootProvider`, and `HiddenInput`. Advanced Ark provider/context hooks
stay available directly from `@ark-ui/react/rating-group`.

Ark owns keyboard behavior, pointer hover preview, half-step selection, readonly and disabled
states, ids, localized translations, and form integration through `HiddenInput`.

## Current behavior contract

`RatingGroup` is the styled root and short-form equivalent of `RatingGroup.Root`. It accepts Ark
root props plus moduix `size`, which writes `data-size` and controls the default star size.

`RatingGroup.Items` is the recommended generated-item renderer. It maps Ark item indexes to styled
`RatingGroup.Item` parts with default `RatingGroup.ItemIndicator` stars and renders the single Ark
`HiddenInput`. Pass a custom indicator as its child to replace the repeated visual without changing
Ark item behavior. `ItemIndicator` reads Ark item state internally; custom children should style
themselves through its `data-highlighted` and `data-half` attributes. For a custom item tree or
low-level item state access, import Ark `RatingGroup.Context`, `RatingGroup.ItemContext`, or hooks
directly from `@ark-ui/react/rating-group` and render `HiddenInput` explicitly for form use.

The old `Rating` API was removed. Use `count` instead of `max`, and use
`onValueChange={(details) => ...}` instead of receiving a raw number.

## Anatomy and exported parts

```tsx
RatingGroup.Root
├─ RatingGroup.Label
└─ RatingGroup.Control
   ├─ RatingGroup.Items (recommended)
   │  └─ RatingGroup.Item[index]
   │     └─ RatingGroup.ItemIndicator (moduix visual sugar)
   ├─ ArkRatingGroup.Context (advanced, optional, from @ark-ui/react/rating-group)
   │  └─ RatingGroup.Item[index]
   │     ├─ ArkRatingGroup.ItemContext (optional, from @ark-ui/react/rating-group)
   │     └─ RatingGroup.ItemIndicator (moduix visual sugar)
   └─ RatingGroup.HiddenInput (advanced custom item tree)

RatingGroup.RootProvider
└─ same part tree connected to an Ark useRatingGroup() store
```

| Part                    | Hook                                      | Notes                                       |
| ----------------------- | ----------------------------------------- | ------------------------------------------- |
| `RatingGroup` / `.Root` | `data-slot="rating-group-root"`           | Ark root with moduix `size` styling.        |
| `.RootProvider`         | `data-slot="rating-group-root-provider"`  | Connects an Ark `useRatingGroup()` store.   |
| `.Label`                | `data-slot="rating-group-label"`          | Ark label part.                             |
| `.Control`              | `data-slot="rating-group-control"`        | Ark item container.                         |
| `.Items`                | —                                         | Renders Ark items, stars, and hidden input. |
| `.Item`                 | `data-slot="rating-group-item"`           | Ark item; requires numeric `index`.         |
| `.ItemIndicator`        | `data-slot="rating-group-item-indicator"` | Default moduix star visual.                 |
| `.HiddenInput`          | `data-slot="rating-group-hidden-input"`   | Required for native form submission/reset.  |

## Composition

```tsx
import { RatingGroup } from '@moduix/react';

export function ReviewRating() {
  return (
    <RatingGroup name="review" defaultValue={4}>
      <RatingGroup.Label>Review score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items />
      </RatingGroup.Control>
    </RatingGroup>
  );
}
```

## Upstream feature coverage

- Basic: supported through root, label, control, and `Items` (including the hidden input).
- Controlled: use Ark `value` and `onValueChange(details)` with `details.value`.
- Root Provider: `RatingGroup.RootProvider` is exported from `moduix`; import Ark `useRatingGroup()`
  directly when state must be created outside the rendered tree.
- Field: compose with moduix `Field`; Ark propagates field state to the rating group.
- Half Rating: pass `allowHalf`; `ItemIndicator` clips the foreground star when Ark reports
  `half`.
- Forms: pass `name`, `form`, and `required`; `Items` renders `HiddenInput`.
- Disabled and readonly: pass Ark `disabled` or `readOnly`; style through Ark data attributes.

## Accessibility and state

Ark provides the radio-like rating semantics, roving focus, keyboard support, labels, localized
translations, required state, and hidden input synchronization. `Items` keeps `HiddenInput` inside
`Control`; custom item trees should render it explicitly whenever the value participates in forms.

All Ark callback payloads are preserved. Do not remap `onValueChange(details)` or
`onHoverChange(details)` to legacy raw values.

Forwarded refs target the matching Ark DOM parts. The root and provider refs point to `div`, label
to `label`, control to `div`, item to `span`, and hidden input to `input`.

## Defaults and styling

`size` defaults to `md` and supports `xs`, `sm`, `md`, `lg`, and `xl`. No other behavioral defaults
are added; Ark defaults apply.

Stable styling hooks include Ark `data-scope="rating-group"` and part attributes, Ark state
attributes (`data-disabled`, `data-readonly`, `data-checked`, `data-highlighted`, `data-half`,
`data-required`), and moduix `data-slot` hooks. The default star foreground is clipped from
Ark item attributes and mirrored `ItemIndicator` attributes so custom visuals can target either
surface.

Public CSS variables:

| Variable                           | Default fallback                |
| ---------------------------------- | ------------------------------- |
| `--rating-group-active-color`      | `var(--color-primary)`          |
| `--rating-group-color`             | `var(--color-muted-foreground)` |
| `--rating-group-disabled-opacity`  | `var(--opacity-disabled)`       |
| `--rating-group-focus-ring-color`  | `var(--color-ring)`             |
| `--rating-group-focus-ring-offset` | `var(--border-width-sm)`        |
| `--rating-group-focus-ring-width`  | `var(--border-width-sm)`        |
| `--rating-group-gap`               | `var(--spacing-1)`              |
| `--rating-group-root-gap`          | `var(--spacing-1)`              |
| `--rating-group-icon-size-xs`      | `0.875rem`                      |
| `--rating-group-icon-size-sm`      | `1rem`                          |
| `--rating-group-icon-size-md`      | `1.25rem`                       |
| `--rating-group-icon-size-lg`      | `1.5rem`                        |
| `--rating-group-icon-size-xl`      | `1.75rem`                       |
| `--rating-group-label-color`       | `var(--color-foreground)`       |
| `--rating-group-label-font-size`   | `var(--text-sm)`                |
| `--rating-group-label-font-weight` | `var(--weight-semibold)`        |
| `--rating-group-label-line-height` | `var(--line-height-text-sm)`    |
| `--rating-group-transition`        | `var(--transition-default)`     |

## Intentional sugar and differences from upstream

- `RatingGroup` is the short root form and also exposes `.Root`.
- `size` is a moduix styling prop, not an Ark behavior prop.
- `RatingGroup.Items` is local sugar for Ark-generated items, the default star indicator, and one
  hidden form input. Passing an indicator as its child replaces the repeated default visual.
- `RatingGroup.ItemIndicator` is local visual sugar for the default star icon. Ark does not expose
  this part. Passing children replaces the default star visual.
- The old `Rating` name, `max` prop, raw-number callback, and legacy radio-group implementation
  are intentionally removed.

## Agent notes

- Keep the wrapper thin. `Items` is the only generated-item shortcut; do not add item arrays,
  `max`, raw callback adapters, or old `Rating` aliases.
- Keep `RootProvider` and `ItemIndicator`, but do not re-export Ark contexts, hooks, or duplicate
  Ark type aliases from the moduix barrel.
- Keep `HiddenInput` inside `Items`; render it explicitly only for custom item trees.
- If styling tokens change, update `theme.css`, docs CSS reference data, and registry output in the
  same task.

## Local changelog

- 2026-07-11: Added `RatingGroup.Items` as the recommended generated-item path. It accepts an
  optional repeated indicator child and renders the hidden input; direct Ark contexts remain the
  advanced escape hatch.
- 2026-07-03: Simplified the public surface to the callable root, `RootProvider`, `HiddenInput`,
  visible parts, and the star `ItemIndicator` sugar. Advanced Ark contexts and hooks now come
  directly from `@ark-ui/react/rating-group`.
- 2026-06-20: Renamed `Rating` to `RatingGroup` and migrated from legacy radio-group composition to
  Ark UI `rating-group` parts, callbacks, provider/context hooks, `HiddenInput`, half rating, and
  Ark data attributes.
- 2026-06-20: Documented and hardened custom `RatingGroup.ItemIndicator` children so consumers can
  replace the default star icon while preserving Ark item state.
- 2026-06-27: Added a stable `data-slot` hook to `HiddenInput`, aligned focus ring defaults with
  the rest of the library, and tied default star clipping to Ark item state attributes.