/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SignaturePad } from '@moduix/react';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

export function SignaturePadDemo() {
  return (
    <SignaturePad translations={signaturePadTranslations}>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}

//#endregion