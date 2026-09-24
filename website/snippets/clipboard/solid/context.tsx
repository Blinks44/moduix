import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-context.module.css';

export default function ContextClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardControl>
        <ClipboardValueText />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
      <ClipboardContext>
        {(clipboard) => (
          <div class={styles.stack}>
            <output>Copied: {String(clipboard().copied)}</output>
          </div>
        )}
      </ClipboardContext>
    </Clipboard>
  );
}