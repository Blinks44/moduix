# Signature Pad (Solid)

`SignaturePad` is the moduix Solid wrapper around Ark UI Signature Pad. It preserves the React
wrapper's flat anatomy, drawing lifecycle, callback details, accessibility behavior, form
serialization, CSS hooks, and `SignaturePadRootProvider` composition.

## Composition

```tsx
import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@moduix/solid/signature-pad';

export function SignaturePadDemo() {
  return (
    <SignaturePad>
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
    </SignaturePad>
  );
}
```

`SignaturePadCanvas` is the recommended fixed drawing tree:

```tsx
<SignaturePadCanvas />
```

Use `SignaturePadControl`, `SignaturePadSegment`, `SignaturePadClearTrigger`, and
`SignaturePadGuide` directly when the drawing tree needs to be customized. `SignaturePadClearTrigger`
uses the moduix `CloseButton` and `RotateCcwIcon` by default.

The public parts are `SignaturePad`, `SignaturePadRootProvider`, `SignaturePadContext`,
`SignaturePadLabel`, `SignaturePadControl`, `SignaturePadCanvas`, `SignaturePadSegment`,
`SignaturePadGuide`, `SignaturePadClearTrigger`, and `SignaturePadHiddenInput`. The barrel also re-exports `useSignaturePad` and
`useSignaturePadContext`.

## Form serialization

Compose Ark's hidden input explicitly and pass its required serialized `value`:

```tsx
function SignaturePadFormInput() {
  const signaturePad = useSignaturePadContext();

  return <SignaturePadHiddenInput value={JSON.stringify(signaturePad().paths)} />;
}

<SignaturePad name="signature">
  <SignaturePadLabel>Signature</SignaturePadLabel>
  <SignaturePadCanvas />
  <SignaturePadFormInput />
</SignaturePad>;
```

## Read-only behavior

`SignaturePadClearTrigger` is disabled when `readOnly` comes from the root, `Field`, or
`useSignaturePad()`. This prevents data loss while leaving programmatic `clear()` available through
the Ark state API.

## Ark Solid behavior

Solid uses a render-function `asChild` prop:

```tsx
<SignaturePad asChild={(props) => <section {...props()} />}>
  <SignaturePadLabel>Sign below</SignaturePadLabel>
  <SignaturePadCanvas />
</SignaturePad>
```

The installed Ark Solid primitive does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.

`useSignaturePad()` returns an accessor, so provider state is passed as `value={signaturePad}` and
read as `signaturePad().paths`. Ark owns drawing, pointer capture, SVG segment paths, ids, state
attributes, translations, and callback detail objects. `onDrawEnd(details)` exposes
`details.getDataUrl('image/png' | 'image/jpeg' | 'image/svg+xml', quality?)`.