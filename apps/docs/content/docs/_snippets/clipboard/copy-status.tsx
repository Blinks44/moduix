//#region demo
import { Clipboard } from '@moduix/react';
import { useState } from 'react';

const _clipboardValue = 'maps-platform-token';

export function ClipboardStatusDemo() {
  const [copyCount, setCopyCount] = useState(0);

  return (
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
      <p>Copied {copyCount} times</p>
    </Clipboard>
  );
}
//#endregion