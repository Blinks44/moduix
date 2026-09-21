import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/react/clipboard';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/clipboard/component-context.module.css';

export default function ContextClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardControl>
        <ClipboardValueText />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardCopyText />
        </ClipboardTrigger>
      </ClipboardControl>
      <ClipboardContext>
        {(clipboard) => (
          <div className={styles.stack}>
            <PreviewMeta>
              <output>Copied: {String(clipboard.copied)}</output>
            </PreviewMeta>
          </div>
        )}
      </ClipboardContext>
    </Clipboard>
  );
}