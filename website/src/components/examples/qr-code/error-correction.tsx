import { Button } from '@moduix/react/button';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/react/qr-code';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const errorLevels = ['L', 'M', 'Q', 'H'] as const;

type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

export default function ErrorCorrectionQrCodeDemo() {
  const [errorLevel, setErrorLevel] = useState('L' as ErrorLevel);
  return (
    <Stack align="center" gap="3">
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
      <div data-preview-meta>
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
      </div>
    </Stack>
  );
}