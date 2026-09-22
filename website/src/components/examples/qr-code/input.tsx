import { Input } from '@moduix/react/input';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/react/qr-code';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/qr-code/component-input.module.css';

export default function InputQrCodeDemo() {
  const [value, setValue] = useState('https://moduix.dev/docs/qr-code');

  return (
    <div className={styles.stack}>
      <Input
        aria-label="QR code content"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        className={styles.input}
      />
      <QrCode value={value}>
        <QrCodeFrame role="img" aria-label="QR code for the entered content">
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <PreviewMeta>
        <output>Encoded content: {value || 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}