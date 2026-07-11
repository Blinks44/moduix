/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RotateCcwIcon, SignaturePad } from '@moduix/react';

export function AdvancedCustomizationSignaturePadDemo() {
  return (
    <SignaturePad>
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