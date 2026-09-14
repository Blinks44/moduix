import { Button } from '@moduix/react/button';
import { QrCode } from '@moduix/react/qr-code';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/qr-code/component-controlled.module.css';

const destinations = ['https://ark-ui.com', 'https://moduix.dev'];

export default function ControlledQrCodeDemo() {
  const [value, setValue] = useState('https://ark-ui.com');
  return (
    <div className={styles.stack}>
      <QrCode value={value} onValueChange={(details) => setValue(details.value)}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode>
      <PreviewMeta>
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