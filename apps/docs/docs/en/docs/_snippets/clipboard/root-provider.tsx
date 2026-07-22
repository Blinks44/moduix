import { Clipboard } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function RootProviderClipboardDemo() {
  const clipboard = Clipboard.useClipboard({
    defaultValue: 'https://moduix.dev/docs/clipboard',
  });

  return (
    <PreviewLayout gap="var(--moduix-spacing-2)" maxWidth="24rem">
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
      <p className="clipboard-status-text">Copied: {String(clipboard.copied)}</p>
    </PreviewLayout>
  );
}