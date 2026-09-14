import { Clipboard } from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-custom-copy-text.module.css';

export default function CustomCopyTextClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="workspace-secret">
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