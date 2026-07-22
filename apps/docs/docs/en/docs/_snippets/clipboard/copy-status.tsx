import { Clipboard } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ClipboardStatusDemo() {
  const [copyCount, setCopyCount] = useState(0);

  return (
    <PreviewLayout gap="var(--moduix-spacing-3)" maxWidth="24rem">
      <Clipboard
        defaultValue="maps-platform-token"
        onStatusChange={(details) => {
          if (details.copied) {
            setCopyCount((value) => value + 1);
          }
        }}
      >
        <Clipboard.Control>
          <Clipboard.Trigger>
            <Clipboard.Indicator />
            <Clipboard.ValueText />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard>
      <p className="clipboard-status-text">Copied {copyCount} times</p>
    </PreviewLayout>
  );
}