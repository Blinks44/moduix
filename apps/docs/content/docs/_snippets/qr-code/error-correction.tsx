/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, QrCode } from '@moduix/react';
import { useState } from 'react';

const errorLevels = ['L', 'M', 'Q', 'H'] as const;

type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

export function ErrorCorrectionQrCodeDemo() {
  const [errorLevel, setErrorLevel] = useState('L' as ErrorLevel);
  return (
    <div className="qr-code-stack">
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
      <div className="qr-code-actions">
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
    </div>
  );
}

//#endregion