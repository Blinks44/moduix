//#region demo
import { Clipboard } from '@moduix/react';

const _clipboardValue = 'workspace-secret';

export function CustomCopyTextClipboardDemo() {
  return (
    <Clipboard defaultValue="workspace-secret">
      <Clipboard.Label>Override copy labels</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText copied="Copied!">Copy secret</Clipboard.CopyText>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}
//#endregion