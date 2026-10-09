# Kbd

## Upstream reference

Ark UI has no Kbd primitive. The family follows Ark's factory guidance: https://ark-ui.com/docs/guides/composition#the-ark-factory

## Purpose

`Kbd` renders static key labels for shortcuts and inline keyboard hints.

## Public contract

The flat API is `Kbd` and `KbdGroup`. `Kbd` renders a native `<kbd>` element; `KbdGroup` groups a shortcut without inserting separators or extra text.

## Preservation notes

- Keep the parts presentational and use Solid's native `class`, children, and `asChild` behavior.
- Do not add shortcut parsing or interaction state to this family.

## Styling and accessibility

`Kbd` retains native key-label semantics. `KbdGroup` defaults to `role="group"`; provide an accessible label when symbols or abbreviations need clarification. Keep the `kbd` data hooks and CSS variables.