# RatingGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/rating-group
- Chakra UI: https://chakra-ui.com/docs/components/rating

## Purpose

`RatingGroup` lets users choose a numeric rating with a row of star-shaped items.

## Current behavior contract

- The parts are thin Ark wrappers from `@ark-ui/react/rating-group` that add moduix classes and
  stable `data-slot` values. Ark owns state, `count`, `allowHalf`, hover preview, keyboard
  navigation, `asChild`, translations, and callback details (`onValueChange(details)`,
  `onHoverChange(details)`).
- `RatingGroup` and `RatingGroupRootProvider` accept Ark props plus the moduix-only
  `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`. It defaults to `md`, writes `data-size` on the root,
  and sizes every default star in the group.
- `RatingGroupItems` is the only generated-item sugar: it maps Ark `items` to `RatingGroupItem`
  with a default `RatingGroupItemIndicator`. A child replaces the repeated indicator.
- `RatingGroupItemIndicator` renders the default star (an outlined background star and a filled
  foreground star clipped from item state). It mirrors Ark item `data-highlighted` and `data-half`
  so custom children can style themselves. The filled star inherits the indicator `color`.
- `RatingGroupItem` focuses itself synchronously on a left pointer down with
  `focus({ preventScroll: true, focusVisible: false })`, after calling the consumer
  `onPointerDown`, unless the item is disabled or read-only. Zag prevents the native press focus
  and focuses the selected item in a later frame, which Chrome flags with `:focus-visible`; the
  earlier suppressed focus makes that call a no-op, so a click leaves no ring while keyboard focus
  still shows it. Zag calls `preventDefault()` before the consumer handler, so the wrapper cannot
  skip the focus based on `defaultPrevented`.
- Native form participation needs an explicit `RatingGroupHiddenInput`.
- The barrel re-exports `useRatingGroup`, `useRatingGroupContext`, `useRatingGroupItemContext`,
  `RatingGroupContext`, `RatingGroupItemContext`, and `RatingGroupHiddenInput` unchanged from Ark.
- Types `RatingGroupRootProps`, `RatingGroupRootProviderProps`, `RatingGroupItemIndicatorProps`,
  and `RatingGroupSize` are exported.

## Anatomy and exported parts

```text
RatingGroup[size]
├─ RatingGroupLabel
├─ RatingGroupControl
│  ├─ RatingGroupItems (sugar)
│  └─ RatingGroupItem[index]
│     └─ RatingGroupItemIndicator
└─ RatingGroupHiddenInput (explicit)
```

| Part                       | `data-slot`                   | Notes                                       |
| -------------------------- | ----------------------------- | ------------------------------------------- |
| `RatingGroup`              | `rating-group-root`           | Ark root plus `size`.                       |
| `RatingGroupRootProvider`  | `rating-group-root-provider`  | Uses state from `useRatingGroup()`; `size`. |
| `RatingGroupLabel`         | `rating-group-label`          | Group label.                                |
| `RatingGroupControl`       | `rating-group-control`        | Item row.                                   |
| `RatingGroupItem`          | `rating-group-item`           | Ark item; requires numeric `index`.         |
| `RatingGroupItemIndicator` | `rating-group-item-indicator` | Default star; children replace it.          |

## Defaults and styling

- Per-size star sizes live in the private `--_rating-group-icon-size` on the root. Public
  variables: `active-color` (filled star), `color` (empty star outline), `gap` (between items), and
  `icon-size` (overrides every size), all with the `--moduix-rating-group-` prefix.
- Label typography, focus ring, disabled opacity, and transitions come from foundation tokens;
  override them with a class over the `moduix.components` layer.
- Half-star clipping follows `:dir(rtl)`.

## Agent notes

- Keep `RatingGroupItems` as the only sugar; the "Advanced customization" docs example builds items
  from `RatingGroupContext` and `RatingGroupItem`.
- Do not add item arrays, `max`, raw-number callbacks, or the old `Rating` aliases.