# Signature Pad

## Upstream docs

- Ark UI: https://ark-ui.com/docs/components/signature-pad
- Zag API: https://zagjs.com/api/mdx/components/react/signature-pad

## Purpose

`SignaturePad` lets users draw handwritten signatures with pointer or touch input.

## Upstream model to preserve

The wrapper follows Ark UI `SignaturePad` exactly: `Root` or `RootProvider` owns the Zag state machine, `Control` is the focusable drawing area, `Segment` renders the SVG and Ark's internal `segmentPath` nodes, `Guide` renders the baseline, and `ClearTrigger` clears the current paths. The root renders Ark's hidden form input internally.

Preserve Ark callback detail objects for `onDraw(details)` and `onDrawEnd(details)`. `onDrawEnd` exposes `details.getDataUrl(type, quality?)` for PNG, JPEG, or SVG previews.

## Current behavior contract

`SignaturePad` is the styled alias for `SignaturePad.Root`. It supports all Ark root props, including `defaultPaths`, controlled `paths`, `drawing`, `name`, `disabled`, `readOnly`, `required`, `ids`, `translations`, `onDraw`, and `onDrawEnd`.

`useSignaturePad()` with `SignaturePad.RootProvider` is exported for state that must be created outside the rendered tree. `useSignaturePadContext()` is exported for advanced in-tree state reads.

`Root` and `RootProvider` serialize paths with `paths.join(' ')` and render the native form input automatically. Pass `getFormValue(paths)` when form data needs another representation.

## Anatomy and exported parts

```tsx
SignaturePad / SignaturePad.Root
├─ SignaturePad.Label
├─ SignaturePad.Canvas (moduix sugar)
│  └─ SignaturePad.Control
│     ├─ SignaturePad.Segment
│     ├─ SignaturePad.ClearTrigger
│     └─ SignaturePad.Guide
└─ native input (automatic)

SignaturePad.RootProvider
└─ same part tree connected to useSignaturePad()
```

| Part                                 | Stable hook                               | Notes                                                       |
| ------------------------------------ | ----------------------------------------- | ----------------------------------------------------------- |
| `SignaturePad` / `SignaturePad.Root` | `data-slot="signature-pad-root"`          | Root state, ids, form name, drawing options, and callbacks. |
| `SignaturePad.RootProvider`          | `data-slot="signature-pad-root-provider"` | Renders from `useSignaturePad()` state.                     |
| `SignaturePad.Label`                 | `data-slot="signature-pad-label"`         | Ark label linked to the hidden input and drawing control.   |
| `SignaturePad.Canvas`                | -                                         | Fixed `Control`, `Segment`, `ClearTrigger`, and `Guide`.    |
| `SignaturePad.Control`               | `data-slot="signature-pad-control"`       | Focusable drawing region with `role="application"`.         |
| `SignaturePad.Segment`               | `data-slot="signature-pad-segment"`       | SVG paths for saved and current strokes.                    |
| `SignaturePad.Guide`                 | `data-slot="signature-pad-guide"`         | Non-interactive baseline.                                   |
| `SignaturePad.ClearTrigger`          | `data-slot="signature-pad-clear-trigger"` | Native button hidden by Ark while empty or drawing.         |

## Composition

```tsx
import { SignaturePad } from '@moduix/react';

export function SignaturePadDemo() {
  return (
    <SignaturePad>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}
```

## Upstream feature coverage

- Basic drawing, touch/pointer input, clear trigger, and SVG path rendering are direct Ark behavior.
- Image preview is supported through `onDrawEnd(details)` and `details.getDataUrl('image/png' | 'image/jpeg' | 'image/svg+xml', quality?)`.
- Controlled state uses `paths` with `onDraw(details)`; uncontrolled state uses `defaultPaths`.
- `drawing` forwards Zag stroke options: `fill`, `size`, and `simulatePressure`. If `drawing.fill` is not set, moduix CSS supplies the default stroke color.
- Form usage uses `name`, `required`, and the automatic native input. Pass `getFormValue(paths)` when the form needs a custom serialization.
- `Field.Root` context carries `disabled`, `required`, `readOnly`, and shared ids into `SignaturePad`. `Field` invalid state controls helper/error messaging and native-input descriptions, but Ark does not add `data-invalid` to signature pad parts.
- `Fieldset.Root` disabled state reaches `SignaturePad` through nested `Field.Root`, matching Ark's field/fieldset model. Set required, read-only, and invalid messaging state on `Field.Root` when those states belong to one signature field.
- `RootProvider`, `useSignaturePad()`, and `useSignaturePadContext()` are exported from moduix.

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

The default drawing control is `17.5rem` by `10rem`, which is approximately `280px` by `160px` with the default token scale. The default shadow is `var(--moduix-shadow-sm)`.

`ClearTrigger` composes the shared `CloseButton` by default and uses the reset `RotateCcwIcon`.
Ark remains the source of its translated accessible label and its disabled/hidden state.

All `--moduix-signature-pad-*` variables used by `SignaturePad.module.css` are declared in `src/lib/moduix/styles/theme.css` so IDEs can resolve the public styling surface. The most common overrides are `--moduix-signature-pad-width`, `--moduix-signature-pad-height`, `--moduix-signature-pad-control-width`, `--moduix-signature-pad-control-height`, `--moduix-signature-pad-stroke-color`, `--moduix-signature-pad-bg`, `--moduix-signature-pad-border-color`, `--moduix-signature-pad-radius`, `--moduix-signature-pad-guide-color`, and `--moduix-signature-pad-clear-trigger-*`.

The guide line and clear action use logical inline positioning, so their layout follows RTL text flow.

## Intentional sugar and differences from upstream

moduix adds styled defaults, stable `data-slot` hooks, and `Canvas` for the fixed default drawing surface. The default clear control uses the shared `CloseButton`; use the exported Ark-shaped parts for custom structure, icons, or `asChild` composition. It does not rename Ark props, convert callback signatures, or add local state.

The CSS default stroke color applies only when `drawing.fill` is not provided; explicit Ark `drawing.fill` remains the source of truth.

## Agent notes

Keep `getFormValue(paths)` as the semantic serialization escape hatch. Do not replace `paths`/`onDraw` with a local `value` abstraction. Do not use CSS variables inside `drawing.fill`; Zag requires a concrete CSS color string there.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-19: Switched guide and clear-action positioning to logical inline properties for RTL.
- 2026-07-17: Composed the default clear control with `CloseButton`, preserving Ark translations,
  states, and custom composition while mapping signature-pad tokens to the shared styles.

- 2026-07-13: Rendered the native form input automatically and added `getFormValue(paths)` for
  custom signature serialization.

- 2026-07-11: Added `Canvas` as the recommended fixed drawing surface and re-exported `useSignaturePadContext()` for form and in-tree state usage.
- 2026-06-27: Tightened the Field form contract, documented `segmentPath` data attributes, and
  aligned the default shadow token.
- 2026-06-22: Added the initial Ark-backed `SignaturePad` wrapper, CSS Module defaults, exports, stories, docs, and registry metadata.