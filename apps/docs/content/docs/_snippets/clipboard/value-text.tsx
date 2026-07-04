//#region demo
import { Clipboard } from '@moduix/react';

const _clipboardValue = 'moduix/clipboard';

export function ValueTextClipboardDemo() {
  return (
    <Clipboard defaultValue="moduix/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText />
        <Clipboard.Trigger aria-label="Copy package name">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}
//#endregion