import { QrCode } from '@moduix/react';

export default function DownloadQrCodeDemo() {
  return (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code" className="qr-code-root">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCode.DownloadTrigger>
    </QrCode>
  );
}