import { QrCode } from '@moduix/solid/qr-code';

const fills = [
  { label: 'Primary', color: 'var(--moduix-color-primary)' },
  { label: 'Danger', color: 'var(--moduix-color-destructive)' },
];

export default function FillQrCodeDemo() {
  return (
    <>
      {fills.map((fill) => (
        <QrCode defaultValue="https://moduix.dev/docs/qr-code">
          <QrCode.Frame
            style={`color: ${fill.color}`}
            role="img"
            aria-label={`${fill.label} QR code`}
          >
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode>
      ))}
    </>
  );
}