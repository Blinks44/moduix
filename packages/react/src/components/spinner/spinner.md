# Spinner

Upstream docs:

- Ark UI: no dedicated primitive; built with https://ark-ui.com/docs/guides/composition
- Chakra UI: https://chakra-ui.com/docs/components/spinner

## Contract

- `Spinner` is the only public component: one `ark.span` root with `asChild` and a forwarded ref.
- Local props: `size` (`inherit` | `xs` | `sm` | `md` | `lg` | `xl`, default `md`; `inherit` is
  `1em`) and `decorative` (default `false`).
- `children` replace the default ring inside the rotating indicator.
- With `asChild`, the single non-interactive child becomes the root and renders its own indicator
  markup; the built-in indicator and ring are not rendered.
- Exported types: `SpinnerRootProps`, `SpinnerSize`.

```text
Spinner (root, data-size)
└─ indicator (rotating, aria-hidden)
   └─ ring (default only, replaced by children)
```

## Accessibility and state

- By default the root is `role="status"` with `aria-label` from `a11yLabels.loading` ("Loading"),
  unless the consumer passes `aria-label` or `aria-labelledby`.
- `decorative` sets `aria-hidden="true"` on the root (also under `asChild`) and drops the role and
  fallback label. Use it next to visible loading text.
- The wrapper owns `role`, `aria-hidden`, `data-scope="spinner"`, `data-part`, `data-slot`, and
  `data-size`; passthrough values do not override them.

## Styling

- The indicator uses the foundation token `--moduix-animation-spin`, which becomes `none` under
  `prefers-reduced-motion`. Set `animation` on `[data-slot='spinner-indicator']` to change one
  spinner.
- The ring is a `currentColor` arc over a 22% `currentColor` track; set `color` to recolor it.
- CSS Modules expose `--moduix-spinner-size` (every size except `inherit`),
  `--moduix-spinner-ring-border-width`, and `--moduix-spinner-ring-track-color`. Per-size values live
  in the private `--_spinner-size`. Indicator and ring are also styled through
  `[data-scope='spinner'][data-part]` so hand-built `asChild` markup gets the default look.
- Tailwind variants use utilities; consumer classes merged through `cn` replace the size utility.

## Agent notes

- Keep the component thin: no loading orchestration, delay handling, text props, or variants.