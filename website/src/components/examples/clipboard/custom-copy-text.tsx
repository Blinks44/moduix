import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/react/clipboard';
import styles from '@/components/examples/clipboard/component-custom-copy-text.module.css';

export default function CustomCopyTextClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="workspace-secret">
      <ClipboardLabel>Override copy labels</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardIndicator copied="Copied!">Copy secret</ClipboardIndicator>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}