import { QrCodeFrame, QrCodePattern, QrCodeRootProvider, useQrCode } from '@moduix/react/qr-code';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/qr-code/component-controlled.module.css';

export default function RootProviderQrCodeDemo() {
  const qrCode = useQrCode({
    value: 'https://moduix.dev/docs/qr-code',
  });
  return (
    <div className={styles.stack}>
      <QrCodeRootProvider value={qrCode}>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCodeRootProvider>
      <PreviewMeta>
        <output>Encoded URL: {qrCode.value}</output>
      </PreviewMeta>
    </div>
  );
}