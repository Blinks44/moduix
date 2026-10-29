import {
  SignaturePadCanvas,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@moduix/react/signature-pad';
import { Stack } from '@moduix/react/stack';
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
    <Stack align="center" gap="3">
      <SignaturePadRootProvider value={signaturePad}>
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
      </SignaturePadRootProvider>
      <PreviewMeta>
        <output>Paths: {signaturePad.paths.length}</output>
      </PreviewMeta>
    </Stack>
  );
}