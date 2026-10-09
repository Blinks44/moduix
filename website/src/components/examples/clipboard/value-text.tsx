import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/react/clipboard';
import styles from '@/components/examples/clipboard/component-value-text.module.css';

export default function ValueTextClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="moduix/clipboard">
      <ClipboardControl>
        <ClipboardValueText />
        <ClipboardTrigger aria-label="Copy package name">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}