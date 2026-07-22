# ProgressCircular

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/progress-circular
- Chakra UI: https://chakra-ui.com/docs/components/progress-circle

## Purpose

`ProgressCircular` shows determinate or indeterminate progress in an SVG circle for compact status
surfaces.

## Upstream model to preserve

The wrapper follows Ark UI's circular `@ark-ui/react/progress` anatomy: `Root`, optional `Label`,
`Circle`, `CircleTrack`, `CircleRange`, optional `ValueText`, `View`, and `RootProvider`.

Preserve Ark root props, controlled and uncontrolled value behavior, `onValueChange(details)`,
`translations.value(details)`, `ids`, `asChild`, state strings, ARIA generated on `Circle`, and SVG
CSS variables generated on the circle parts.

## Current behavior contract

`ProgressCircular` is the same part as `ProgressCircular.Root`. It does not auto-render label,
circle, or value text. `ProgressCircular.Ring` is the recommended convenience part for the fixed
circle, track, and range subtree; `Circle`, `CircleTrack`, and `CircleRange` remain available for
low-level composition.

`defaultValue` sets uncontrolled progress. `value` plus `onValueChange(details)` controls progress.
`defaultValue={null}` or `value={null}` renders indeterminate progress. `min`, `max`,
`formatOptions`, `locale`, `translations`, `ids`, and `orientation` pass through to Ark.

`ProgressCircular.RootProvider` is preserved for externally owned Ark progress state. Create that
state with `ProgressCircular.useProgress()`. `ProgressCircular.Context` and
`ProgressCircular.useProgressContext()` expose state below a root/provider without a direct Ark
import.

## Anatomy and exported parts

```text
ProgressCircular / ProgressCircular.Root
├─ ProgressCircular.Label
├─ ProgressCircular.Circle
│  ├─ ProgressCircular.CircleTrack
│  └─ ProgressCircular.CircleRange
├─ ProgressCircular.Ring
│  └─ fixed Circle, CircleTrack, and CircleRange subtree
├─ ProgressCircular.ValueText
└─ ProgressCircular.View

ProgressCircular.RootProvider
└─ same part tree connected to ProgressCircular.useProgress()
```

- `ProgressCircular` / `ProgressCircular.Root`: `data-slot="progress-circular-root"`; owns Ark
  state, ids, formatting, `data-value`, `data-max`, `data-state`, and `data-orientation`.
- `ProgressCircular.RootProvider`: `data-slot="progress-circular-root-provider"`; connects parts
  to an external `ProgressCircular.useProgress()` store.
- `ProgressCircular.Context`: render-prop access to the current progress state.
- `ProgressCircular.useProgressContext()`: hook access to state below a root/provider.
- `ProgressCircular.Label`: `data-slot="progress-circular-label"`; accessible label.
- `ProgressCircular.Circle`: `data-slot="progress-circular-circle"`; SVG progressbar surface with
  role and ARIA value attributes from Ark.
- `ProgressCircular.CircleTrack`: `data-slot="progress-circular-circle-track"`; background circle.
- `ProgressCircular.CircleRange`: `data-slot="progress-circular-circle-range"`; foreground circle
  using Ark stroke variables and `data-state`.
- `ProgressCircular.Ring`: a convenience circle with the default track and range. Its `className`,
  ref, CSS variables, and `data-slot="progress-circular-circle"` target the underlying `Circle`.
- `ProgressCircular.ValueText`: `data-slot="progress-circular-value-text"`; formatted value text
  with Ark live-region behavior.
- `ProgressCircular.View`: `data-slot="progress-circular-view"`; conditional content for Ark
  progress states.

## Composition

```tsx
import { ProgressCircular } from '@moduix/react';

export function ExportProgress() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <ProgressCircular.Ring />
      <ProgressCircular.ValueText />
    </ProgressCircular>
  );
}
```

