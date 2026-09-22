import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';
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
        <QrCodeFrame role="img" aria-label="QR code for the entered content">
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <output>Encoded content: {value() || 'empty'}</output>
    </>
  );
}
