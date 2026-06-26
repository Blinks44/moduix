# ProgressCircular

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/progress-circular
- Chakra UI: https://chakra-ui.com/docs/components/progress-circle

## Purpose

`ProgressCircular` shows determinate or indeterminate progress in an SVG circle for compact status
surfaces.

## Upstream model to preserve

The wrapper follows Ark UI's circular `@ark-ui/react/progress` anatomy: `Root`, optional `Label`,
`Circle`, `CircleTrack`, `CircleRange`, optional `ValueText`, `View`, `Context`, `RootProvider`,
`useProgress`, and `useProgressContext`.

Preserve Ark root props, controlled and uncontrolled value behavior, `onValueChange(details)`,
`translations.value(details)`, `ids`, `asChild`, state strings, ARIA generated on `Circle`, and SVG
CSS variables generated on the circle parts.

## Current behavior contract

`ProgressCircular` is the same part as `ProgressCircular.Root`. It does not auto-render label,
circle, track, range, or value text. Consumers compose the Ark-shaped part tree explicitly.

`defaultValue` sets uncontrolled progress. `value` plus `onValueChange(details)` controls progress.
`defaultValue={null}` or `value={null}` renders indeterminate progress. `min`, `max`,
`formatOptions`, `locale`, `translations`, `ids`, and `orientation` pass through to Ark.

`ProgressCircular.RootProvider`, `ProgressCircular.Context`, `useProgressCircular()`, and
`useProgressCircularContext()` are direct Ark state surfaces renamed for the circular wrapper.

## Anatomy and exported parts

```text
ProgressCircular / ProgressCircular.Root
├─ ProgressCircular.Label
├─ ProgressCircular.Circle
│  ├─ ProgressCircular.CircleTrack
│  └─ ProgressCircular.CircleRange
├─ ProgressCircular.ValueText
└─ ProgressCircular.View

ProgressCircular.RootProvider
└─ same part tree connected to useProgressCircular()
```

- `ProgressCircular` / `ProgressCircular.Root`: `data-slot="progress-circular-root"`; owns Ark
  state, ids, formatting, `data-value`, `data-max`, `data-state`, and `data-orientation`.
- `ProgressCircular.RootProvider`: `data-slot="progress-circular-root-provider"`; connects parts
  to an external `useProgressCircular()` store.
- `ProgressCircular.Label`: `data-slot="progress-circular-label"`; accessible label.
- `ProgressCircular.Circle`: `data-slot="progress-circular-circle"`; SVG progressbar surface with
  role and ARIA value attributes from Ark.
- `ProgressCircular.CircleTrack`: `data-slot="progress-circular-circle-track"`; background circle.
- `ProgressCircular.CircleRange`: `data-slot="progress-circular-circle-range"`; foreground circle
  using Ark stroke variables and `data-state`.
- `ProgressCircular.ValueText`: `data-slot="progress-circular-value-text"`; formatted value text
  with Ark live-region behavior.
- `ProgressCircular.View`: `data-slot="progress-circular-view"`; conditional content for Ark
  progress states.
- `ProgressCircular.Context`: render-prop access to the Ark progress API.

## Composition

```tsx
import { ProgressCircular } from '@moduix/react';

export function ExportProgress() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <ProgressCircular.Circle>
        <ProgressCircular.CircleTrack />
        <ProgressCircular.CircleRange />
      </ProgressCircular.Circle>
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
`RootProvider`, `Context`, `useProgressCircular()`, `useProgressCircularContext()`, `View`, and
circle styling through `--size` and `--thickness`.

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
theme variables use the `--progress-circular-*` prefix for root color/gap/width, label text,
value text, circle size, circle thickness, track color, range color, range linecap, range
transition, and indeterminate animation.

`ProgressCircular.Circle` maps `--progress-circular-size` to Ark `--size` and
`--progress-circular-thickness` to Ark `--thickness`. Ark continues to own `--radius`,
`--circumference`, `--percent`, and stroke offset variables.

## Intentional sugar and differences from upstream

The component splits circular progress into its own public wrapper instead of exposing a single
`Progress` component with both linear and circular anatomy. This keeps registry items and docs
focused while preserving Ark's underlying `Progress` API.

The old Base UI names and props are not preserved: `Progress`, `ProgressRoot`, `ProgressLabel`,
`ProgressValue`, `ProgressTrack`, `ProgressIndicator`, `format`, and `getAriaValueText` were
replaced by Ark parts, `formatOptions`, and `translations.value(details)`.

## Agent notes

Do not add hidden structural wrappers to center `ValueText`; keep that as consumer or docs layout.
Do not remap Ark callback detail objects or replace `RootProvider` with a local state layer.
When changing styling hooks or CSS variables, update docs examples, this file, `theme.css`, and the
registry output.

## Local changelog

- 2026-06-26: Audited the Ark migration, aligned local docs to the required structure, documented
  circular Ark state surfaces, and normalized the default circle thickness to `0.4rem`.
- Added `ProgressCircular` as an Ark UI circular progress wrapper with RootProvider, Context, hook
  exports, and `--progress-circular-*` styling tokens.
- Split progress into dedicated `ProgressLinear` and `ProgressCircular` public components.