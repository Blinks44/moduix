# ProgressCircular (Solid)

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/progress-circular
- Chakra UI: https://chakra-ui.com/docs/components/progress-circle

## Purpose

`ProgressCircular` shows determinate or indeterminate progress in an SVG circle for compact status
surfaces.

## Current behavior contract

The public root is `ProgressCircular`. Its family-prefixed parts are
`ProgressCircularLabel`, `ProgressCircularCircle`, `ProgressCircularCircleTrack`,
`ProgressCircularCircleRange`, `ProgressCircularRing`, `ProgressCircularValueText`, and
`ProgressCircularView`.

`ProgressCircularRootProvider` connects the parts to externally owned state from `useProgress()`.
`ProgressCircularContext` exposes the current state through a render function, and
`useProgressContext()` provides hook access below a root or provider.

Ark controlled and uncontrolled values, `onValueChange(details)`, `translations.value(details)`,
`ids`, `orientation`, state attributes, generated ARIA values, and SVG runtime variables are
preserved. `defaultValue={null}` or `value={null}` renders indeterminate progress.

## Anatomy and exported parts

```text
ProgressCircular
├─ ProgressCircularLabel
├─ ProgressCircularCircle
│  ├─ ProgressCircularCircleTrack
│  └─ ProgressCircularCircleRange
├─ ProgressCircularRing
│  └─ fixed ProgressCircularCircle, ProgressCircularCircleTrack, and ProgressCircularCircleRange subtree
├─ ProgressCircularValueText
└─ ProgressCircularView

ProgressCircularRootProvider
└─ same part tree connected to useProgress()
```

Every styled part forwards `class` and receives a stable `data-slot`. `ProgressCircularRing` is a
convenience part that renders the standard circle, track, and range subtree.

## Solid-specific mechanics

Solid uses Ark's render-function `asChild` composition. Ordinary refs and `asChild` composition are
covered independently in the Solid tests. Solid context values are accessor functions, so
`ProgressCircularContext` render functions read state from `progress()`.

## Accessibility and styling

Give `ProgressCircularRing` or `ProgressCircularCircle` an `aria-label` or
`aria-labelledby` that names the task. Ark provides `role="progressbar"` and the value ARIA
attributes on `ProgressCircularCircle`.

The CSS Modules adapter adds stable `data-slot` hooks and the documented
`--moduix-progress-circular-*` variables. The Tailwind adapter uses native utilities and `class`
overrides instead of CSS Modules variables.

## Composition

```tsx
import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/solid/progress-circular';

export function ExportProgress() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircularLabel>Export data</ProgressCircularLabel>
      <ProgressCircularRing aria-label="Export data" />
      <ProgressCircularValueText />
    </ProgressCircular>
  );
}
```

## Local changelog

- 2026-09-22: Replaced the compound namespace with flat family-prefixed exports and aligned the
  Solid contract with the React adapter.
