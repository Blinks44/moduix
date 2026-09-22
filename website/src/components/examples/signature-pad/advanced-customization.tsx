import {
  SignaturePad,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadLabel,
  SignaturePadSegment,
} from '@moduix/react/signature-pad';
import { RotateCcw as RotateCcwIcon } from 'lucide-react';

export default function AdvancedCustomizationSignaturePadDemo() {
  return (
    <SignaturePad>
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