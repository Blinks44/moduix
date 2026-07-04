/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { QrCode } from '@moduix/react';

export function OverlayQrCodeDemo() {
  return (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCode.Frame className="qr-code-brand">
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay className="qr-code-overlay">MX</QrCode.Overlay>
    </QrCode>
  );
}

//#endregion