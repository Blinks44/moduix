/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SignaturePad, useSignaturePad } from '@moduix/react';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

export function RootProviderSignaturePadDemo() {
  const signaturePad = useSignaturePad({
    translations: signaturePadTranslations,
  });
  return (
    <div className="signature-pad-stack">
      <SignaturePad.RootProvider value={signaturePad}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad.RootProvider>
      <output className="signature-pad-status">Paths: {signaturePad.paths.length}</output>
    </div>
  );
}

//#endregion