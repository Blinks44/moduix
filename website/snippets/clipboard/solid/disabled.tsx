import { Clipboard } from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-disabled.module.css';

export default function DisabledClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="workspace-secret">
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