import { Clipboard } from '@moduix/react';
import { useState } from 'react';

export default function ClipboardStatusDemo() {
  const [copyCount, setCopyCount] = useState(0);

  return (
    <>
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
    </>
  );
}