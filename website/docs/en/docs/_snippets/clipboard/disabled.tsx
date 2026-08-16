import { Clipboard } from '@moduix/react/clipboard';

export default function DisabledClipboardDemo() {
  return (
    <Clipboard defaultValue="workspace-secret">
      <Clipboard.Label>Disabled clipboard</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input disabled />
        <Clipboard.Trigger disabled>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}