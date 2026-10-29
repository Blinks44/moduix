import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/react/clipboard';
import { Stack } from '@moduix/react/stack';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/clipboard/component-context.module.css';

export default function ContextClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardControl>
        <ClipboardValueText />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
      <ClipboardContext>
        {(clipboard) => (
          <Stack align="center" gap="2">
            <PreviewMeta>
              <output>Copied: {String(clipboard.copied)}</output>
            </PreviewMeta>
          </Stack>
        )}
      </ClipboardContext>
    </Clipboard>
  );
}