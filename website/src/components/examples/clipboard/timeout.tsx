import {
  Clipboard,
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/react/clipboard';
import styles from '@/components/examples/clipboard/component-timeout.module.css';

export default function TimeoutClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="workspace-secret" timeout={5000}>
      <ClipboardLabel>Five second copied state</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardCopyText />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}