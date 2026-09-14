import { QrCode } from '@moduix/react/qr-code';
import styles from '@/components/examples/qr-code/component-fill.module.css';

const fills = [
  {
    label: 'Primary',
    className: styles.primary,
  },
  {
    label: 'Danger',
    className: styles.danger,
  },
];

export default function FillQrCodeDemo() {
  return (
    <div className={styles.grid}>
      {fills.map((fill) => (
        <QrCode key={fill.label} defaultValue="https://moduix.dev/docs/qr-code">
          <QrCode.Frame className={fill.className}>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode>
      ))}
    </div>
  );
}