import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';

const fills = [
  { label: 'Primary', color: 'var(--moduix-primary)' },
  { label: 'Danger', color: 'var(--moduix-destructive)' },
];

export default function FillQrCodeDemo() {
  return (
    <>
      {fills.map((fill) => (
        <QrCode defaultValue="https://moduix.dev/docs/qr-code">
          <QrCodeFrame
            style={`color: ${fill.color}`}
            role="img"
            aria-label={`${fill.label} QR code`}
          >
            <QrCodePattern />
          </QrCodeFrame>
        </QrCode>
      ))}
    </>
  );
}