import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-value-text.module.css';

export default function ValueTextClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="moduix/clipboard">
      <ClipboardControl>
        <ClipboardValueText />
        <ClipboardTrigger aria-label="Copy package name">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}