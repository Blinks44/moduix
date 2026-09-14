# QR Code (Solid)

`QrCode` is the native Solid wrapper around Ark UI QR Code. It preserves the React component's
explicit `Root`, `RootProvider`, `Context`, `Frame`, `Pattern`, `Overlay`, and `DownloadTrigger`
surface, including QR generation, controlled values, download options, ids, ARIA attributes, CSS
hooks, and runtime variables.

## Composition

```tsx
import { QrCode } from '@moduix/solid/qr-code';

export function QrCodeDemo() {
  return (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCode.Frame role="img" aria-label="QR code for moduix documentation">
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode>
  );
}
```

Use `QrCode.Overlay` with `encoding={{ ecc: 'H' }}` when central content covers part of the code.
`QrCode.DownloadTrigger` accepts Ark's required `fileName` and `mimeType` props and optional
`quality`.

## Provider and context

`useQrCode()` returns an accessor for the Ark QR API:

```tsx
const qrCode = useQrCode({ value: 'https://moduix.dev/docs/qr-code' });

<QrCode.RootProvider value={qrCode}>
  <QrCode.Frame>
    <QrCode.Pattern />
  </QrCode.Frame>
</QrCode.RootProvider>;
```

Read state with `useQrCodeContext()` or `QrCode.Context`; both expose the accessor as
`context().value`.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<QrCode.DownloadTrigger
  asChild={(props) => (
    <a {...props()} href="#download">
      Download SVG
    </a>
  )}
  fileName="moduix-qr-code.svg"
  mimeType="image/svg+xml"
/>
```

The installed Ark Solid primitive does not forward refs through an `asChild` render function.
Ordinary refs and custom-host composition are supported as separate native paths.