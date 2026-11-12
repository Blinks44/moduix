import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';
import { For } from 'solid-js';
import styles from '@/components/examples/qr-code/component-fill.module.css';

const fills = [
  {
    label: 'Primary',
    class: styles.primary,
  },
  {
    label: 'Danger',
    class: styles.danger,
  },
];

export default function FillQrCodeDemo() {
  return (
    <div class={styles.grid}>
      <For each={fills}>
        {(fill) => (
          <QrCode defaultValue="https://moduix.dev/docs/qr-code">
            <QrCodeFrame class={fill.class}>
              <QrCodePattern />
            </QrCodeFrame>
          </QrCode>
        )}
      </For>
    </div>
  );
}