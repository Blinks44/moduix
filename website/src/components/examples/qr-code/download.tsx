import { QrCode } from '@moduix/react/qr-code';

export default function DownloadQrCodeDemo() {
  return (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCode.Frame role="img" aria-label="QR code for moduix QR Code documentation">
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download QR code (PNG)
      </QrCode.DownloadTrigger>
    </QrCode>
  );
}