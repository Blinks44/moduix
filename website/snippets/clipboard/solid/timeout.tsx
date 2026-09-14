import { Clipboard } from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-timeout.module.css';

export default function TimeoutClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="workspace-secret" timeout={5000}>
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