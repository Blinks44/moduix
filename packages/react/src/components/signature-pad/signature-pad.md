# Signature Pad

## Upstream docs

- Ark UI: https://ark-ui.com/docs/components/signature-pad (accessed 2026-08-12)
- Zag API: https://zagjs.com/api/mdx/components/react/signature-pad (accessed 2026-08-12)
- Chakra UI component index: https://www.chakra-ui.com/docs/components/concepts/overview (accessed
  2026-08-12; no Signature Pad component)
- shadcn/ui component index: https://ui.shadcn.com/docs/components (accessed 2026-08-12; no
  Signature Pad component)

## Upstream comparison

| Difference                                                     | Classification         | Decision                                                                      |
| -------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------- |
| Ark exposes the full part tree and `SignaturePadRootProvider`. | Required correctness   | Preserve every part, hook, callback detail object, and provider path.         |
| Ark's read-only clear trigger can still clear paths.           | Required correctness   | Disable the moduix clear trigger in read-only state to prevent data loss.     |
| Ark requires consumers to repeat the standard drawing tree.    | Consumer friction      | Keep `SignaturePadCanvas` as narrow sugar and forward control props and refs. |
| Chakra UI and shadcn/ui do not ship a matching component.      | Intentional difference | Keep the Ark-shaped moduix contract; do not invent parity APIs.               |

## Purpose

`SignaturePad` lets users draw handwritten signatures with pointer or touch input.

## Upstream model to preserve

The wrapper follows Ark UI `SignaturePad` exactly: `SignaturePad` or `SignaturePadRootProvider` owns the Zag state machine, `SignaturePadControl` is the focusable drawing area, `SignaturePadSegment` renders the SVG and Ark's internal `segmentPath` nodes, `SignaturePadGuide` renders the baseline, and `SignaturePadClearTrigger` clears the current paths. `SignaturePadHiddenInput` is composed explicitly.

Preserve Ark callback detail objects for `onDraw(details)` and `onDrawEnd(details)`. `onDrawEnd` exposes `details.getDataUrl(type, quality?)` for PNG, JPEG, or SVG previews.

## Current behavior contract

`SignaturePad` is the styled root component. It supports all Ark root props, including `defaultPaths`, controlled `paths`, `drawing`, `name`, `disabled`, `readOnly`, `required`, `ids`, `translations`, `onDraw`, and `onDrawEnd`.

`useSignaturePad()` with `SignaturePadRootProvider` is exported for state that must be created outside the rendered tree. `useSignaturePadContext()` is exported for advanced in-tree state reads.

Compose `SignaturePadHiddenInput` explicitly and pass its required serialized `value`. Use
`useSignaturePadContext()` inside the root when the value should follow the current paths.

## Anatomy and exported parts

```tsx
SignaturePad
├─ SignaturePadLabel
├─ SignaturePadCanvas (moduix sugar)
│  └─ SignaturePadControl
│     ├─ SignaturePadSegment
│     ├─ SignaturePadClearTrigger
│     └─ SignaturePadGuide
└─ SignaturePadHiddenInput value={serializedPaths} (explicit)

SignaturePadRootProvider
└─ same part tree connected to useSignaturePad()
```

| Part                       | Stable hook                               | Notes                                                       |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `SignaturePad`             | `data-slot="signature-pad-root"`          | Root state, ids, form name, drawing options, and callbacks. |
| `SignaturePadRootProvider` | `data-slot="signature-pad-root-provider"` | Renders from `useSignaturePad()` state.                     |
| `SignaturePadLabel`        | `data-slot="signature-pad-label"`         | Ark label linked to the hidden input and drawing control.   |
| `SignaturePadCanvas`       | `data-slot="signature-pad-control"`       | Fixed drawing tree; forwards control props and refs.        |
| `SignaturePadControl`      | `data-slot="signature-pad-control"`       | Focusable drawing region with `role="application"`.         |
| `SignaturePadSegment`      | `data-slot="signature-pad-segment"`       | SVG paths for saved and current strokes.                    |
| `SignaturePadGuide`        | `data-slot="signature-pad-guide"`         | Non-interactive baseline.                                   |
| `SignaturePadClearTrigger` | `data-slot="signature-pad-clear-trigger"` | Native button hidden by Ark while empty or drawing.         |

## Composition

```tsx
import { SignaturePad } from '@moduix/react/signature-pad';

export function SignaturePadDemo() {
  return (
    <SignaturePad>
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
    </SignaturePad>
  );
}
```

## Upstream feature coverage

- Basic drawing, touch/pointer input, clear trigger, and SVG path rendering are direct Ark behavior.
- Image preview is supported through `onDrawEnd(details)` and `details.getDataUrl('image/png' | 'image/jpeg' | 'image/svg+xml', quality?)`.
- Controlled state uses `paths` with `onDraw(details)`; uncontrolled state uses `defaultPaths`.
- `drawing` forwards Zag stroke options: `fill`, `size`, and `simulatePressure`. `drawing.fill` must be a valid CSS color string. If it is not set, moduix CSS supplies the default stroke color through `--moduix-signature-pad-stroke-color`.
- The installed Zag default is `{ size: 2, simulatePressure: false }`; pass `drawing` to opt into pressure simulation.
- Form usage combines Ark form props with an explicit `SignaturePadHiddenInput value={...}`.
- `Field` context carries `disabled`, `required`, `readOnly`, and shared ids into `SignaturePad`. `Field` invalid state controls helper/error messaging and native-input descriptions, but Ark does not add `data-invalid` to signature pad parts.
- `Fieldset` disabled state reaches `SignaturePad` through nested `Field`, matching Ark's field/fieldset model. Set required, read-only, and invalid messaging state on `Field` when those states belong to one signature field.
- `SignaturePadRootProvider`, `useSignaturePad()`, and `useSignaturePadContext()` are exported from moduix.

