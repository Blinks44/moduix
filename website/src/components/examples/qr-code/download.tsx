import { QrCode, QrCodeDownloadTrigger, QrCodeFrame, QrCodePattern } from '@moduix/react/qr-code';

export default function DownloadQrCodeDemo() {
  return (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame role="img" aria-label="QR code for moduix QR Code documentation">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download QR code (PNG)
      </QrCodeDownloadTrigger>
    </QrCode>
  );
}