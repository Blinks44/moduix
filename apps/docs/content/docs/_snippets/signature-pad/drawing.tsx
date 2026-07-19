/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SignaturePad } from '@moduix/react';

const drawing = {
  fill: '#2563eb',
  size: 4,
  simulatePressure: false,
};

export function DrawingSignaturePadDemo() {
  return (
    <SignaturePad drawing={drawing}>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}

//#endregion