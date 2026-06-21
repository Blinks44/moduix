# RatingGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/rating-group
- Chakra UI: https://chakra-ui.com/docs/components/rating

## Purpose

`RatingGroup` lets users choose a numeric rating with a row of star-shaped items.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/rating-group`. Preserve Ark parts, `count`,
`allowHalf`, controlled `value`, uncontrolled `defaultValue`, `onValueChange(details)`,
`onHoverChange(details)`, `RootProvider`, `Context`, `ItemContext`, and `useRatingGroup`.

Ark owns keyboard behavior, pointer hover preview, half-step selection, readonly and disabled
states, ids, localized translations, and form integration through `HiddenInput`.

## Current behavior contract

`RatingGroup` is the styled root and short-form equivalent of `RatingGroup.Root`. It accepts Ark
root props plus moduix `size`, which writes `data-size` and controls the default star size.

Consumers compose rating items with `RatingGroup.Context`, `RatingGroup.Item`, and
`RatingGroup.ItemIndicator`. `ItemIndicator` is moduix sugar: it reads Ark item state from
`useRatingGroupItemContext()` and renders the default star foreground/background visuals. Consumers
can pass children to replace the visuals without changing Ark item behavior. Custom children should
style themselves through the indicator's `data-highlighted` and `data-half` attributes.

The old `Rating` API was removed. Use `count` instead of `max`, and use
`onValueChange={(details) => ...}` instead of receiving a raw number.

## Anatomy and exported parts

```tsx
RatingGroup.Root
├─ RatingGroup.Label
└─ RatingGroup.Control
   ├─ RatingGroup.Context
   │  └─ RatingGroup.Item[index]
   │     ├─ RatingGroup.ItemContext (optional)
   │     └─ RatingGroup.ItemIndicator (moduix visual sugar)
   └─ RatingGroup.HiddenInput

RatingGroup.RootProvider
└─ same part tree connected to a useRatingGroup() store
```

| Part                        | Hook                                      | Notes                                      |
| --------------------------- | ----------------------------------------- | ------------------------------------------ |
| `RatingGroup` / `.Root`     | `data-slot="rating-group-root"`           | Ark root with moduix `size` styling.       |
| `.RootProvider`             | `data-slot="rating-group-root-provider"`  | Connects a `useRatingGroup()` store.       |
| `.Label`                    | `data-slot="rating-group-label"`          | Ark label part.                            |
| `.Control`                  | `data-slot="rating-group-control"`        | Ark item container.                        |
| `.Item`                     | `data-slot="rating-group-item"`           | Ark item; requires numeric `index`.        |
| `.ItemIndicator`            | `data-slot="rating-group-item-indicator"` | Default moduix star visual.                |
| `.HiddenInput`              | Ark hidden input                          | Required for native form submission/reset. |
| `.Context` / `.ItemContext` | Ark render props                          | Read root or item state inline.            |

## Composition

```tsx
import { RatingGroup } from 'moduix';

function RatingGroupItems() {
  return (
    <RatingGroup.Context>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            <RatingGroup.ItemIndicator />
          </RatingGroup.Item>
        ))
      }
    </RatingGroup.Context>
  );
}

export function ReviewRating() {
  return (
    <RatingGroup name="review" defaultValue={4}>
      <RatingGroup.Label>Review score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroupItems />
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup>
  );
}
```

## Upstream feature coverage

- Basic: supported through root, label, control, context-generated items, item indicators, and
  hidden input.
- Controlled: use Ark `value` and `onValueChange(details)` with `details.value`.
- Root Provider: `RatingGroup.RootProvider` and `useRatingGroup()` are exported from `moduix`.
- Field: compose with moduix `Field`; Ark propagates field state to the rating group.
- Half Rating: pass `allowHalf`; `ItemIndicator` clips the foreground star when Ark reports
  `half`.
- Forms: pass `name`, `form`, `required`, and render `HiddenInput`.
- Disabled and readonly: pass Ark `disabled` or `readOnly`; style through Ark data attributes.

## Accessibility and state

Ark provides the radio-like rating semantics, roving focus, keyboard support, labels, localized
translations, required state, and hidden input synchronization. Keep `HiddenInput` inside
`Control` whenever the value should participate in forms.

All Ark callback payloads are preserved. Do not remap `onValueChange(details)` or
`onHoverChange(details)` to legacy raw values.

Forwarded refs target the matching Ark DOM parts. The root and provider refs point to `div`, label
to `label`, control to `div`, item to `span`, and hidden input to `input`.

## Defaults and styling

`size` defaults to `md` and supports `xs`, `sm`, `md`, `lg`, and `xl`. No other behavioral defaults
are added; Ark defaults apply.

Stable styling hooks include Ark `data-scope="rating-group"` and part attributes, Ark state
attributes (`data-disabled`, `data-readonly`, `data-checked`, `data-highlighted`, `data-half`,
`data-required`), and moduix `data-slot` hooks.

Public CSS variables:

| Variable                           | Default fallback                |
| ---------------------------------- | ------------------------------- |
| `--rating-group-active-color`      | `var(--color-primary)`          |
| `--rating-group-color`             | `var(--color-muted-foreground)` |
| `--rating-group-disabled-opacity`  | `var(--opacity-disabled)`       |
| `--rating-group-focus-ring-color`  | `transparent`                   |
| `--rating-group-focus-ring-offset` | `0.125rem`                      |
| `--rating-group-focus-ring-width`  | `0`                             |
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
- `RatingGroup.ItemIndicator` is local visual sugar for the default star icon. Ark does not expose
  this part. Passing children replaces the default star visual.
- The old `Rating` name, `max` prop, raw-number callback, and legacy radio-group implementation
  are intentionally removed.

## Agent notes

- Keep the wrapper thin. Do not add item arrays, `max`, raw callback adapters, or old `Rating`
  aliases.
- Preserve Ark context/provider/hook exports in `index.ts` and the root package barrel.
- Keep `HiddenInput` in docs and examples that mention forms.
- If styling tokens change, update `theme.css`, docs CSS reference data, and registry output in the
  same task.

## Local changelog

- 2026-06-20: Renamed `Rating` to `RatingGroup` and migrated from legacy radio-group composition to
  Ark UI `rating-group` parts, callbacks, provider/context hooks, `HiddenInput`, half rating, and
  Ark data attributes.
- 2026-06-20: Documented and hardened custom `RatingGroup.ItemIndicator` children so consumers can
  replace the default star icon while preserving Ark item state.