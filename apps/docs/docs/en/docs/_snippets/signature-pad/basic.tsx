import { SignaturePad } from '@moduix/react';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

export default function SignaturePadDemo() {
  return (
    <SignaturePad translations={signaturePadTranslations}>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}