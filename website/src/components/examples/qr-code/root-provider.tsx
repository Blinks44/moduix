import {
  QrCodeContext,
  QrCodeFrame,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
} from '@moduix/react/qr-code';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderQrCodeDemo() {
  const qrCode = useQrCode({
    value: 'https://moduix.dev/docs/qr-code',
  });
  return (
    <QrCodeRootProvider value={qrCode}>
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeContext>
        {(context) => (
          <PreviewMeta>
            <output>Encoded URL: {context.value}</output>
          </PreviewMeta>
        )}
      </QrCodeContext>
    </QrCodeRootProvider>
  );
}