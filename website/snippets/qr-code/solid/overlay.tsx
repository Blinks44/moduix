import { QrCode } from '@moduix/solid/qr-code';

export default function OverlayQrCodeDemo() {
  return (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay>MX</QrCode.Overlay>
    </QrCode>
  );
}