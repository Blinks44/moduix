# Swap

Upstream docs:

- Ark UI: https://ark-ui.com/docs/utilities/swap

## Purpose

`Swap` layers two visual states and animates between them. Use it for icon, label, or composed-content
transitions while the surrounding control keeps its own semantics and interaction model.

It stacks `off` and `on` indicators in one grid cell. The controlled `swap` boolean selects the
visible indicator, while Ark Presence keeps the leaving indicator available for its exit animation.
Use it when the visual state itself changes; keep a persistent visual element outside `Swap` if it
must move continuously as adjacent content grows.

## Upstream model to preserve

Ark Swap renders its indicators in one grid cell and controls the visible state with the boolean
`swap` prop. Indicators use Ark Presence, so `data-state="open"` and `data-state="closed"` remain
available during enter and exit animations.

## Current behavior contract

- `Swap` is the callable alias of `Swap.Root`.
- `Swap.Root`, `Swap.RootProvider`, and `Swap.Indicator` forward Ark props, refs, and `asChild`.
- `Swap.useSwap()` creates Ark state for `Swap.RootProvider`; `useSwapContext()` reads the nearest
  provider state.
- moduix layers indicators in a 1×1 inline grid and applies the `scale` animation by default.
- `animation` accepts the included `fade`, `scale`, `rotate`, and `flip` recipes, or a custom name
  for consumer-defined CSS.
- `Swap` does not create hover, click, toggle, or announcement behavior. The surrounding component
  owns interaction and accessible naming.

## Anatomy and exported parts

```text
Swap / Swap.Root
├─ Swap.Indicator type="off"
└─ Swap.Indicator type="on"
```

`Swap.RootProvider` accepts the same indicator subtree when state is created outside the tree.

| Part                 | `data-slot`          | Notes                                 |
| -------------------- | -------------------- | ------------------------------------- |
| `Swap` / `Swap.Root` | `swap-root`          | Ark span root and visual-state owner. |
| `Swap.RootProvider`  | `swap-root-provider` | Ark provider-backed span root.        |
| `Swap.Indicator`     | `swap-indicator`     | One `on` or `off` visual state.       |

## Composition

```tsx
import { Button, Swap } from '@moduix/react';

export function UploadButton() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <Button aria-label={uploaded ? 'Uploaded' : 'Upload'} onClick={() => setUploaded(!uploaded)}>
      <Swap animation="rotate" swap={uploaded}>
        <Swap.Indicator aria-hidden="true" type="off">
          <UploadIcon />
        </Swap.Indicator>
        <Swap.Indicator aria-hidden="true" type="on">
          <CheckIcon />
        </Swap.Indicator>
      </Swap>
    </Button>
  );
}
```

## Upstream feature coverage

- `swap`, `lazyMount`, and `unmountOnExit` pass through unchanged.
- `asChild` remains available on every Ark-rendered part.
- `Swap.RootProvider` and `Swap.useSwap()` preserve the upstream external-state path.
- `useSwapContext()` is exported from the moduix barrel.

## Accessibility and state

- `Swap` renders spans and has no button, link, or live-region semantics of its own.
- The inactive indicator can remain mounted while its exit animation runs. When swapping button
  labels or icons, hide the visual indicators with `aria-hidden="true"` and put the current
  accessible name on the host control.
- Ark adds `data-state="open" | "closed"` to each indicator; moduix does not translate it to a
  separate state class.
- `Swap.Root` and `Swap.RootProvider` forward refs to their rendered span roots.
- `animation` is written to `data-animation` on the root so consumer CSS can add a named recipe.

## Defaults and styling

- The root is an `inline-grid` with a single `swap` grid area.
- Indicators are inline-flex elements in that area and inherit their color.
- `animation="fade"` uses opacity, `scale` combines it with a 50% scale, `rotate` spins in 2D,
  and `flip` applies a 3D Y-axis flip with a root perspective.
- `--moduix-swap-transition` defaults to `--moduix-transition-slow` and controls both enter and exit timing.
- `--moduix-swap-enter-starting-opacity`, `--moduix-swap-enter-starting-scale`,
  `--moduix-swap-exit-ending-opacity`, and `--moduix-swap-exit-ending-scale` customise the default keyframes.
- Override `animation` on `Swap.Indicator[data-state]` for rotate or 3D flip recipes, and keep a
  matching `prefers-reduced-motion` fallback in that custom CSS.
- `prefers-reduced-motion: reduce` reduces the animation duration to `1ms`.
- For expandable controls, animate the host dimensions and place the steady icon beside a width-
  animated `Swap` label. Swapping an icon-only indicator with an icon-and-label indicator gives the
  two icons different centers during the crossfade.

## Intentional sugar and differences from upstream

moduix supplies layout, four small animation recipes, and stable `data-slot` hooks. It does not add
event handlers or a special-purpose button wrapper. A custom animation name turns off the included
recipe and keeps the Ark `data-state` hooks available for consumer CSS.

## Agent notes

Keep the Ark `swap` prop, Presence-driven `data-state` attributes, provider path, and `asChild`
composition intact. Keep `scale` as the default animation, and do not add hover state or
expand/collapse behaviour to this primitive.

## Local changelog

- 2026-07-31: Added `animation` presets and a custom-name escape hatch without changing Ark state.
- 2026-07-31: Increased the default scale animation amplitude from `0.92` to `0.8` so it remains distinct from fade.
- 2026-07-31: Set the preset transition to `--moduix-transition-slow` and the default scale to `0.5`.
- 2026-07-31: Added provider, presence, `asChild`, and animation regression coverage.
- 2026-07-14: Registered the public animation CSS properties in the theme override reference.
- 2026-07-14: Added centered and width-animated button recipes plus rotate and 3D flip examples.
- 2026-07-14: Kept the expandable-download icon outside Swap so its position animates continuously.
- 2026-07-14: Added the Ark-aligned Swap wrapper with layered default animations and stable styling hooks.