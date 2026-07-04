/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { QrCode } from '@moduix/react';

export function CustomStylingQrCodeDemo() {
  return (
    <QrCode
      className="qr-code-custom"
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay className="qr-code-overlay">MX</QrCode.Overlay>
      <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download PNG
      </QrCode.DownloadTrigger>
    </QrCode>
  );
}

//#endregion