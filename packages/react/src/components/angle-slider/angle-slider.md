# AngleSlider

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/angle-slider
- Chakra UI Slider: https://chakra-ui.com/docs/components/slider

## Purpose

`AngleSlider` is a styled Ark UI angle slider for selecting one numeric value on a circular
0-360-degree control.

## Upstream model to preserve

- Preserve Ark visual parts: `Root`, `RootProvider`, `Label`, `Control`, `MarkerGroup`, `Marker`,
  `Thumb`, `ValueText`, and the explicit `HiddenInput`.
- Preserve controlled/uncontrolled state, callback detail objects, keyboard behavior, pointer
  dragging, native submission and reset, external form ownership, IDs, refs, and `asChild`.
- `AngleSliderRootProvider` owns an externally created `useAngleSlider` instance and must not be
  nested with a root for that same instance.

## Current behavior contract

- `AngleSlider` is the styled root.
- All DOM parts are thin wrappers over the corresponding Ark parts and forward refs.
- `AngleSliderDial` is narrow sugar for `Control`, the centered `ValueText`, and `Thumb`, with
  optional children rendered inside the control before the value text.
- `AngleSliderControl` focuses the thumb synchronously on a left pointer down with
  `focus({ preventScroll: true, focusVisible: false })` and calls `event.preventDefault()` first.
  Zag defers its own thumb focus to a later frame, which Chrome treats as script focus and flags
  with `:focus-visible`; the synchronous suppressed focus makes that deferred focus redundant, so
  the pointer interaction and the release state stay free of the keyboard focus ring while the
  thumb remains focused for keyboard continuation. The handler calls the consumer `onPointerDown`
  first and skips the focus when the event is prevented or the control is disabled or read-only.
  Browsers without the `focusVisible` focus option ignore it and fall back to the browser default.
- `AngleSliderMarks` is narrow sugar for `MarkerGroup` plus repeated `Marker` children from a
  `values` array.
- `useAngleSlider()` is re-exported from moduix for the normal `AngleSliderRootProvider` path.
- `value`, `defaultValue`, `step`, `disabled`, `invalid`, `readOnly`, `name`, `ids`,
  `onValueChange(details)`, and `onValueChangeEnd(details)` pass through unchanged.
- The lightest recommended composition is `Dial`, which already shows the value in the dial center;
  add `Label` and `Marks` only when that behavior is needed. Add `AngleSliderHiddenInput`
  explicitly for native form behavior.
- `AngleSliderContext` and `useAngleSliderContext()` are exported from moduix; Ark type aliases
  remain direct imports from `@ark-ui/react/angle-slider`.

## Anatomy and exported parts

```text
AngleSlider
├─ AngleSliderLabel
├─ AngleSliderControl
│  ├─ AngleSliderMarkerGroup
│  │  └─ AngleSliderMarker[value]
│  ├─ AngleSliderValueText
│  └─ AngleSliderThumb
└─ (ValueText outside Control renders as a plain block)
```

Externally owned state replaces the root with `AngleSliderRootProvider`.

| Part                      | `data-slot`                  |
| ------------------------- | ---------------------------- |
| `AngleSlider`             | `angle-slider-root`          |
| `AngleSliderRootProvider` | `angle-slider-root-provider` |
| `AngleSliderLabel`        | `angle-slider-label`         |
| `AngleSliderControl`      | `angle-slider-control`       |
| `AngleSliderDial`         | `angle-slider-control`       |
| `AngleSliderMarkerGroup`  | `angle-slider-marker-group`  |
| `AngleSliderMarker`       | `angle-slider-marker`        |
| `AngleSliderThumb`        | `angle-slider-thumb`         |
| `AngleSliderValueText`    | `angle-slider-value-text`    |

`AngleSliderDial` renders the same `Control`, `ValueText`, and `Thumb` slots; `AngleSliderMarks`
renders the same `MarkerGroup` and `Marker` slots. Neither adds a separate DOM part or styling hook.

## Composition

```tsx
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/react/angle-slider';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function RotationAngleSlider() {
  return (
    <AngleSlider defaultValue={135} aria-label="Rotation" name="rotation">
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
    </AngleSlider>
  );
}
```

Use explicit `Control`, `Thumb`, `MarkerGroup`, and `Marker` when the dial needs custom children,
per-marker props, custom ordering, or no centered value text.

## Upstream feature coverage

- Official Ark example surfaces `Basic`, `Controlled`, and `Steps` are supported and documented.
- Ark example surfaces `Disabled` and `Root Provider` are also supported and documented.
- `readOnly`, `invalid`, `name`, `ids`, `onValueChangeEnd`, and refs pass through and are
  documented. `asChild` is available on the underlying Ark DOM parts; `Dial` and `Marks` keep their
  fixed multi-part composition.
- `AngleSliderRootProvider` accepts the return value of moduix `useAngleSlider()` and the underlying
  Ark hook.
- Chakra's `Slider.Marks` convenience informed the narrow `AngleSliderMarks` sugar, and
  `AngleSliderDial` follows the same "common structure first" ergonomics without removing the
  underlying Ark part tree.

## Accessibility and state

- `Label` and `aria-label` / `aria-labelledby` preserve Ark slider naming.
- `Thumb` remains the focusable slider element with Ark keyboard and ARIA behavior.
- `AngleSliderHiddenInput` renders Ark's hidden native input. With `name`, it participates in native
  form submission; set `form` on `HiddenInput` for an external form owner. Ark owns reset synchronization.
- `disabled`, `invalid`, and `readOnly` are Ark root props. The wrapper does not add a separate
  moduix form-state adapter.
