import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/solid/clipboard';
import { Stack } from '@moduix/solid/stack';
import styles from '@/components/examples/clipboard/component-context.module.css';

export default function ContextClipboardDemo() {
  return (
    <Clipboard class={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardControl>
        <ClipboardValueText />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
      <ClipboardContext>
        {(clipboard) => (
          <Stack align="center" gap="2">
            <div data-preview-meta>
              <output>Copied: {String(clipboard().copied)}</output>
            </div>
          </Stack>
        )}
      </ClipboardContext>
    </Clipboard>
  );
}