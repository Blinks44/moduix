# ProgressLinear

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/progress-linear
- Chakra UI: https://chakra-ui.com/docs/components/progress

## Purpose

`ProgressLinear` shows determinate or indeterminate progress in a horizontal or vertical bar.

## Upstream model to preserve

The wrapper follows Ark UI's linear `@ark-ui/react/progress` anatomy: `Root`, optional `Label`,
optional `ValueText`, `Track`, `Range`, `View`, and `RootProvider`.

Preserve Ark root props, controlled and uncontrolled value behavior, `onValueChange(details)`,
`translations.value(details)`, `ids`, `asChild`, orientation, state strings, ARIA generated on
`Track`, and Ark `data-scope` / `data-part` / `data-state` / `data-orientation` attributes.

## Current behavior contract

`ProgressLinear` is the same part as `ProgressLinear.Root`. It does not auto-render label, value
text, track, or range. Consumers compose the Ark-shaped part tree explicitly.

`defaultValue` sets uncontrolled progress. `value` plus `onValueChange(details)` controls progress.
`defaultValue={null}` or `value={null}` renders indeterminate progress. `min`, `max`,
`formatOptions`, `locale`, `translations`, `ids`, and `orientation` pass through to Ark.

`ProgressLinear.RootProvider` is preserved for externally owned Ark progress state. Import
`useProgress()` and related advanced state APIs directly from `@ark-ui/react/progress` when you
need them.

## Anatomy and exported parts

```text
ProgressLinear / ProgressLinear.Root
├─ ProgressLinear.Label
├─ ProgressLinear.ValueText
├─ ProgressLinear.Track
│  └─ ProgressLinear.Range
└─ ProgressLinear.View

ProgressLinear.RootProvider
└─ same part tree connected to useProgress() from @ark-ui/react/progress
```

- `ProgressLinear` / `ProgressLinear.Root`: `data-slot="progress-linear-root"`; owns Ark state,
  ids, formatting, `data-value`, `data-max`, `data-state`, and `data-orientation`.
- `ProgressLinear.RootProvider`: `data-slot="progress-linear-root-provider"`; connects parts to
  an external `useProgress()` store.
- `ProgressLinear.Label`: `data-slot="progress-linear-label"`; visible label.
- `ProgressLinear.ValueText`: `data-slot="progress-linear-value-text"`; formatted value text with
  Ark live-region behavior.
- `ProgressLinear.Track`: `data-slot="progress-linear-track"`; linear progressbar surface with
  role and ARIA value attributes from Ark.
- `ProgressLinear.Range`: `data-slot="progress-linear-range"`; filled range using Ark inline
  width or height and `data-state`.
- `ProgressLinear.View`: `data-slot="progress-linear-view"`; conditional content for Ark progress
  states.

## Composition

```tsx
import { ProgressLinear } from '@moduix/react';

export function ExportProgress() {
  return (
    <ProgressLinear defaultValue={24}>
      <ProgressLinear.Label>Export data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}
```

Use `orientation="vertical"` for vertical progress and set `--progress-linear-height` when the
default `12rem` height does not fit the layout.

## Upstream feature coverage

The wrapper exposes the linear Ark examples and guide topics: basic progress, `min`/`max`,
indeterminate progress with `null`, custom `translations.value(details)`, vertical orientation,
`RootProvider`, and `View`.

Circular Ark parts (`Circle`, `CircleTrack`, and `CircleRange`) are intentionally not exported
here. Use `ProgressCircular` for the SVG progress anatomy.

## Accessibility and state

Ark writes `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and accessible
value text to `ProgressLinear.Track`. Use `ProgressLinear.Label` for visible labeling and pass
`aria-label` / `aria-labelledby` when composing without visible text.

`ProgressLinear.ValueText` uses Ark formatting and live-region behavior. Progress is informational
and has no keyboard interaction or focus management.

Ark state attributes are preserved: root has `data-scope="progress"`, `data-part="root"`,
`data-state`, `data-value`, `data-max`, and `data-orientation`; label, value text, track, range,
and view keep their Ark `data-scope` / `data-part` hooks. `data-state` can be `indeterminate`,
`loading`, or `complete`.

## Defaults and styling

The wrapper adds moduix classes and stable `data-slot` hooks, then leaves behavior to Ark. Public
theme variables use the `--progress-linear-*` prefix for root color/gap/width/height, label text,
value text, track color/border/radius/size, range color/radius/transition, and indeterminate
animations.

Horizontal range size comes from Ark's inline `width`. Vertical range size comes from Ark's inline
`height`; the wrapper switches the track to a bottom-aligned flex container when
`data-orientation="vertical"`.

## Intentional sugar and differences from upstream

The component splits linear progress into its own public wrapper instead of exposing a single
`Progress` component with both linear and circular anatomy. This keeps registry items and docs
focused while preserving Ark's underlying `Progress` API.

The old Base UI names and props are not preserved: `Progress`, `ProgressRoot`, `ProgressLabel`,
`ProgressValue`, `ProgressTrack`, `ProgressIndicator`, `format`, and `getAriaValueText` were
replaced by Ark parts, `formatOptions`, and `translations.value(details)`.

## Agent notes

Do not add hidden structural wrappers for label, value text, track, or range. Do not remap Ark
callback detail objects or replace `RootProvider` with a local state layer. Keep advanced Ark
state APIs out of the moduix surface; consumers can import them from Ark directly when needed.
When changing styling hooks or CSS variables, update docs examples, this file, `theme.css`, and
the registry output.

## Local changelog

- 2026-07-03: Simplified the public surface to match `Combobox`: kept `RootProvider`, removed
  moduix re-exports of Ark hooks, context, and duplicate types, and updated docs to point advanced
  state usage to direct Ark imports.
- 2026-06-26: Audited the Ark migration, aligned local docs to the required structure, added
  documented vertical orientation styling, and removed stale story CSS.
- Added `ProgressLinear` as an Ark UI linear progress wrapper with RootProvider, Context, hook
  exports, and `--progress-linear-*` styling tokens.
- Split progress into dedicated `ProgressLinear` and `ProgressCircular` public components.