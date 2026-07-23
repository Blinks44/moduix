# AngleSlider

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/angle-slider
- Chakra UI Slider: https://chakra-ui.com/docs/components/slider

## Purpose

`AngleSlider` is a styled Ark UI angle slider for selecting one numeric value on a circular
0-360-degree control.

## Upstream model to preserve

- Preserve Ark visual parts: `Root`, `RootProvider`, `Label`, `Control`, `MarkerGroup`, `Marker`,
  `Thumb`, and `ValueText`. moduix renders Ark's native hidden input internally.
- Preserve controlled/uncontrolled state, callback detail objects, keyboard behavior, pointer
  dragging, form behavior, IDs, refs, and `asChild`.
- `RootProvider` owns an externally created `useAngleSlider` instance and must not be nested with a
  `Root` for that same instance.

## Current behavior contract

- `AngleSlider` is the styled root and is equivalent to `AngleSlider.Root`.
- All DOM parts are thin wrappers over the corresponding Ark parts and forward refs.
- `AngleSlider.Dial` is narrow sugar for `Control` plus `Thumb`, with optional children rendered
  inside the control before the thumb.
- `AngleSlider.Marks` is narrow sugar for `MarkerGroup` plus repeated `Marker` children from a
  `values` array.
- `useAngleSlider()` is re-exported from moduix for the normal `RootProvider` path.
- `value`, `defaultValue`, `step`, `disabled`, `invalid`, `readOnly`, `name`, `ids`,
  `onValueChange(details)`, and `onValueChangeEnd(details)` pass through unchanged.
- The lightest recommended composition is `Dial`, with `Label`, `Marks`, and `ValueText` added only
  when that behavior is needed. `Root` and `RootProvider` always render the native form input.
- `AngleSlider.Context` and `useAngleSliderContext()` are exported from moduix; Ark type aliases remain direct imports from `@ark-ui/react/angle-slider`.

## Anatomy and exported parts

```text
AngleSlider.Root
├─ AngleSlider.Label
├─ AngleSlider.Control
│  ├─ AngleSlider.MarkerGroup
│  │  └─ AngleSlider.Marker[value]
│  └─ AngleSlider.Thumb
└─ AngleSlider.ValueText
```

Externally owned state replaces `Root` with `RootProvider`.

| Part                       | `data-slot`                  |
| -------------------------- | ---------------------------- |
| `AngleSlider.Root`         | `angle-slider-root`          |
| `AngleSlider.RootProvider` | `angle-slider-root-provider` |
| `AngleSlider.Label`        | `angle-slider-label`         |
| `AngleSlider.Control`      | `angle-slider-control`       |
| `AngleSlider.Dial`         | `angle-slider-control`       |
| `AngleSlider.MarkerGroup`  | `angle-slider-marker-group`  |
| `AngleSlider.Marker`       | `angle-slider-marker`        |
| `AngleSlider.Thumb`        | `angle-slider-thumb`         |
| `AngleSlider.ValueText`    | `angle-slider-value-text`    |

`AngleSlider.Dial` renders the same `Control` and `Thumb` slots; `AngleSlider.Marks` renders the
same `MarkerGroup` and `Marker` slots. Neither adds a separate DOM part or styling hook.

## Composition

```tsx
import { AngleSlider } from '@moduix/react';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function RotationAngleSlider() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" name="rotation">
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.ValueText />
    </AngleSlider>
  );
}
```

Use explicit `Control`, `Thumb`, `MarkerGroup`, and `Marker` when the dial needs custom children,
per-marker props, or custom ordering.

## Upstream feature coverage

- Official Ark example surfaces `Basic`, `Controlled`, and `Steps` are supported and documented.
- Ark example surfaces `Disabled` and `Root Provider` are also supported and documented.
- `readOnly`, `invalid`, `name`, `ids`, `onValueChangeEnd`, `asChild`, and part refs pass through
  and are documented.
- `RootProvider` accepts the return value of moduix `useAngleSlider()` and the underlying Ark hook.
- Chakra's `Slider.Marks` convenience informed the narrow `AngleSlider.Marks` sugar, and
  `AngleSlider.Dial` follows the same "common structure first" ergonomics without removing the
  underlying Ark part tree.

## Accessibility and state

- `Label` and `aria-label` / `aria-labelledby` preserve Ark slider naming.
- `Thumb` remains the focusable slider element with Ark keyboard and ARIA behavior.
- `Root` and `RootProvider` always render Ark's hidden native input. With `name`, it participates in
  native form submission; it also keeps Ark state synchronized with native form reset.
