# Spinner

Spinner is a compact loading indicator for pending states. It is a local moduix primitive because
Base UI does not provide a dedicated spinner primitive.

## API

- `size`: visual size. Supports `xs`, `sm`, `md`, `lg`, and `xl`.
- `decorative`: removes status semantics when the spinner is only visual.
- `children`: optional custom indicator content inside the default sized wrapper.
- `className`: custom class for the root slot.
- `aria-label`: overrides the default loading announcement when the spinner is not decorative.

The root uses `data-slot="spinner-root"`. The visual wrapper uses
`data-slot="spinner-indicator"`.
