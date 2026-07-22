import { Button, Clipboard, Input } from '@moduix/react';

export default function AsChildClipboardDemo() {
  return (
    <Clipboard defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Label>Reuse moduix Input and Button</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input asChild>
          <Input readOnly />
        </Clipboard.Input>
        <Clipboard.Trigger asChild>
          <Button variant="outline">
            <Clipboard.Indicator />
            <Clipboard.CopyText />
          </Button>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}