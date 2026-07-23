import { Clipboard } from '@moduix/react';

export default function ClipboardDemo() {
  return (
    <Clipboard defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Label>Copy this link</Clipboard.Label>
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