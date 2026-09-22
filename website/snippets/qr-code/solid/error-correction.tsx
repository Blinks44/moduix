import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/solid/qr-code';
import { createSignal } from 'solid-js';

const errorLevels = ['L', 'M', 'Q', 'H'] as const;
type ErrorLevel = (typeof errorLevels)[number];

export default function ErrorCorrectionQrCodeDemo() {
  const [errorLevel, setErrorLevel] = createSignal<ErrorLevel>('L');

  return (
    <>
      <QrCode defaultValue="https://moduix.dev/docs/qr-code" encoding={{ ecc: errorLevel() }}>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
      </QrCode>
      <output>Error correction: {errorLevel()}</output>
      {errorLevels.map((level) => (
        <button
          type="button"
          aria-pressed={level === errorLevel()}
          onClick={() => setErrorLevel(level)}
        >
          {level}
        </button>
      ))}
    </>
  );
}