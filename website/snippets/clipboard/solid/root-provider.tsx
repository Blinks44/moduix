import { Clipboard, useClipboard } from '@moduix/solid/clipboard';
import styles from '@/components/examples/clipboard/component-root-provider.module.css';

export default function RootProviderClipboardDemo() {
  const clipboard = useClipboard({
    defaultValue: 'https://moduix.dev/docs/clipboard',
  });

  return (
    <div class={styles.stack}>
      <Clipboard.RootProvider value={clipboard}>
        <Clipboard.Label>Provider-driven clipboard</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger>
            <Clipboard.Indicator />
            <Clipboard.CopyText />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.RootProvider>
      <output>Copied: {String(clipboard().copied)}</output>
    </div>
  );
}