import {
  SignaturePad,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadLabel,
  SignaturePadSegment,
} from '@moduix/react/signature-pad';
import { RotateCcw as RotateCcwIcon } from 'lucide-react';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

export default function BuildFromPartsSignaturePadDemo() {
  return (
    <SignaturePad translations={signaturePadTranslations}>
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadControl>
        <SignaturePadSegment />
        <SignaturePadClearTrigger>
          <RotateCcwIcon aria-hidden="true" />
        </SignaturePadClearTrigger>
        <SignaturePadGuide />
      </SignaturePadControl>
    </SignaturePad>
  );
}