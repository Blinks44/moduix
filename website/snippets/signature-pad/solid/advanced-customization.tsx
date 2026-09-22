import {
  SignaturePad,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadLabel,
  SignaturePadSegment,
} from '@moduix/solid/signature-pad';

export default function AdvancedCustomizationSignaturePadDemo() {
  return (
    <SignaturePad>
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadControl>
        <SignaturePadSegment />
        <SignaturePadClearTrigger aria-label="Clear signature">Clear</SignaturePadClearTrigger>
        <SignaturePadGuide />
      </SignaturePadControl>
    </SignaturePad>
  );
}
