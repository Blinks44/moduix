import { Button } from '@moduix/react/button';
import { QrCode } from '@moduix/react/qr-code';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const errorLevels = ['L', 'M', 'Q', 'H'] as const;

type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

export default function ErrorCorrectionQrCodeDemo() {
  const [errorLevel, setErrorLevel] = useState('L' as ErrorLevel);
  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--moduix-spacing-3)',
        justifyItems: 'center',
      }}
    >
      <QrCode
        defaultValue="https://moduix.dev/docs/qr-code"
        encoding={{
          ecc: errorLevel,
        }}
      >
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode>
      <PreviewMeta style={{ justifySelf: 'center' }}>
        <output>Error correction: {errorLevel}</output>
        {errorLevels.map((level) => (
          <Button
            key={level}
            size="sm"
            variant={level === errorLevel ? 'default' : 'outline'}
            onClick={() => setErrorLevel(level)}
          >
            {level}
          </Button>
        ))}
      </PreviewMeta>
    </div>
  );
}