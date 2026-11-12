import { Button } from '@moduix/solid/button';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';
import { Stack } from '@moduix/solid/stack';
import { For, createSignal } from 'solid-js';

const destinations = ['https://ark-ui.com', 'https://moduix.dev'];

export default function ControlledQrCodeDemo() {
  const [value, setValue] = createSignal(destinations[0]);

  return (
    <Stack align="center" gap="3">
      <QrCode value={value()} onValueChange={(details) => setValue(details.value)}>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <div data-preview-meta>
        <output>Encoded URL: {value()}</output>
        <For each={destinations}>
          {(destination) => (
            <Button size="sm" variant="outline" onClick={() => setValue(destination)}>
              {new URL(destination).hostname}
            </Button>
          )}
        </For>
      </div>
    </Stack>
  );
}