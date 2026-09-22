import { Button } from '@moduix/react/button';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/react/qr-code';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/qr-code/component-error-correction.module.css';

const errorLevels = ['L', 'M', 'Q', 'H'] as const;

type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

export default function ErrorCorrectionQrCodeDemo() {
  const [errorLevel, setErrorLevel] = useState('L' as ErrorLevel);
  return (
    <div className={styles.stack}>
      <QrCode
        defaultValue="https://moduix.dev/docs/qr-code"
        encoding={{
          ecc: errorLevel,
        }}
      >
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <PreviewMeta>
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
