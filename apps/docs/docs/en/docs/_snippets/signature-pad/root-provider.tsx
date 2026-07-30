import { SignaturePad, useSignaturePad } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

export default function RootProviderSignaturePadDemo() {
  const signaturePad = useSignaturePad({
    translations: signaturePadTranslations,
  });
  return (
    <div className="signature-pad-stack">
      <SignaturePad.RootProvider value={signaturePad}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad.RootProvider>
      <PreviewMeta>
        <output>Paths: {signaturePad.paths.length}</output>
      </PreviewMeta>
    </div>
  );
}