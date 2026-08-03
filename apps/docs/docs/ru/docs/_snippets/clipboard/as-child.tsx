import { Button } from '@moduix/react/button';
import { Clipboard } from '@moduix/react/clipboard';
import { Input } from '@moduix/react/input';

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