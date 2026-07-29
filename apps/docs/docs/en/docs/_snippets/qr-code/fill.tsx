import { QrCode } from '@moduix/react';

const fills = [
  {
    label: 'Primary',
    fill: 'var(--moduix-color-primary)',
  },
  {
    label: 'Danger',
    fill: 'var(--moduix-color-destructive)',
  },
];

export default function FillQrCodeDemo() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, max-content))',
        gap: 'var(--moduix-spacing-4)',
      }}
    >
      {fills.map((fill) => (
        <QrCode key={fill.label} defaultValue="https://moduix.dev/docs/qr-code">
          <QrCode.Frame style={{ fill: fill.fill }}>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode>
      ))}
    </div>
  );
}