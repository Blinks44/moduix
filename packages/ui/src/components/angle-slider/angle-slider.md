# AngleSlider

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/angle-slider

## Purpose

`AngleSlider` is a styled Ark UI angle slider for selecting one numeric value on a circular
0-360-degree control.

## Upstream model to preserve

- Preserve Ark parts: `Root`, `RootProvider`, `Context`, `Label`, `Control`, `MarkerGroup`,
  `Marker`, `Thumb`, `ValueText`, and `HiddenInput`.
- Preserve `useAngleSlider`, `useAngleSliderContext`, controlled/uncontrolled state, callback detail
  objects, keyboard behavior, pointer dragging, form behavior, IDs, refs, and `asChild`.
- `RootProvider` owns an externally created `useAngleSlider` instance and must not be nested with a
  `Root` for that same instance.

## Current behavior contract

- `AngleSlider` is the styled root and is equivalent to `AngleSlider.Root`.
- All DOM parts are thin wrappers over the corresponding Ark parts and forward refs.
- `AngleSlider.Context`, `useAngleSlider`, and `useAngleSliderContext` expose the Ark state API
  without remapping.
- `value`, `defaultValue`, `step`, `disabled`, `invalid`, `readOnly`, `name`, `ids`,
  `onValueChange(details)`, and `onValueChangeEnd(details)` pass through unchanged.
- Visible parts and `HiddenInput` are explicitly composed; the wrapper does not generate markers or
  form controls.

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

`AngleSlider.Context` does not render a DOM element and therefore has no `data-slot`.

## Composition

```tsx
import { AngleSlider } from 'moduix';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

export function RotationAngleSlider() {
  return (
    <AngleSlider.Root defaultValue={135} aria-label="Rotation" name="rotation">
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.MarkerGroup>
          {markerValues.map((value) => (
            <AngleSlider.Marker key={value} value={value} />
          ))}
        </AngleSlider.MarkerGroup>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}
```

## Upstream feature coverage

- Official MDX examples `Basic`, `Controlled`, and `Steps` are supported and documented.
- Ark example surfaces `Disabled`, `Context`, and `Root Provider` are also supported and documented.
- `readOnly`, `invalid`, `name`, `ids`, `onValueChangeEnd`, `asChild`, and part refs pass through.
- `Context` exposes `value`, `valueAsDegree`, `setValue`, and `dragging`.
- `RootProvider` accepts the return value of `useAngleSlider`.

## Accessibility and state

- `Label` and `aria-label` / `aria-labelledby` preserve Ark slider naming.
- `Thumb` remains the focusable slider element with Ark keyboard and ARIA behavior.
- `HiddenInput` is required when native form submission and reset synchronization are needed.
- `disabled`, `invalid`, and `readOnly` are Ark root props. The primitive does not expose a separate
  moduix form-state context adapter.
- `asChild` is available on Ark DOM parts and requires one semantic child that can preserve the
  part's interaction contract.
- `ids` can stabilize the root, thumb, hidden input, control, value text, and label IDs.
- Ark state hooks remain intact:
  - root, label, control, and thumb: `data-disabled`, `data-invalid`, `data-readonly`
  - control: `data-focus`
  - marker: `data-value`, `data-disabled`, and
    `data-state="under-value | at-value | over-value"`
- Ark CSS variables remain intact:
  - root: `--value`, `--angle`
  - marker: `--marker-value`, `--marker-display-value`

## Defaults and styling

- moduix supplies the circular dial, inner disc, center dot, rotating thumb, active line, marker,
  focus, disabled, read-only, and invalid visuals.
- Every rendered wrapper accepts `className` and preserves Ark `data-scope` / `data-part`.
- Public `--angle-slider-*` variables are registered in `src/styles/theme.css`.
- Focus styling uses Ark `Control[data-focus]`; invalid, disabled, read-only, and marker styling use
  Ark state attributes rather than Base UI classes or wrapper state.

## Intentional sugar and differences from upstream

- Ark is headless; moduix provides default visuals and stable `data-slot` hooks.
- Markers remain explicit instead of being generated from a wrapper prop.
- No Base UI aliases, positional callback adapters, custom state context, or `render` prop remain.
- The public barrel re-exports Ark's `UseAngleSliderProps`, `UseAngleSliderReturn`,
  `UseAngleSliderContext`, and `AngleSliderContextProps` types.

## Agent notes

- Keep `RootProvider` styled with the same root class as `Root`.
- Do not render both `Root` and `RootProvider` for one machine.
- Preserve the Ark detail object passed to value callbacks.
- Keep geometry driven by Ark `--angle` / marker variables and state attributes.
- Keep docs previews synchronized with `Code`, `Styles`, and `Data` tabs.

## Local changelog

- 2026-06-18: Completed Ark UI parity by exposing `RootProvider`, `Context`, state hooks and types;
  added focus/read-only state styling; expanded stories and docs to all current Ark React examples;
  and standardized every docs preview with `Code`, `Styles`, and `Data`.
- 2026-06-17: Added the initial Ark UI wrapper, circular styles, theme tokens, stories, docs, and
  registry export.