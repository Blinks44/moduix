# RatingGroup

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/rating-group

## Purpose

`RatingGroup` lets users choose a numeric rating with a row of items.

## Public contract

The flat API includes `RatingGroup`, `RatingGroupRootProvider`, `RatingGroupLabel`, `RatingGroupControl`, `RatingGroupItem`, `RatingGroupItemIndicator`, `RatingGroupItems`, `RatingGroupHiddenInput`, `RatingGroupContext`, `RatingGroupItemContext`, `useRatingGroup`, `useRatingGroupContext`, and `useRatingGroupItemContext`. Public types are `RatingGroupRootProps`, `RatingGroupRootProviderProps`, `RatingGroupItemIndicatorProps`, and `RatingGroupSize`. The local `size` defaults to `md` and supports `xs`, `sm`, `md`, `lg`, and `xl`.

## Preservation notes

- Preserve `count`, `allowHalf`, controlled and uncontrolled values, and Ark details for value and hover changes.
- `RatingGroupItems` generates Ark items; keep explicit item composition and `RatingGroupHiddenInput` available.
- Preserve Solid's reactive item rendering.

## Styling and accessibility

Ark owns radio-like semantics, keyboard and pointer interaction, labels, translations, and form synchronization. Keep `data-size` and `data-slot` hooks.

`RatingGroupItem` focuses itself on a left pointer down with `focusVisible: false` (after the consumer `onPointerDown`, unless disabled or read-only), so a click does not show the keyboard focus ring that Chrome would otherwise apply to Zag's deferred focus. See the React `rating-group.md` for details.

The filled default star inherits the `RatingGroupItemIndicator` color. CSS Modules expose `--moduix-rating-group-active-color`, `--moduix-rating-group-color`, `--moduix-rating-group-gap`, and `--moduix-rating-group-icon-size`.