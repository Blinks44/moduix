import { Button } from '@moduix/react/button';
import { QrCode } from '@moduix/react/qr-code';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const destinations = ['https://ark-ui.com', 'https://moduix.dev'];

export default function ControlledQrCodeDemo() {
  const [value, setValue] = useState('https://ark-ui.com');
  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--moduix-spacing-3)',
        justifyItems: 'center',
      }}
    >
      <QrCode value={value} onValueChange={(details) => setValue(details.value)}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode>
      <PreviewMeta style={{ justifySelf: 'center' }}>
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
      </PreviewMeta>
    </div>
  );
}