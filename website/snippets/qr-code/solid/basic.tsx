import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';

export default function QrCodeDemo() {
  return (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame role="img" aria-label="QR code for moduix QR Code documentation">
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
  );
}
