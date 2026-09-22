import { QrCode, QrCodeFrame, QrCodeOverlay, QrCodePattern } from '@moduix/solid/qr-code';

export default function OverlayQrCodeDemo() {
  return (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay>MX</QrCodeOverlay>
    </QrCode>
  );
}
