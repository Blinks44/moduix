import { SignaturePad, useSignaturePad } from '@moduix/solid/signature-pad';
import styles from '@/components/examples/signature-pad/signature-pad-root-provider.module.css';

const signaturePadTranslations = {
  control: 'Signature drawing area',
  clearTrigger: 'Clear signature',
};

export default function RootProviderSignaturePadDemo() {
  const signaturePad = useSignaturePad({
    translations: signaturePadTranslations,
  });

  return (
    <div class={styles.root}>
      <SignaturePad.RootProvider value={signaturePad}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad.RootProvider>
      <output>Paths: {signaturePad().paths.length}</output>
    </div>
  );
}