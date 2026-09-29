# ProgressLinear (Vue)

`ProgressLinear` shows determinate or indeterminate progress in a horizontal or vertical bar.
It is the native Vue wrapper around Ark UI Vue Progress.

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/progress-linear

## Purpose

Use the component for a task whose progress should be communicated through an accessible linear
progressbar.

## Public contract

`ProgressLinear` is the styled root component. It does not render labels, value text, tracks, or
ranges automatically. Compose the parts explicitly:

```vue
<script setup lang="ts">
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearTrack,
  ProgressLinearValueText,
} from '@moduix/vue/progress-linear';
</script>

<template>
  <ProgressLinear :default-value="24">
    <ProgressLinearLabel>Export data</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Export data">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
</template>
```

The package exports `ProgressLinear`, `ProgressLinearRootProvider`, `ProgressLinearContext`,
`ProgressLinearLabel`, `ProgressLinearValueText`, `ProgressLinearTrack`, `ProgressLinearRange`,
`ProgressLinearView`, `useProgress`, and `useProgressContext` as direct values.

Ark root props pass through unchanged, including `defaultValue`, `modelValue`/`v-model`, `min`,
`max`, `formatOptions`, `locale`, `translations`, `ids`, `orientation`, and `asChild`.
Use `null` for indeterminate progress. `ProgressLinearRootProvider` accepts the store returned by
`useProgress()`:

```vue
<script setup lang="ts">
import {
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  useProgress,
} from '@moduix/vue/progress-linear';

const progress = useProgress({ defaultValue: 58 });
</script>

<template>
  <ProgressLinearRootProvider :value="progress">
    <ProgressLinearTrack aria-label="Team rollout">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinearRootProvider>
</template>
```

`ProgressLinearContext` is the direct Ark context component and exposes the current state through a
Vue scoped slot. `useProgressContext()` exposes the same state to setup code.

## Preservation notes

- Keep the explicit Ark anatomy, `asChild` composition, refs, generated IDs, state strings, and
  `data-scope`/`data-part` attributes intact.
- Preserve `defaultValue`, controlled `v-model`, `null` indeterminate state, bounds, formatting,
  translations, orientation, and `ProgressLinearRootProvider` behavior.
- Preserve Vue fallthrough attributes and events through each wrapper. Consumer classes are merged
  after moduix classes.
- `ProgressLinearValueText` must keep Ark's fallback when it has no slot and render the consumer
  slot when one is provided.
- `ProgressLinearView` requires an explicit `state` of `indeterminate`, `loading`, or `complete`.
- Verify server rendering and hydration because Ark generates IDs for the progress anatomy.

## Styling and accessibility

The CSS Modules wrapper adds `progress-linear-*` `data-slot` hooks and the
`--moduix-progress-linear-*` variables. `ProgressLinearTrack` receives `role="progressbar"` and
its ARIA value attributes from Ark; pass `aria-label` or `aria-labelledby` because the visual
`ProgressLinearLabel` is not automatically the accessible name.

Vertical ranges use Ark's inline `height`; horizontal ranges use inline `width`. Preserve Ark
state, orientation, RTL, reduced-motion, and indeterminate animation behavior.

## Vue-specific composition

Use `class` and native Vue slots. Use `v-model` when the parent owns the current value and update
that ref from the controlling source. Template refs on wrapper instances resolve to Ark's forwarded
host element.

The installed Ark Vue 5.39.2 `ProgressRoot` declaration includes `valueChange` and
`update:modelValue`, but its runtime currently does not pass the component emit function into
`useProgress`. Do not add a local state layer or event reimplementation to compensate; keep the
wrapper on the direct Ark primitive until the upstream implementation is corrected.

## Differences from upstream

The wrapper gives the linear anatomy a focused `ProgressLinear*` flat public surface and adds
moduix classes and `data-slot` hooks. It does not expose namespace objects, `Component.Root`
aliases, compatibility aliases, or circular progress parts.

## Local changelog

- 2026-09-29: Added the native Vue CSS Modules ProgressLinear adapter with flat exports, Vue
  stories, registry source, localized snippets, and SSR/hydration coverage.