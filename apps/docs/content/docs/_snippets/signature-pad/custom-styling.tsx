/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RotateCcwIcon, SignaturePad } from '@moduix/react';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

export function CustomStylingSignaturePadDemo() {
  return (
    <SignaturePad className="signature-pad-custom" translations={signaturePadTranslations}>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger>
          <RotateCcwIcon aria-hidden="true" />
        </SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
    </SignaturePad>
  );
}

//#endregion