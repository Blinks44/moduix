import { QrCode } from '@moduix/react';

export default function QrCodeDemo() {
  return (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code" className="qr-code-root">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode>
  );
}