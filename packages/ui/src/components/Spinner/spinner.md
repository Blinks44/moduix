# Spinner

Spinner is a loading indicator for pending states. It is a moduix primitive and does not wrap a Base UI primitive.

## API

- `variant`: built-in visual style. Supports `ring`, `dots`, `bars`, and `pulse`.
- `size`: visual size. Supports `xs`, `sm`, `md`, `lg`, and `xl`.
- `icon`: replaces the built-in glyph with a custom React node.
- `label`: accessible loading label. Defaults to `Loading`.
- `decorative`: removes status semantics when the spinner is only visual.
- `animated`: disables animation when set to `false`.
- `className`: custom class for the root slot.

The root uses `data-slot="spinner-root"`. The visual wrapper uses `data-slot="spinner-indicator"`.