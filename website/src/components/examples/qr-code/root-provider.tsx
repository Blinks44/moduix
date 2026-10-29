import { QrCodeFrame, QrCodePattern, QrCodeRootProvider, useQrCode } from '@moduix/react/qr-code';
import { Stack } from '@moduix/react/stack';
import { PreviewMeta } from '@/components/mdx/Components';

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
      <PreviewMeta>
        <output>Encoded URL: {qrCode.value}</output>
      </PreviewMeta>
    </Stack>
  );
}