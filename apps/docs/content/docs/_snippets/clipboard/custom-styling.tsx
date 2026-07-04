//#region demo
import { Clipboard } from '@moduix/react';

const _clipboardValue = 'workspace-secret';

export function StyledClipboardDemo() {
  return (
    <Clipboard defaultValue="workspace-secret">
      <Clipboard.Label>Styled copied state</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly className="clipboard-custom-input" />
        <Clipboard.Trigger className="clipboard-custom-trigger" aria-label="Copy workspace secret">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}
//#endregion