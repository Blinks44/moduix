import { QrCode } from '@moduix/react';

const fills = [
  {
    label: 'Primary',
    className: 'qr-code-primary',
  },
  {
    label: 'Danger',
    className: 'qr-code-danger',
  },
];

export default function FillQrCodeDemo() {
  return (
    <div className="qr-code-grid">
      {fills.map((fill) => (
        <QrCode key={fill.label} defaultValue="https://moduix.dev/docs/qr-code">
          <QrCode.Frame className={fill.className}>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode>
      ))}
    </div>
  );
}