- `AngleSliderRootProvider` is the moduix-owned advanced state path; `useAngleSlider()` is
  re-exported for the same flow, while uncommon context utilities remain direct Ark imports.
- `asChild` is available on Ark DOM parts and requires one compatible child. For the root and
  `AngleSliderRootProvider`, use a container that can contain the explicitly composed hidden input
  and slider parts. `Dial` and `Marks` do not accept `asChild` because each renders a fixed
  multi-part tree.
- `ids` can stabilize the root, thumb, hidden input, control, value text, and label IDs.
- Ark state hooks remain intact:
  - root, label, control, and thumb: `data-disabled`, `data-invalid`, `data-readonly`
  - marker: `data-value`, `data-disabled`, and `data-state="under-value | at-value | over-value"`
- Ark CSS variables remain intact:
  - root: `--value`, `--angle`
  - marker: `--marker-value`, `--marker-display-value`

## Defaults and styling

- moduix supplies the circular track: a ring drawn with a `conic-gradient` fill from the top
  (`0deg`) to Ark's `--angle`, masked to the ring band; a rounded start cap where the fill begins;
  a circle thumb riding the ring centerline, mirroring the linear `Slider` thumb contract; the
  centered value text; and marker, focus, disabled, read-only, and invalid visuals.
- The dial geometry is driven by the Ark root variables `--angle` and `--value`; no extra JS is
  used for the fill or the thumb position.
- Every rendered wrapper accepts `className` and preserves Ark `data-scope` / `data-part`.
- Public `--moduix-angle-slider-*` variables are registered in `packages/foundation/src/styles/variables-moduix.css`.
- Focus styling follows `Thumb:focus-visible` and mirrors the linear `Slider` thumb: ring-colored
  border plus the shared inset focus ring on the thumb only; the control adds no second indicator.
  Invalid, disabled, read-only, and marker styling use Ark state attributes rather than legacy
  classes or wrapper state.
- Hover and active track coloring applies only to interactive controls. While the dial is pressed,
  the thumb mirrors the linear `Slider` dragging look through the native `:active` control state
  (Zag exposes no `data-dragging` attribute on the angle slider thumb); the ring disappears on
  release because the press focus was suppressed with `focusVisible: false`. Keyboard focus still
  shows the ring through `:focus-visible`. Thumb transitions are removed under
  `prefers-reduced-motion`.
- `AngleSliderMarks` preserves the same marker styling hooks as explicit `MarkerGroup` /
  `Marker` composition.

## Intentional sugar and differences from upstream

- Ark is headless; moduix provides default visuals and stable `data-slot` hooks.
- Compose `AngleSliderHiddenInput` explicitly inside the root or `AngleSliderRootProvider` when
  native form participation is needed.
- `AngleSliderDial` is narrow sugar for the most common `Control` + `Thumb` composition and keeps
  children inline for marker or overlay customization.
- `AngleSliderMarks` is the only marker sugar. It reduces repeated docs and app boilerplate without
  generating thumbs, labels, value text, or form controls.
- Explicit `Control`, `Thumb`, `MarkerGroup`, and `Marker` composition remains supported and is
  still the escape hatch for custom dial rendering.
- moduix keeps `AngleSliderRootProvider`, `AngleSliderContext`, and re-exports `useAngleSlider()`
  and `useAngleSliderContext()` for the normal provider and context flows. Ark type aliases remain
  direct imports from `@ark-ui/react/angle-slider`.
- No legacy aliases, positional callback adapters, custom state context, or `render` prop remain.

## Agent notes

- Keep `AngleSliderRootProvider` styled with the same root class as the root.
- Keep `AngleSliderDial` as narrow sugar over `Control`, centered `ValueText`, and `Thumb`; do not
  expand it into a configuration surface for labels, value text, or form behavior.
- Keep `AngleSliderMarks` as narrow sugar over `MarkerGroup` and `Marker`; do not expand it into a
  configuration surface for thumb, label, or form behavior.
- Keep `AngleSliderHiddenInput` aligned with Ark's explicit composition.
- Do not render both the root and `AngleSliderRootProvider` for one machine.
- Preserve the Ark detail object passed to value callbacks.
- Keep geometry driven by Ark `--angle` / marker variables and state attributes.
- Keep docs previews synchronized with `Code` and `CSS`.

## Local changelog

- 2026-09-21: Migrated the public surface to the flat component API: the root is exported as
  `AngleSlider`, parts as `AngleSlider<Part>` values, and hooks stay top-level `use*` exports; the
  compound `AngleSlider.*` namespace was removed without compatibility aliases.
- 2026-09-17: Redesigned the dial as a circular track with a conic-gradient fill from the top,
  a circle thumb riding the ring, and the value text centered in the dial (`Dial` now renders the
  centered `ValueText`); removed the needle thumb, inner disc, center dot, and track/control border
  variables, and retuned the public variable set. Aligned the thumb with the linear `Slider` thumb
  (border token, focus ring, no active scale), added a rounded start cap for the fill, and dropped
  the control-level focus ring and dial shadow variables. Added a `:active` dragging ring and the
  `preventDefault` + `focusVisible: false` press focus so the ring clears on mouse release like the
  linear slider.
- 2026-08-31: Removed the unused `Dial.thumbClassName` configuration prop; use explicit
  `Control` and `Thumb` composition to style the thumb.
- 2026-08-08: Added external `form` ownership and native reset synchronization, completed
  asChild/ref/read-only regression coverage, made invalid indicator theming accurate, and added
  interactive ring plus reduced-motion styling.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-09-04: Exposed Ark `HiddenInput` explicitly and removed root child mutation and custom reset handling.
- 2026-07-13: Ark `HiddenInput` was internalized at this point in the wrapper history.
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