import { QrCode, QrCodeFrame, QrCodeOverlay, QrCodePattern } from '@moduix/react/qr-code';
import styles from '@/components/examples/qr-code/component-overlay.module.css';

export default function OverlayQrCodeDemo() {
  return (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCodeFrame className={styles.frame}>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay className={styles.overlay}>MX</QrCodeOverlay>
    </QrCode>
  );
}
