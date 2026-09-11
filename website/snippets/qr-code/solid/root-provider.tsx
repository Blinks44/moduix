import { QrCode, useQrCode } from '@moduix/solid/qr-code';

export default function RootProviderQrCodeDemo() {
  const qrCode = useQrCode({
    value: 'https://moduix.dev/docs/qr-code',
  });

  return (
    <QrCode.RootProvider value={qrCode}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Context>
        {(context) => <output>Encoded URL: {context().value}</output>}
      </QrCode.Context>
    </QrCode.RootProvider>
  );
}