import {
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  useClipboard,
} from '@moduix/react/clipboard';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/clipboard/component-root-provider.module.css';

export default function RootProviderClipboardDemo() {
  const clipboard = useClipboard({
    defaultValue: 'https://moduix.dev/docs/clipboard',
  });

  return (
    <div className={styles.stack}>
      <ClipboardRootProvider value={clipboard}>
        <ClipboardLabel>Provider-driven clipboard</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput readOnly />
          <ClipboardTrigger>
            <ClipboardIndicator />
            <ClipboardCopyText />
          </ClipboardTrigger>
        </ClipboardControl>
      </ClipboardRootProvider>
      <PreviewMeta>
        <output>Copied: {String(clipboard.copied)}</output>
      </PreviewMeta>
    </div>
  );
}