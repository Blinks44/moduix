import { QrCode } from '@moduix/react/qr-code';
import styles from '@/components/examples/qr-code/component-overlay.module.css';

export default function OverlayQrCodeDemo() {
  return (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCode.Frame className={styles.frame}>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay className={styles.overlay}>MX</QrCode.Overlay>
    </QrCode>
  );
}