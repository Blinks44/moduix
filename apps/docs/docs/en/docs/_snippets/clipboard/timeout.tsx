import { Clipboard } from '@moduix/react';

export default function TimeoutClipboardDemo() {
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