## Accessibility and state

Ark gives `SignaturePadControl` a focusable drawing surface with `role="application"`, `aria-roledescription="signature pad"`, `aria-label` from `translations.control`, and pointer capture during drawing. `SignaturePadClearTrigger` is a native button with its accessible label from `translations.clearTrigger`.

moduix disables `SignaturePadClearTrigger` when `readOnly` comes from the root, `Field`, or `useSignaturePad()`.
This closes an upstream data-loss gap while leaving programmatic `clear()` available to application code.

Data attributes from Ark:

- `SignaturePad`: `data-scope="signature-pad"`, `data-part="root"`, `data-disabled`
- `SignaturePadLabel`: `data-scope="signature-pad"`, `data-part="label"`, `data-disabled`, `data-required`
- `SignaturePadControl`: `data-scope="signature-pad"`, `data-part="control"`, `data-disabled`
- `SignaturePadSegment`: `data-scope="signature-pad"`, `data-part="segment"`
- `SignaturePadSegment` child paths: `data-scope="signature-pad"`, `data-part="segment-path"`
- `SignaturePadGuide`: `data-scope="signature-pad"`, `data-part="guide"`, `data-disabled`
- `SignaturePadClearTrigger`: `data-scope="signature-pad"`, `data-part="clear-trigger"`

## Defaults and styling

Every styled part accepts `className`, merged with moduix defaults through `clsx`. Component CSS uses flat CSS Module selectors and Ark data attributes. Disabled opacity is applied once at the root so nested labels, guides, and the default clear action remain legible.

The default drawing control is `17.5rem` by `10rem`, which is approximately `280px` by `160px` with the default token scale. Its default minimum height follows the configured control height, so reducing either public height variable also reduces the usable drawing area. The default shadow is `var(--moduix-shadow-sm)`.

`SignaturePadClearTrigger` composes the shared `CloseButton` by default and uses the reset `RotateCcwIcon`.
Ark remains the source of its translated accessible label and empty/drawing visibility. moduix also
disables the action in read-only state.

All `--moduix-signature-pad-*` variables used by `SignaturePad.module.css` are declared in `packages/foundation/src/styles/variables-moduix.css` so IDEs can resolve the public styling surface. The most common overrides are `--moduix-signature-pad-width`, `--moduix-signature-pad-height`, `--moduix-signature-pad-control-width`, `--moduix-signature-pad-control-height`, `--moduix-signature-pad-stroke-color`, `--moduix-signature-pad-bg`, `--moduix-signature-pad-border-color`, `--moduix-signature-pad-radius`, `--moduix-signature-pad-guide-color`, and `--moduix-signature-pad-clear-trigger-*`.

The guide line and clear action use logical inline positioning, so their layout follows RTL text flow.

## Intentional sugar and differences from upstream

moduix adds styled defaults, stable `data-slot` hooks, and `SignaturePadCanvas` for the fixed default drawing surface. The default clear control uses the shared `CloseButton`; use the exported Ark-shaped parts for custom structure, icons, or `asChild` composition. It does not rename Ark props, convert callback signatures, or add local state.

`SignaturePadCanvas` forwards `SignaturePadControl` props and its DOM ref. Its children remain fixed by design; use the
lower-level parts when the drawing tree itself needs to change.

The CSS default stroke color applies only when `drawing.fill` is not provided; explicit Ark `drawing.fill` remains the source of truth.

## Agent notes

Keep signature serialization in consumer composition rather than adding a wrapper-specific root prop.
Do not replace `paths`/`onDraw` with a local `value` abstraction. `drawing.fill` must be a valid CSS
color string. To use a CSS custom property for the stroke color, leave `drawing.fill` unset and
override `--moduix-signature-pad-stroke-color` instead.

## Local changelog

- 2026-08-12: Disabled clearing in read-only state, forwarded `SignaturePadCanvas` control props and refs, added
  state coverage, and aligned the documented Zag drawing defaults with runtime behavior.
- 2026-07-30: Made disabled opacity apply once across the composed drawing surface, aligned the height and minimum-height defaults, and clarified CSS-variable stroke colors.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-19: Switched guide and clear-action positioning to logical inline properties for RTL.
- 2026-07-17: Composed the default clear control with `CloseButton`, preserving Ark translations,
  states, and custom composition while mapping signature-pad tokens to the shared styles.

- 2026-09-04: Exposed Ark `SignaturePadHiddenInput` explicitly and removed automatic serialization and the
  wrapper-specific serializer prop.
- 2026-07-13: Native form input serialization lived in the root at this point in the wrapper history.

- 2026-07-11: Added `SignaturePadCanvas` as the recommended fixed drawing surface and re-exported `useSignaturePadContext()` for form and in-tree state usage.
- 2026-06-27: Tightened the Field form contract, documented `segmentPath` data attributes, and
  aligned the default shadow token.
- 2026-06-22: Added the initial Ark-backed `SignaturePad` wrapper, CSS Module defaults, exports, stories, docs, and registry metadata.