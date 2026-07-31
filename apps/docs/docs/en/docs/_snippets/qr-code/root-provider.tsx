import { QrCode, useQrCode } from '@moduix/react/qr-code';
import { PreviewMeta } from '@/components/mdx/Components';

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
        {(context) => (
          <PreviewMeta>
            <output>Encoded URL: {context.value}</output>
          </PreviewMeta>
        )}
      </QrCode.Context>
    </QrCode.RootProvider>
  );
}