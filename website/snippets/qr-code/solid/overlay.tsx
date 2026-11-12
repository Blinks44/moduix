import { QrCode, QrCodeFrame, QrCodeOverlay, QrCodePattern } from '@moduix/solid/qr-code';
import styles from '@/components/examples/qr-code/component-overlay.module.css';

export default function OverlayQrCodeDemo() {
  return (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCodeFrame class={styles.frame}>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay class={styles.overlay}>MX</QrCodeOverlay>
    </QrCode>
  );
}