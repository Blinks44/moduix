import { QrCode } from '@moduix/solid/qr-code';
import { createSignal } from 'solid-js';

export default function InputQrCodeDemo() {
  const [value, setValue] = createSignal('https://moduix.dev/docs/qr-code');

  return (
    <>
      <input
        aria-label="QR code content"
        value={value()}
        onInput={(event) => setValue(event.currentTarget.value)}
      />
      <QrCode value={value()}>
        <QrCode.Frame role="img" aria-label="QR code for the entered content">
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode>
      <output>Encoded content: {value() || 'empty'}</output>
    </>
  );
}