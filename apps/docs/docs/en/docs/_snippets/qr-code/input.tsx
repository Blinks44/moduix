import { Input, QrCode } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function InputQrCodeDemo() {
  const [value, setValue] = useState('https://moduix.dev/docs/qr-code');

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--moduix-spacing-3)',
        justifyItems: 'center',
        inlineSize: '100%',
      }}
    >
      <Input
        aria-label="QR code content"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        style={{ inlineSize: 'min(100%, 24rem)' }}
      />
      <QrCode value={value}>
        <QrCode.Frame role="img" aria-label="QR code for the entered content">
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode>
      <PreviewMeta style={{ justifySelf: 'center' }}>
        <output>Encoded content: {value || 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}