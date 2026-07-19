//#region demo
import { Clipboard } from '@moduix/react';
import { useState } from 'react';

const _initialValue = 'https://ark-ui.com';
const _nextValue = 'https://chakra-ui.com';

export function ControlledClipboardDemo() {
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
//#endregion