- `disabled`, `invalid`, and `readOnly` are Ark root props. The wrapper does not add a separate
  moduix form-state adapter.
- `RootProvider` is the moduix-owned advanced state path; `useAngleSlider()` is re-exported for the
  same flow, while uncommon context utilities remain direct Ark imports.
- `asChild` is available on Ark DOM parts and requires one semantic child that can preserve the
  part's interaction contract.
- `ids` can stabilize the root, thumb, hidden input, control, value text, and label IDs.
- Ark state hooks remain intact:
  - root, label, control, and thumb: `data-disabled`, `data-invalid`, `data-readonly`
  - marker: `data-value`, `data-disabled`, and `data-state="under-value | at-value | over-value"`
- Ark CSS variables remain intact:
  - root: `--value`, `--angle`
  - marker: `--marker-value`, `--marker-display-value`

## Defaults and styling

- moduix supplies the circular dial, inner disc, center dot, rotating thumb, active line, marker,
  focus, disabled, read-only, and invalid visuals.
- Every rendered wrapper accepts `className` and preserves Ark `data-scope` / `data-part`.
- Public `--moduix-angle-slider-*` variables are registered in `src/lib/moduix/styles/theme.css`.
- Focus styling follows `Thumb:focus-visible`; invalid, disabled, read-only, and marker styling use
  Ark state attributes rather than legacy classes or wrapper state.
- `AngleSlider.Marks` preserves the same marker styling hooks as explicit `MarkerGroup` /
  `Marker` composition.

## Intentional sugar and differences from upstream

- Ark is headless; moduix provides default visuals and stable `data-slot` hooks.
- moduix owns the Ark hidden native input. Consumers never render `HiddenInput`, including with
  `RootProvider` or custom visible part composition.
- `AngleSlider.Dial` is narrow sugar for the most common `Control` + `Thumb` composition and keeps
  children inline for marker or overlay customization.
- `AngleSlider.Marks` is the only marker sugar. It reduces repeated docs and app boilerplate without
  generating thumbs, labels, value text, or form controls.
- Explicit `Control`, `Thumb`, `MarkerGroup`, and `Marker` composition remains supported and is
  still the escape hatch for custom dial rendering.
- moduix keeps `RootProvider` and re-exports `useAngleSlider()` for the normal provider flow, but
  does not re-export Ark context parts, context hooks, or Ark type aliases. Advanced consumers
  import those directly from `@ark-ui/react/angle-slider`.
- No legacy aliases, positional callback adapters, custom state context, or `render` prop remain.

## Agent notes

- Keep `RootProvider` styled with the same root class as `Root`.
- Keep `AngleSlider.Dial` as narrow sugar over `Control` and `Thumb`; do not expand it into a
  configuration surface for labels, value text, or form behavior.
- Keep `AngleSlider.Marks` as narrow sugar over `MarkerGroup` and `Marker`; do not expand it into a
  configuration surface for thumb, label, or form behavior.
- Keep the hidden native input internal to `Root` and `RootProvider`; do not restore it as a public
  part or ask consumers to render it in advanced examples.
- Do not render both `Root` and `RootProvider` for one machine.
- Preserve the Ark detail object passed to value callbacks.
- Keep geometry driven by Ark `--angle` / marker variables and state attributes.
- Keep docs previews synchronized with `Code` and `CSS`.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Internalized Ark `HiddenInput` in `Root` and `RootProvider`; native submission and
  reset no longer require consumer composition.
- 2026-07-09: Added `AngleSlider.Dial`, re-exported `useAngleSlider()` for the normal
  `RootProvider` path, documented `invalid`, and moved the full explicit dial composition into
  advanced examples.
- 2026-07-07: Added `AngleSlider.Marks`, shifted docs and stories to a lighter default composition,
  and made `HiddenInput` form-specific in recommended examples.
- 2026-07-02: Removed duplicate Ark type exports, the context part, and state hooks from the moduix
  surface. Kept `RootProvider`, the callable root, every styled visual part, and form behavior.
- 2026-06-24: Removed stale control focus styling, kept read-only thumbs pointer-focusable,
  exported the full Ark part prop type surface, and fixed the RootProvider docs snippet.
- 2026-06-18: Completed Ark UI parity by exposing `RootProvider`, `Context`, state hooks and types;
  added focus/read-only state styling; expanded stories and docs to all current Ark React examples;
  and standardized every docs preview with `Code`, `Styles`, and `Data`.
- 2026-06-17: Added the initial Ark UI wrapper, circular styles, theme tokens, stories, docs, and
  registry export.