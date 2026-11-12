import {
  SignaturePadCanvas,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@moduix/react/signature-pad';
import { Stack } from '@moduix/react/stack';

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
      <div data-preview-meta>
        <output>Paths: {signaturePad.paths.length}</output>
      </div>
    </Stack>
  );
}