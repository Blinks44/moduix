import { QrCode } from '@moduix/react';

export default function OverlayQrCodeDemo() {
  return (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCode.Frame style={{ fill: 'var(--moduix-color-primary)' }}>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay
        style={{
          fontSize: 'var(--moduix-text-xs)',
          fontWeight: 'var(--moduix-weight-semibold)',
          lineHeight: 'var(--moduix-line-height-text-xs)',
        }}
      >
        MX
      </QrCode.Overlay>
    </QrCode>
  );
}