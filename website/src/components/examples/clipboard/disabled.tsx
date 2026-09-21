import {
  Clipboard,
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/react/clipboard';
import styles from '@/components/examples/clipboard/component-disabled.module.css';

export default function DisabledClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="workspace-secret">
      <ClipboardLabel>Disabled clipboard</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput disabled />
        <ClipboardTrigger disabled>
          <ClipboardIndicator />
          <ClipboardCopyText />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}