import { Clipboard } from '@moduix/react/clipboard';
import styles from '@/components/examples/clipboard/component-disabled.module.css';

export default function DisabledClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="workspace-secret">
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