# QR Code (Solid)

`QrCode` is the native Solid wrapper around Ark UI QR Code. It exports the same flat public values as
the React adapter: `QrCode`, `QrCodeRootProvider`, `QrCodeContext`, `QrCodeFrame`, `QrCodePattern`,
`QrCodeOverlay`, and `QrCodeDownloadTrigger`. The contract includes QR generation, controlled values,
download options, ids, ARIA attributes, CSS hooks, and runtime variables.

## Composition

```tsx
import {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
  useQrCodeContext,
} from '@moduix/solid/qr-code';

export function QrCodeDemo() {
  return (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
  );
}
```

Use `QrCodeOverlay` with `encoding={{ ecc: 'H' }}` when central content covers part of the code.
`QrCodeDownloadTrigger` accepts Ark's required `fileName` and `mimeType` props and optional
`quality`.

## Provider and context

`useQrCode()` returns an accessor for the Ark QR API:

```tsx
const qrCode = useQrCode({ value: 'https://moduix.dev/docs/qr-code' });

<QrCodeRootProvider value={qrCode}>
  <QrCodeFrame>
    <QrCodePattern />
  </QrCodeFrame>
</QrCodeRootProvider>;
```

Read state with `useQrCodeContext()` or `QrCodeContext`; both expose the accessor as
`context().value`.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<QrCodeDownloadTrigger
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

## Local changelog

- 2026-09-22: Replaced the compound `QrCode.*` value surface with the shared flat API across the
  Solid CSS Modules and Tailwind adapters.
