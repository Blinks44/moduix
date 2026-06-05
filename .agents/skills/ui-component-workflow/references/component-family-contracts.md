# Component Family Contracts

Load this file when work in `packages/ui` touches popup-like or dialog-like component families.

## Popup-like Components

Preferred `*Content` sugar:

- `className`
- `side`
- `sideOffset`
- `align`
- `alignOffset`
- `arrowPadding`
- `collisionAvoidance`
- `collisionBoundary`
- `collisionPadding`
- `showArrow`

Rules:

- `showArrow` is the standard built-in arrow toggle.
- Built-in arrows are opt-in by default.
- `showArrow` only toggles the default arrow.
- Custom arrows and structural overrides stay in explicit composition.
- Do not copy this popup vocabulary into dialogs, drawers, alerts, or other non-positioned overlays.

## Dialog-like Components

- Keep the visible content wrapper thin.
- Allow only narrow workflow sugar that matches repeated library usage.
- If a prop describes internal layout or hidden structure, move that behavior back to composition.