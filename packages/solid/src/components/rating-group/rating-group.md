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