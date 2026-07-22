import { Clipboard } from '@moduix/react';
import { useState } from 'react';

export default function ControlledClipboardDemo() {
  const [value, setValue] = useState('https://ark-ui.com');

  return (
    <Clipboard value={value} onValueChange={(details) => setValue(details.value)}>
      <Clipboard.Label>Share URL</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}