import { Button } from '@moduix/react/button';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/react/qr-code';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const destinations = ['https://ark-ui.com', 'https://moduix.dev'];

export default function ControlledQrCodeDemo() {
  const [value, setValue] = useState('https://ark-ui.com');
  return (
    <Stack align="center" gap="3">
      <QrCode value={value} onValueChange={(details) => setValue(details.value)}>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <div data-preview-meta>
        <output>Encoded URL: {value}</output>
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
    </Stack>
  );
}