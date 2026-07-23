import { Clipboard } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderClipboardDemo() {
  const clipboard = Clipboard.useClipboard({
    defaultValue: 'https://moduix.dev/docs/clipboard',
  });

  return (
    <div>
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
      <PreviewMeta>
        <output>Copied: {String(clipboard.copied)}</output>
      </PreviewMeta>
    </div>
  );
}