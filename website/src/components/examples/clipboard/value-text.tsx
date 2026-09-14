import { Clipboard } from '@moduix/react/clipboard';
import styles from '@/components/examples/clipboard/component-value-text.module.css';

export default function ValueTextClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="moduix/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText />
        <Clipboard.Trigger aria-label="Copy package name">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}