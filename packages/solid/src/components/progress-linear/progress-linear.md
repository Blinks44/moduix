# ProgressLinear (Solid)

`ProgressLinear` shows determinate or indeterminate progress in a horizontal or vertical bar.
It is the native Solid wrapper around Ark UI Solid Progress.

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/progress-linear
- Chakra UI: https://chakra-ui.com/docs/components/progress

## Public contract

`ProgressLinear` is the styled root component. It does not
automatically render labels, value text, tracks, or ranges. Compose the parts explicitly:

```tsx
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '@moduix/solid/progress-linear';

export function ExportProgress() {
  return (
    <ProgressLinear defaultValue={24}>
      <ProgressLinearLabel>Export data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Export data">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  );
}
```

The package exports `ProgressLinear`, `ProgressLinearRootProvider`, `ProgressLinearContext`,
`ProgressLinearLabel`, `ProgressLinearValueText`, `ProgressLinearTrack`,
`ProgressLinearRange`, `ProgressLinearView`, `useProgress`, and `useProgressContext`
as direct values.

`defaultValue` and `value` support uncontrolled and controlled progress. Use `null` for
indeterminate progress. `min`, `max`, `formatOptions`, `locale`, `translations`, `ids`,
`orientation`, `onValueChange(details)`, and other Ark root props pass through unchanged.

`ProgressLinearRootProvider` accepts the accessor returned by `useProgress()`:

```tsx
function ProviderProgress() {
  const progress = useProgress({ defaultValue: 58 });

  return (
    <ProgressLinearRootProvider value={progress}>
      <ProgressLinearTrack aria-label="Team rollout">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinearRootProvider>
  );
}
```

`ProgressLinearContext` and `useProgressContext()` expose accessor-based Solid state. Read values as
`state().value` and `state().valueAsString` inside a render function.

## Anatomy and styling

```text
ProgressLinear
├─ ProgressLinearLabel
├─ ProgressLinearValueText
├─ ProgressLinearTrack
│  └─ ProgressLinearRange
└─ ProgressLinearView

ProgressLinearRootProvider
└─ same part tree connected to useProgress()
```

The wrapper adds `progress-linear-*` `data-slot` hooks and the same CSS Module as the React
component. Ark retains `data-scope="progress"`, `data-part`, `data-state`, `data-value`,
`data-max`, `data-orientation`, generated IDs, runtime variables, and progressbar ARIA attributes.

Public styling variables use the `--moduix-progress-linear-*` prefix. Horizontal ranges use Ark's
inline `width`; vertical ranges use inline `height`. Set
`--moduix-progress-linear-height` for a vertical progress bar when the default height does not fit.
Indeterminate animation, RTL direction, and reduced-motion behavior are preserved.

`ProgressLinearTrack` receives `role="progressbar"` and its ARIA value attributes from Ark. Give it an
`aria-label` or `aria-labelledby`; the visual `ProgressLinearLabel` alone does not name the progressbar.

## Solid-specific composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<ProgressLinear
  asChild={(props) => <section {...props()} aria-label="Export status" />}
  defaultValue={70}
>
  <ProgressLinearTrack aria-label="Export status">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>
```

The installed Ark Solid primitive does not forward refs through an `asChild` render function.
Ordinary refs and custom-host composition are supported as separate native paths; this does not
change ordinary part ref forwarding.