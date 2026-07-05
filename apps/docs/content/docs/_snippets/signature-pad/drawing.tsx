/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RotateCcwIcon, SignaturePad } from '@moduix/react';

const drawing = {
  fill: '#2563eb',
  size: 4,
  simulatePressure: false,
};

export function DrawingSignaturePadDemo() {
  return (
    <SignaturePad drawing={drawing}>
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