import { QrCodeFrame, QrCodePattern, QrCodeRootProvider, useQrCode } from '@moduix/solid/qr-code';

export default function RootProviderQrCodeDemo() {
  const qrCode = useQrCode({
    value: 'https://moduix.dev/docs/qr-code',
  });

  return (
    <>
      <QrCodeRootProvider value={qrCode}>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCodeRootProvider>
      <output>Encoded URL: {qrCode().value}</output>
    </>
  );
}