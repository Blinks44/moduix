import { Input } from '@moduix/solid/input';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/qr-code/component-input.module.css';

export default function InputQrCodeDemo() {
  const [value, setValue] = createSignal('https://moduix.dev/docs/qr-code');

  return (
    <div class={styles.stack}>
      <Input
        aria-label="QR code content"
        value={value()}
        onInput={(event) => setValue(event.currentTarget.value)}
        class={styles.input}
      />
      <QrCode value={value()}>
        <QrCodeFrame role="img" aria-label="QR code for the entered content">
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <div data-preview-meta>
        <output>Encoded content: {value() || 'empty'}</output>
      </div>
    </div>
  );
}