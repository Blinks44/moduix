# Component Family Contracts

Load this file when work in `packages/ui` touches popup-like or dialog-like component families.

## Popup-like Components

Rules:

- Prefer the full explicit Ark/Chakra composition path as the public contract.
- Export structural parts such as `Root`, `Trigger`, `Anchor`, `Positioner`, `Content`, `Arrow`, `ArrowTip`,
  `CloseTrigger`, `Title`, `Description`, `Header`, `Body`, and `Footer` when the upstream family provides them.
- Do not hide `Portal`, `Positioner`, `Backdrop`, `Popup`, `Viewport`, `Arrow`, or equivalent structural nodes behind
  `*Content` sugar.
- Built-in arrows may be concise only when the upstream family already supports it, for example `Arrow` rendering a
  default `ArrowTip`.
- Custom arrows and structural overrides stay in explicit composition.
- Prefer docs snippets and examples over alternate high-level APIs when the only goal is reducing verbosity.

## Dialog-like Components

- Keep the visible content wrapper thin.
- Export the full explicit Ark/Chakra composition path as the default and documented API.
- Allow only narrow workflow sugar that matches repeated library usage and does not hide structural parts.
- If a prop or component describes internal layout or hidden structure, move that behavior back to composition.