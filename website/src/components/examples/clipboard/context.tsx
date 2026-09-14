import { Clipboard } from '@moduix/react/clipboard';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/clipboard/component-context.module.css';

export default function ContextClipboardDemo() {
  return (
    <Clipboard className={styles.root} defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
      <Clipboard.Context>
        {(clipboard) => (
          <div className={styles.stack}>
            <PreviewMeta>
              <output>Copied: {String(clipboard.copied)}</output>
            </PreviewMeta>
          </div>
        )}
      </Clipboard.Context>
    </Clipboard>
  );
}