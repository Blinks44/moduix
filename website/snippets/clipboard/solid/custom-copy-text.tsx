import {
  Clipboard,
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-custom-copy-text.module.css';

export default function CustomCopyTextClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="workspace-secret">
      <ClipboardLabel>Override copy labels</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardCopyText copied="Copied!">Copy secret</ClipboardCopyText>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}