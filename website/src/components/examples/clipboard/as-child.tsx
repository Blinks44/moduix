import { Button } from '@moduix/react/button';
import { Clipboard } from '@moduix/react/clipboard';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/clipboard/component-advanced-customization.module.css';

export default function AsChildClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
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