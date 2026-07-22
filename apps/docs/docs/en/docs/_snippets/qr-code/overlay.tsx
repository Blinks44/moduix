import { QrCode } from '@moduix/react';

export default function OverlayQrCodeDemo() {
  return (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCode.Frame className="qr-code-brand">
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay className="qr-code-overlay">MX</QrCode.Overlay>
    </QrCode>
  );
}