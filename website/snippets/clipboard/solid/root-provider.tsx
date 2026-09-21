import {
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  useClipboard,
} from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-root-provider.module.css';

export default function RootProviderClipboardDemo() {
  const clipboard = useClipboard({
    defaultValue: 'https://moduix.dev/docs/clipboard',
  });

  return (
    <div class={styles.stack}>
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
      <output>Copied: {String(clipboard().copied)}</output>
    </div>
  );
}