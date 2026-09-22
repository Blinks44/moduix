import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';
import { createSignal } from 'solid-js';

const destinations = ['https://ark-ui.com', 'https://moduix.dev'];

export default function ControlledQrCodeDemo() {
  const [value, setValue] = createSignal(destinations[0]);

  return (
    <>
      <QrCode value={value()} onValueChange={(details) => setValue(details.value)}>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <output>Encoded URL: {value()}</output>
      {destinations.map((destination) => (
        <button type="button" onClick={() => setValue(destination)}>
          {new URL(destination).hostname}
        </button>
      ))}
    </>
  );
}