/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useQrCode } from '@ark-ui/react/qr-code';
import { QrCode } from '@moduix/react';

export function RootProviderQrCodeDemo() {
  const qrCode = useQrCode({
    value: 'https://moduix.dev/docs/qr-code',
  });
  return (
    <div className="qr-code-stack">
      <QrCode.RootProvider value={qrCode}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.RootProvider>
      <output className="qr-code-status">{qrCode.value}</output>
    </div>
  );
}

//#endregion