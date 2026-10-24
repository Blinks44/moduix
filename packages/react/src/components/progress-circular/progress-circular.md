# ProgressCircular

Upstream (accessed 2026-10-18):

- Ark UI: https://ark-ui.com/docs/components/progress-circular
- Chakra UI: https://chakra-ui.com/docs/components/progress-circle

| Source    | Useful difference                                                                                    | moduix decision                                                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Ark UI    | Root, Label, Circle, CircleTrack, CircleRange, ValueText, View; `--size` and `--thickness` on Circle | **Required correctness:** keep every circular part, `null` for indeterminate, callback details, and the SVG variables.                    |
| Chakra UI | `size` (xs–xl), `colorPalette`, spinning indeterminate arc, `AbsoluteCenter` for the value           | **Adopted:** a visible spinning arc. **Rejected for now:** `size` and centered value sugar; the CSS variables and docs layout cover them. |

## Purpose

`ProgressCircular` shows determinate or indeterminate progress in an SVG circle for compact status
surfaces. Use `ProgressLinear` for the horizontal anatomy; linear Ark parts are not exported here.

## Current behavior contract

- Ark owns value state (`value`, `defaultValue`, `onValueChange(details)`), `min`, `max`,
  `formatOptions`, `locale`, `translations`, `ids`, and `orientation`. `null` renders indeterminate
  progress.
- Ark writes `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and an
  `aria-label` from `translations.value(details)` to `ProgressCircularCircle`. Pass `aria-label` or
  `aria-labelledby` to `ProgressCircularRing` / `ProgressCircularCircle` to name the task;
  `ProgressCircularLabel` is visible text only and creates no ARIA relationship.
- `ProgressCircularValueText` renders Ark's formatted percent with `aria-live="polite"`. To show the
  `translations.value` wording, render it inside `ProgressCircularContext` with
  `progress.valueAsString` as its child.
- `ProgressCircularRing` is fixed sugar: `ProgressCircularCircle` with the default track and range. Its
  `className`, ref, and `data-slot="progress-circular-circle"` target the circle. Use the individual
  circle parts to style the track or range per instance or to compose with `asChild`.
- `ProgressCircularView` renders Ark's state view unstyled; Ark hides it with `hidden` when the state
  does not match.
- `ProgressCircularRootProvider` connects the parts to `useProgress()` state;
  `ProgressCircularContext` and `useProgressContext()` read state below a root or provider.
- Exports the Ark part, details, and hook types.

## Anatomy

```text
ProgressCircular / ProgressCircularRootProvider  data-slot="progress-circular-root[-provider]"
├─ ProgressCircularLabel                          data-slot="progress-circular-label"
├─ ProgressCircularRing → ProgressCircularCircle  data-slot="progress-circular-circle"
│  ├─ ProgressCircularCircleTrack                 data-slot="progress-circular-circle-track"
│  └─ ProgressCircularCircleRange                 data-slot="progress-circular-circle-range"
├─ ProgressCircularValueText                      data-slot="progress-circular-value-text"
└─ ProgressCircularView                           data-slot="progress-circular-view"
```

## Defaults and styling

- The root is an `inline-grid` that centers its children and stays within its container; label and
  value text wrap long words.
- CSS Modules expose `--moduix-progress-circular-size`, `--moduix-progress-circular-thickness`
  (mapped to Ark `--size` and `--thickness` on the circle), `--moduix-progress-circular-track-bg`, and
  `--moduix-progress-circular-range-bg`. Everything else comes from foundation tokens; override it
  with a class on the part. Ark owns `--radius`, `--circumference`, `--percent`, and `--offset`.
- The range has round caps and transitions `stroke-dashoffset`. Indeterminate progress draws a
  quarter-circle arc (`calc(var(--circumference) / 4)`) that spins with the foundation
  `moduix-progress-circular-indeterminate` keyframes. Under reduced motion the transition and the
  spin are disabled and the arc stays visible.
- State hooks come from Ark: `data-state="indeterminate|loading|complete"`, `data-value`, `data-max`,
  and `data-orientation`.

## Composition

```tsx
<ProgressCircular defaultValue={42}>
  <ProgressCircularLabel>Export data</ProgressCircularLabel>
  <ProgressCircularRing aria-label="Export data" />
  <ProgressCircularValueText />
</ProgressCircular>
```

Docs examples center `ProgressCircularValueText` over the circle with a local grid wrapper; that
wrapper is layout, not a library part.

## Agent notes

- Do not add hidden structural wrappers to center `ProgressCircularValueText`.
- Keep callbacks Ark-shaped and keep `ProgressCircularRootProvider` on Ark state.
- When changing CSS variables, update docs examples, this file, `variables-moduix.css`, and the
  registry output.