import { SignaturePad } from '@moduix/react';

const drawing = {
  fill: '#2563eb',
  size: 4,
  simulatePressure: false,
};

export default function DrawingSignaturePadDemo() {
  return (
    <SignaturePad drawing={drawing}>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}