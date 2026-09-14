import { Clipboard } from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-context.module.css';

export default function ContextClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
      <Clipboard.Context>
        {(clipboard) => (
          <div class={styles.stack}>
            <output>Copied: {String(clipboard().copied)}</output>
          </div>
        )}
      </Clipboard.Context>
    </Clipboard>
  );
}