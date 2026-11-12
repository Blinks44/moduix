import {
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  useClipboard,
} from '@moduix/react/clipboard';
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
          <ClipboardInput />
          <ClipboardTrigger>
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </ClipboardRootProvider>
      <div data-preview-meta>
        <output>Copied: {String(clipboard.copied)}</output>
      </div>
    </div>
  );
}