import { Button } from '@moduix/solid/button';
import { Clipboard } from '@moduix/solid/clipboard';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/clipboard/component-advanced-customization.module.css';

export default function AsChildClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Label>Reuse moduix Input and Button</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input asChild={(props) => <Input {...props()} readOnly />} />
        <Clipboard.Trigger asChild={(props) => <Button {...props()} variant="outline" />}>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}