//#region demo
import { useClipboard } from '@ark-ui/react/clipboard';
import { Clipboard } from '@moduix/react';

const _clipboardValue = 'https://moduix.dev/docs/clipboard';

export function RootProviderClipboardDemo() {
  const clipboard = useClipboard({
    defaultValue: 'https://moduix.dev/docs/clipboard',
  });

  return (
    <>
      <p>Copied: {String(clipboard.copied)}</p>
      <Clipboard.RootProvider value={clipboard}>
        <Clipboard.Label>Provider-driven clipboard</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger aria-label="Copy provider value">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.RootProvider>
    </>
  );
}
//#endregion