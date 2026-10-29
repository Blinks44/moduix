import {
  SignaturePadCanvas,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@moduix/solid/signature-pad';
import { Stack } from '@moduix/solid/stack';

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
      <output>Paths: {signaturePad().paths.length}</output>
    </Stack>
  );
}