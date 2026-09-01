import { Clipboard } from '@moduix/react/clipboard';
import styles from '@/components/examples/clipboard/component-custom-copy-text.module.css';

export default function CustomCopyTextClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="workspace-secret">
      <Clipboard.Label>Override copy labels</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText copied="Copied!">Copy secret</Clipboard.CopyText>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}