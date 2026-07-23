import { Clipboard } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ClipboardStatusDemo() {
  const [copyCount, setCopyCount] = useState(0);

  return (
    <div>
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
      <PreviewMeta>
        <output>Copied {copyCount} times</output>
      </PreviewMeta>
    </div>
  );
}