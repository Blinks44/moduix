/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { QrCode } from '@moduix/react';

export function QrCodeDemo() {
  return (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code" className="qr-code-root">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode>
  );
}

//#endregion