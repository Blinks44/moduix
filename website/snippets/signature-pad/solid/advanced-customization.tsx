import { SignaturePad } from '@moduix/solid/signature-pad';

export default function AdvancedCustomizationSignaturePadDemo() {
  return (
    <SignaturePad>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger aria-label="Clear signature">Clear</SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
    </SignaturePad>
  );
}