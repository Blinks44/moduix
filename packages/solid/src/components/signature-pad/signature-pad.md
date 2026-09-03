# Signature Pad (Solid)

`SignaturePad` is the moduix Solid wrapper around Ark UI Signature Pad. It preserves the React
wrapper's compound anatomy, drawing lifecycle, callback details, accessibility behavior, form
serialization, CSS hooks, and `RootProvider` composition.

## Composition

```tsx
import { SignaturePad } from '@moduix/solid/signature-pad';

export function SignaturePadDemo() {
  return (
    <SignaturePad>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}
```

`SignaturePad.Canvas` is the recommended fixed drawing tree:

```tsx
<SignaturePad.Canvas />
```

Use `Control`, `Segment`, `ClearTrigger`, and `Guide` directly when the drawing tree needs to be
customized. `ClearTrigger` uses the moduix `CloseButton` and `RotateCcwIcon` by default.

The public parts are `Root`, `RootProvider`, `Context`, `Label`, `Control`, `Canvas`, `Segment`,
`Guide`, and `ClearTrigger`. The barrel also re-exports `useSignaturePad` and
`useSignaturePadContext`.

## Form serialization

`Root` and `RootProvider` render Ark's hidden input automatically. Paths use `paths.join(' ')` by
default; pass `getFormValue(paths)` to provide another representation:

```tsx
<SignaturePad name="signature" getFormValue={(paths) => JSON.stringify(paths)}>
  <SignaturePad.Label>Signature</SignaturePad.Label>
  <SignaturePad.Canvas />
</SignaturePad>
```

## Read-only behavior

`ClearTrigger` is disabled when `readOnly` comes from the root, `Field`, or
`useSignaturePad()`. This prevents data loss while leaving programmatic `clear()` available through
the Ark state API.

## Ark Solid behavior

Solid uses a render-function `asChild` prop:

```tsx
<SignaturePad asChild={(props) => <section {...props()} />}>
  <SignaturePad.Label>Sign below</SignaturePad.Label>
  <SignaturePad.Canvas />
</SignaturePad>
```

The installed Ark Solid primitive does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.

`useSignaturePad()` returns an accessor, so provider state is passed as `value={signaturePad}` and
read as `signaturePad().paths`. Ark owns drawing, pointer capture, SVG segment paths, ids, state
attributes, translations, and callback detail objects. `onDrawEnd(details)` exposes
`details.getDataUrl('image/png' | 'image/jpeg' | 'image/svg+xml', quality?)`.