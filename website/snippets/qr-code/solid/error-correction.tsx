import { Button } from '@moduix/solid/button';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';
import { Stack } from '@moduix/solid/stack';
import { For, createSignal } from 'solid-js';

const errorLevels = ['L', 'M', 'Q', 'H'] as const;
type ErrorLevel = (typeof errorLevels)[number];

export default function ErrorCorrectionQrCodeDemo() {
  const [errorLevel, setErrorLevel] = createSignal<ErrorLevel>('L');

  return (
    <Stack align="center" gap="3">
      <QrCode defaultValue="https://moduix.dev/docs/qr-code" encoding={{ ecc: errorLevel() }}>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <div data-preview-meta>
        <output>Error correction: {errorLevel()}</output>
        <For each={errorLevels}>
          {(level) => (
            <Button
              size="sm"
              variant={level === errorLevel() ? 'default' : 'outline'}
              onClick={() => setErrorLevel(level)}
            >
              {level}
            </Button>
          )}
        </For>
      </div>
    </Stack>
  );
}