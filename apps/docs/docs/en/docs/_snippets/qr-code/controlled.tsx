import { Button, QrCode } from '@moduix/react';
import { useState } from 'react';

const destinations = ['https://ark-ui.com', 'https://moduix.dev'];

export default function ControlledQrCodeDemo() {
  const [value, setValue] = useState('https://ark-ui.com');
  return (
    <div className="qr-code-stack">
      <QrCode value={value} onValueChange={(details) => setValue(details.value)}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode>
      <div className="qr-code-actions">
        {destinations.map((destination) => (
          <Button
            key={destination}
            size="sm"
            variant="outline"
            onClick={() => setValue(destination)}
          >
            {new URL(destination).hostname}
          </Button>
        ))}
      </div>
    </div>
  );
}