Wrap `Circle` and `ValueText` in a local layout element when the value should be centered over the
circle. That wrapper is demo layout, not a required library part.

## Upstream feature coverage

The wrapper exposes the circular Ark examples and guide topics: basic progress, `min`/`max`,
indeterminate progress with `null`, labels, value text, custom `translations.value(details)`,
`RootProvider`, `View`, and circle styling through `--size` and `--thickness`.

Linear Ark parts (`Track` and `Range`) are intentionally not exported here. Use `ProgressLinear`
for the horizontal progress anatomy.

## Accessibility and state

Ark writes `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and accessible
value text to `ProgressCircular.Circle`. Use `ProgressCircular.Label` or pass `aria-label` /
`aria-labelledby` when composing without the label part.

`ProgressCircular.ValueText` uses Ark formatting and live-region behavior. Progress is
informational and has no keyboard interaction or focus management.

Ark state attributes are preserved: root has `data-scope="progress"`, `data-part="root"`,
`data-state`, `data-value`, `data-max`, and `data-orientation`; circle, circle track, circle range,
label, value text, and view keep their Ark `data-scope` / `data-part` hooks. `data-state` can be
`indeterminate`, `loading`, or `complete`.

## Defaults and styling

The wrapper adds moduix classes and stable `data-slot` hooks, then leaves behavior to Ark. Public
theme variables use the `--moduix-progress-circular-*` prefix for root color/gap/width, label text,
value text, circle size, circle thickness, track color, range color, range linecap, range
transition, and indeterminate animation.

`ProgressCircular.Circle` and `ProgressCircular.Ring` map `--moduix-progress-circular-size` to Ark `--size` and
`--moduix-progress-circular-thickness` to Ark `--thickness`. Ark continues to own `--moduix-radius`,
`--circumference`, `--percent`, and stroke offset variables.

## Intentional sugar and differences from upstream

The component splits circular progress into its own public wrapper instead of exposing a single
`Progress` component with both linear and circular anatomy. This keeps registry items and docs
focused while preserving Ark's underlying `Progress` API.

`ProgressCircular.Ring` removes the repeated fixed circle/track/range markup but does not center or
render `ValueText`; keep that layout explicit. Use the individual circle parts when their children
or Ark `asChild` composition need customization.

The old Base UI names and props are not preserved: `Progress`, `ProgressRoot`, `ProgressLabel`,
`ProgressValue`, `ProgressTrack`, `ProgressIndicator`, `format`, and `getAriaValueText` were
replaced by Ark parts, `formatOptions`, and `translations.value(details)`.

## Agent notes

Do not add hidden structural wrappers to center `ValueText`; keep that as consumer or docs layout.
Do not remap Ark callback detail objects or replace `RootProvider` with a local state layer.
Keep normal state/provider examples on the `ProgressCircular` namespace; direct Ark imports are
only an advanced escape hatch. When changing styling hooks or CSS variables, update docs examples,
this file, `theme.css`, and the registry output.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-12: Exposed `Context`, `useProgress()`, and `useProgressContext()` on the
  `ProgressCircular` namespace so normal provider/state composition stays on moduix without a
  duplicate named hook export.
- 2026-07-10: Added `ProgressCircular.Ring` as the recommended, stylable fixed circle/track/range
  composition; retained the individual Ark parts for advanced customization.
- 2026-07-03: Simplified the public surface to match `Combobox`: kept `RootProvider`, removed
  moduix re-exports of Ark hooks, context, and duplicate types, and updated docs to point advanced
  state usage to direct Ark imports.
- 2026-06-26: Audited the Ark migration, aligned local docs to the required structure, documented
  circular anatomy and styling hooks, and normalized the default circle thickness to `0.4rem`.
- Added `ProgressCircular` as an Ark UI circular progress wrapper with RootProvider, Context, hook
  exports, and `--moduix-progress-circular-*` styling tokens.
- Split progress into dedicated `ProgressLinear` and `ProgressCircular` public components.