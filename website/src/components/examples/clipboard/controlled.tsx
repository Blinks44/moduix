import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/react/clipboard';
import { useState } from 'react';

export default function ControlledClipboardDemo() {
  const [value, setValue] = useState('https://ark-ui.com');

  return (
    <Clipboard value={value} onValueChange={(details) => setValue(details.value)}>
      <ClipboardLabel>Share URL</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}