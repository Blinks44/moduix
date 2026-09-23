# Empty

## Upstream reference

Ark UI has no Empty primitive. The component follows Ark's factory composition guidance: https://ark-ui.com/docs/guides/composition#the-ark-factory

## Purpose

`Empty` composes a zero-data, no-results, or first-run message with optional next steps.

## Public contract

The flat API is `Empty`, `EmptyIcon`, `EmptyContent`, `EmptyTitle`, `EmptyDescription`, and `EmptyActions`. The parts are presentational and do not introduce state.

## Preservation notes

- Keep this as an Ark-aligned factory wrapper, not a state machine or an implicit live region.
- Preserve native Solid children and `class` props. Callers choose their own heading level and surrounding landmark.

## Styling and accessibility

Parts expose `data-scope="empty"`, `data-part`, and `data-slot`. The wrapper adds no role, keyboard interaction, or focus management by default.