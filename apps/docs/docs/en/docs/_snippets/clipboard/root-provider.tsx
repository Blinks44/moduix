import { Clipboard } from '@moduix/react';

export default function RootProviderClipboardDemo() {
  const clipboard = Clipboard.useClipboard({
    defaultValue: 'https://moduix.dev/docs/clipboard',
  });

  return (
    <>
      <p>Copied: {String(clipboard.copied)}</p>
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
    </>
  );
}