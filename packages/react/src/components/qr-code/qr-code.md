# QrCode

Upstream (accessed 2026-10-18):

- Ark UI: https://ark-ui.com/docs/components/qr-code
- Chakra UI: https://chakra-ui.com/docs/components/qr-code
- shadcn/ui: no QR code component

| Source    | Useful difference                                                               | moduix decision                                                                                                                        |
| --------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Ark UI    | Root, Frame, Pattern, Overlay, DownloadTrigger, RootProvider; unstyled          | **Required correctness:** keep every part, Ark state, and callback details.                                                            |
| Chakra UI | `size` (`2xs`–`2xl`, `full`), `fill` prop, overlay sized to a third of the code | **Adopted:** overlay size. **Rejected for now:** `size` and `fill` props; `--moduix-qr-code-size` and a class on the frame cover them. |
| shadcn/ui | None                                                                            | **Intentional difference:** moduix publishes its own registry item.                                                                    |

## Purpose

`QrCode` renders a QR code as an Ark UI-generated SVG with an optional centered overlay and a
download button.

## Current behavior contract

- Ark owns value state (`value`, `defaultValue`, `onValueChange(details)`), `encoding`
  (`ecc: 'L' | 'M' | 'Q' | 'H'`, `boostEcc`), `pixelSize`, `id`, and `ids`.
- `QrCodeDownloadTrigger` is a native `button` that downloads the current frame; `fileName` and
  `mimeType` are required, `quality` is optional. `asChild` is preserved on every part.
- `QrCodeRootProvider` connects the parts to `useQrCode()` state; `QrCodeContext` and
  `useQrCodeContext()` read state below a root or provider.
- The frame is visual content: add `role="img"` and an `aria-label` when the code conveys
  information, or `aria-hidden="true"` when adjacent text already does.
- Exports the Ark part, details, and hook types.

## Anatomy

```text
QrCode / QrCodeRootProvider  data-slot="qr-code-root[-provider]"
├─ QrCodeFrame               data-slot="qr-code-frame"
│  └─ QrCodePattern          data-slot="qr-code-pattern"
├─ QrCodeOverlay             data-slot="qr-code-overlay"
└─ QrCodeDownloadTrigger     data-slot="qr-code-download-trigger"
```

## Defaults and styling

- The root is a one-column inline grid, `min(var(--moduix-qr-code-size, 8rem), 100%)` wide; the
  frame fills that width, so a long trigger label cannot enlarge the code. The root inherits text
  color, and the frame fills the modules with `currentColor`.
- Ark positions `QrCodeOverlay` absolutely at 50%/50% of its containing block. The overlay is placed
  in the first grid cell (`grid-area: 1 / 1 / 2 / 2`), so it stays centered on the frame when a
  download trigger or other content follows. Keep `QrCodeFrame` the first child.
- The overlay is a square one third of the frame width (like Chakra UI), so it scales with
  `--moduix-qr-code-size`; it has a background and padding, and images and SVGs inside it are
  contained. Use `encoding={{ ecc: 'H' }}` when it covers part of the code.
- The download trigger looks like an outline Button `md` with hover, focus-visible, pressed
  opacity, and disabled states.
- CSS Modules expose only `--moduix-qr-code-size`. Everything else comes from foundation tokens;
  override it with a class on the part. Ark sets `--qrcode-pixel-size`, `--qrcode-width`, and
  `--qrcode-height` on the root.

## Composition

```tsx
<QrCode defaultValue="https://moduix.dev/docs/qr-code" encoding={{ ecc: 'H' }}>
  <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
    <QrCodePattern />
  </QrCodeFrame>
  <QrCodeOverlay>MX</QrCodeOverlay>
  <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
    Download
  </QrCodeDownloadTrigger>
</QrCode>
```

## Agent notes

Keep `QrCodeFrame` and `QrCodePattern` explicit; do not add a closed single-component render path.
Do not remap Ark callback details or wrap Ark state. When changing styling hooks or CSS variables,
update docs examples, this file, `variables-moduix.css`, and the registry output.