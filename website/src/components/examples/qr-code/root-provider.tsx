import { QrCodeFrame, QrCodePattern, QrCodeRootProvider, useQrCode } from '@moduix/react/qr-code';
import { Stack } from '@moduix/react/stack';

export default function RootProviderQrCodeDemo() {
  const qrCode = useQrCode({
    value: 'https://moduix.dev/docs/qr-code',
  });
  return (
    <Stack align="center" gap="3">
      <QrCodeRootProvider value={qrCode}>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCodeRootProvider>
      <div data-preview-meta>
        <output>Encoded URL: {qrCode.value}</output>
      </div>
    </Stack>
  );
}