//#region demo
import { Clipboard } from '@moduix/react';

const _clipboardValue = 'workspace-secret';
const _copiedStateTimeout = 5000;

export function TimeoutClipboardDemo() {
  return (
    <Clipboard defaultValue="workspace-secret" timeout={5000}>
      <Clipboard.Label>Five second copied state</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}
//#endregion