import { Clipboard } from '@moduix/solid/clipboard';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/clipboard/component-copy-status.module.css';

export default function ClipboardStatusDemo() {
  const [copyCount, setCopyCount] = createSignal(0);

  return (
    <div class={styles.stack}>
      <Clipboard
        class={styles.root}
        defaultValue="maps-platform-token"
        onStatusChange={(details) => {
          if (details.copied) {
            setCopyCount((value) => value + 1);
          }
        }}
      >
        <Clipboard.Control>
          <Clipboard.Trigger>
            <Clipboard.Indicator />
            <Clipboard.ValueText />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard>
      <output>Copied {copyCount()} times</output>
    </div>
  );
}