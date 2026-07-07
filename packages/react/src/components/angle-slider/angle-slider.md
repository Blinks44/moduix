# AngleSlider

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/angle-slider
- Chakra UI Slider: https://chakra-ui.com/docs/components/slider

## Purpose

`AngleSlider` is a styled Ark UI angle slider for selecting one numeric value on a circular
0-360-degree control.

## Upstream model to preserve

- Preserve Ark visual parts: `Root`, `RootProvider`, `Label`, `Control`, `MarkerGroup`, `Marker`,
  `Thumb`, `ValueText`, and `HiddenInput`.
- Preserve controlled/uncontrolled state, callback detail objects, keyboard behavior, pointer
  dragging, form behavior, IDs, refs, and `asChild`.
- `RootProvider` owns an externally created `useAngleSlider` instance and must not be nested with a
  `Root` for that same instance.

## Current behavior contract

- `AngleSlider` is the styled root and is equivalent to `AngleSlider.Root`.
- All DOM parts are thin wrappers over the corresponding Ark parts and forward refs.
- `AngleSlider.Marks` is narrow sugar for `MarkerGroup` plus repeated `Marker` children from a
  `values` array.
- `value`, `defaultValue`, `step`, `disabled`, `invalid`, `readOnly`, `name`, `ids`,
  `onValueChange(details)`, and `onValueChangeEnd(details)` pass through unchanged.
- The lightest recommended composition is `Control` plus `Thumb`, with `Label`, `Marks`,
  `ValueText`, and `HiddenInput` added only when that behavior is needed.
- Context parts, state hooks, and Ark type aliases are imported directly from
  `@ark-ui/react/angle-slider`.

## Anatomy and exported parts

```text
AngleSlider.Root
├─ AngleSlider.Label
├─ AngleSlider.Control
│  ├─ AngleSlider.MarkerGroup
│  │  └─ AngleSlider.Marker[value]
│  └─ AngleSlider.Thumb
├─ AngleSlider.ValueText
└─ AngleSlider.HiddenInput
```

Externally owned state replaces `Root` with `RootProvider`.

| Part                       | `data-slot`                  |
| -------------------------- | ---------------------------- |
| `AngleSlider.Root`         | `angle-slider-root`          |
| `AngleSlider.RootProvider` | `angle-slider-root-provider` |
| `AngleSlider.Label`        | `angle-slider-label`         |
| `AngleSlider.Control`      | `angle-slider-control`       |
| `AngleSlider.MarkerGroup`  | `angle-slider-marker-group`  |
| `AngleSlider.Marker`       | `angle-slider-marker`        |
| `AngleSlider.Thumb`        | `angle-slider-thumb`         |
| `AngleSlider.ValueText`    | `angle-slider-value-text`    |
| `AngleSlider.HiddenInput`  | `angle-slider-hidden-input`  |

`AngleSlider.Marks` renders the same `MarkerGroup` and `Marker` slots; it does not add a separate
DOM part or styling hook.

## Composition

```tsx
import { AngleSlider } from '@moduix/react';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function RotationAngleSlider() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" name="rotation">
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Marks values={markerValues} />
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  );
}
```

Use explicit `MarkerGroup` and `Marker` when markers need custom children, per-marker props, or
custom ordering.

## Upstream feature coverage

- Official Ark example surfaces `Basic`, `Controlled`, and `Steps` are supported and documented.
- Ark example surfaces `Disabled` and `Root Provider` are also supported and documented.
- `readOnly`, `invalid`, `name`, `ids`, `onValueChangeEnd`, `asChild`, and part refs pass through.
- `RootProvider` accepts the return value of Ark's `useAngleSlider`.
- Chakra's `Slider.Marks` convenience informed the narrow `AngleSlider.Marks` sugar, but the
  underlying Ark part tree remains available.

## Accessibility and state

- `Label` and `aria-label` / `aria-labelledby` preserve Ark slider naming.
- `Thumb` remains the focusable slider element with Ark keyboard and ARIA behavior.
- `HiddenInput` is only needed when native form submission and reset synchronization are required.
- `disabled`, `invalid`, and `readOnly` are Ark root props. The wrapper does not add a separate
  moduix form-state adapter.
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
- Public `--angle-slider-*` variables are registered in `src/lib/moduix/styles/theme.css`.
- Focus styling follows `Thumb:focus-visible`; invalid, disabled, read-only, and marker styling use
  Ark state attributes rather than legacy classes or wrapper state.
- `AngleSlider.Marks` preserves the same marker styling hooks as explicit `MarkerGroup` /
  `Marker` composition.

## Intentional sugar and differences from upstream

- Ark is headless; moduix provides default visuals and stable `data-slot` hooks.
- `AngleSlider.Marks` is the only marker sugar. It reduces repeated docs and app boilerplate without
  generating thumbs, labels, value text, or form controls.
- Explicit `MarkerGroup` and `Marker` composition remains supported and is still the escape hatch
  for custom marker rendering.
- moduix keeps `RootProvider`, but does not re-export Ark context parts, state hooks, or Ark type
  aliases. Advanced consumers import those directly from `@ark-ui/react/angle-slider`.
- No legacy aliases, positional callback adapters, custom state context, or `render` prop remain.

## Agent notes

- Keep `RootProvider` styled with the same root class as `Root`.
- Keep `AngleSlider.Marks` as narrow sugar over `MarkerGroup` and `Marker`; do not expand it into a
  configuration surface for thumb, label, or form behavior.
- Do not render both `Root` and `RootProvider` for one machine.
- Preserve the Ark detail object passed to value callbacks.
- Keep geometry driven by Ark `--angle` / marker variables and state attributes.
- Keep docs previews synchronized with `Code` and `CSS`.

## Local changelog

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