import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@moduix/react/signature-pad';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

export default function SignaturePadDemo() {
  return (
    <SignaturePad translations={signaturePadTranslations}>
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
    </SignaturePad>
  );
}