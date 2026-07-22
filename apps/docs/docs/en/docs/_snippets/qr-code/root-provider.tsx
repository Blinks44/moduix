import { QrCode, useQrCode } from '@moduix/react';

export default function RootProviderQrCodeDemo() {
  const qrCode = useQrCode({
    value: 'https://moduix.dev/docs/qr-code',
  });
  return (
    <div className="qr-code-stack">
      <QrCode.RootProvider value={qrCode}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.RootProvider>
      <output className="qr-code-status">{qrCode.value}</output>
    </div>
  );
}