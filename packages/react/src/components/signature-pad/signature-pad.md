# SignaturePad

## Upstream docs

- Ark UI: https://ark-ui.com/docs/components/signature-pad
- Zag API: https://zagjs.com/api/mdx/components/react/signature-pad

## Purpose

`SignaturePad` lets users draw handwritten signatures with pointer or touch input.

## Upstream model to preserve

The wrapper follows Ark UI `SignaturePad` exactly: `Root` or `RootProvider` owns the Zag state machine, `Control` is the focusable drawing area, `Segment` renders the SVG and Ark's internal `segmentPath` nodes, `Guide` renders the baseline, `ClearTrigger` clears the current paths, and `HiddenInput` carries native form submission when it is rendered with a `value` and the root has `name`.

Preserve Ark callback detail objects for `onDraw(details)` and `onDrawEnd(details)`. `onDrawEnd` exposes `details.getDataUrl(type, quality?)` for PNG, JPEG, or SVG previews.

## Current behavior contract

`SignaturePad` is the styled alias for `SignaturePad.Root`. It supports all Ark root props, including `defaultPaths`, controlled `paths`, `drawing`, `name`, `disabled`, `readOnly`, `required`, `ids`, `translations`, `onDraw`, and `onDrawEnd`.

`useSignaturePad()` with `SignaturePad.RootProvider` is exported for state that must be created outside the rendered tree. For advanced in-tree state reads, import `useSignaturePadContext()` directly from `@ark-ui/react/signature-pad`.

For native form submission, render `SignaturePad.HiddenInput value={...}` inside the same tree. `name` only gives the hidden input its form field name; it does not create a native value without `HiddenInput`.

## Anatomy and exported parts

```tsx
SignaturePad / SignaturePad.Root
├─ SignaturePad.Label
├─ SignaturePad.Control
│  ├─ SignaturePad.Segment
│  ├─ SignaturePad.ClearTrigger
│  └─ SignaturePad.Guide
└─ SignaturePad.HiddenInput

SignaturePad.RootProvider
└─ same part tree connected to useSignaturePad()
```

| Part                                 | Stable hook                               | Notes                                                       |
| ------------------------------------ | ----------------------------------------- | ----------------------------------------------------------- |
| `SignaturePad` / `SignaturePad.Root` | `data-slot="signature-pad-root"`          | Root state, ids, form name, drawing options, and callbacks. |
| `SignaturePad.RootProvider`          | `data-slot="signature-pad-root-provider"` | Renders from `useSignaturePad()` state.                     |
| `SignaturePad.Label`                 | `data-slot="signature-pad-label"`         | Ark label linked to the hidden input and drawing control.   |
| `SignaturePad.Control`               | `data-slot="signature-pad-control"`       | Focusable drawing region with `role="application"`.         |
| `SignaturePad.Segment`               | `data-slot="signature-pad-segment"`       | SVG paths for saved and current strokes.                    |
| `SignaturePad.Guide`                 | `data-slot="signature-pad-guide"`         | Non-interactive baseline.                                   |
| `SignaturePad.ClearTrigger`          | `data-slot="signature-pad-clear-trigger"` | Native button hidden by Ark while empty or drawing.         |
| `SignaturePad.HiddenInput`           | `data-slot="signature-pad-hidden-input"`  | Native form value when rendered with a `value`.             |

## Composition

```tsx
import { RotateCcwIcon, SignaturePad } from '@moduix/react';

export function SignaturePadDemo() {
  return (
    <SignaturePad>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger>
          <RotateCcwIcon aria-hidden="true" />
        </SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
    </SignaturePad>
  );
}
```

## Upstream feature coverage

- Basic drawing, touch/pointer input, clear trigger, and SVG path rendering are direct Ark behavior.
- Image preview is supported through `onDrawEnd(details)` and `details.getDataUrl('image/png' | 'image/jpeg' | 'image/svg+xml', quality?)`.
- Controlled state uses `paths` with `onDraw(details)`; uncontrolled state uses `defaultPaths`.
- `drawing` forwards Zag stroke options: `fill`, `size`, and `simulatePressure`. If `drawing.fill` is not set, moduix CSS supplies the default stroke color.
- Form usage uses `name`, `required`, and `HiddenInput`; render `HiddenInput value={...}` when the form needs a native value.
- `Field.Root` context carries `disabled`, `required`, `readOnly`, and shared ids into `SignaturePad`. `Field` invalid state controls helper/error messaging and `HiddenInput` descriptions, but Ark does not add `data-invalid` to signature pad parts.
- `Fieldset.Root` disabled state reaches `SignaturePad` through nested `Field.Root`, matching Ark's field/fieldset model. Set required, read-only, and invalid messaging state on `Field.Root` when those states belong to one signature field.
- `RootProvider` and `useSignaturePad()` are exported. Import advanced context helpers directly from Ark when needed.

## Accessibility and state

Ark gives `Control` a focusable drawing surface with `role="application"`, `aria-roledescription="signature pad"`, `aria-label` from `translations.control`, and pointer capture during drawing. `ClearTrigger` is a native button with its accessible label from `translations.clearTrigger`.

Data attributes from Ark:

- `Root`: `data-scope="signature-pad"`, `data-part="root"`, `data-disabled`
- `Label`: `data-scope="signature-pad"`, `data-part="label"`, `data-disabled`, `data-required`
- `Control`: `data-scope="signature-pad"`, `data-part="control"`, `data-disabled`
- `Segment`: `data-scope="signature-pad"`, `data-part="segment"`
- `Segment` child paths: `data-scope="signature-pad"`, `data-part="segment-path"`
- `Guide`: `data-scope="signature-pad"`, `data-part="guide"`, `data-disabled`
- `ClearTrigger`: `data-scope="signature-pad"`, `data-part="clear-trigger"`

## Defaults and styling

Every styled part accepts `className`, merged with moduix defaults through `clsx` and `normalizeClassName`. Component CSS uses flat CSS Module selectors and Ark data attributes.

The default drawing control is `17.5rem` by `10rem`, which is approximately `280px` by `160px` with the default token scale. The default shadow is `var(--shadow-xs)`.

All `--signature-pad-*` variables used by `SignaturePad.module.css` are declared in `src/lib/moduix/styles/theme.css` so IDEs can resolve the public styling surface. The most common overrides are `--signature-pad-width`, `--signature-pad-height`, `--signature-pad-control-width`, `--signature-pad-control-height`, `--signature-pad-stroke-color`, `--signature-pad-bg`, `--signature-pad-border-color`, `--signature-pad-radius`, `--signature-pad-guide-color`, and `--signature-pad-clear-trigger-*`.

## Intentional sugar and differences from upstream

moduix adds styled defaults and stable `data-slot` hooks. It does not rename Ark props, convert callback signatures, add local state, or hide the Ark composition model.

The CSS default stroke color applies only when `drawing.fill` is not provided; explicit Ark `drawing.fill` remains the source of truth.

## Agent notes

Keep `HiddenInput` available even when examples omit it. Do not replace `paths`/`onDraw` with a local `value` abstraction. Do not use CSS variables inside `drawing.fill`; Zag requires a concrete CSS color string there.

## Local changelog

- 2026-07-03: Kept `RootProvider` and `useSignaturePad()`, removed moduix re-exports of Ark context APIs and Ark type aliases, and documented direct Ark imports for advanced state reads.
- 2026-06-27: Tightened the Field/HiddenInput contract, documented `segmentPath` data attributes, and aligned the default shadow token.
- 2026-06-22: Added the initial Ark-backed `SignaturePad` wrapper, CSS Module defaults, exports, stories, docs, and registry metadata.