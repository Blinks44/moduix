import {
  SignaturePadCanvas,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@moduix/solid/signature-pad';
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
      <SignaturePadRootProvider value={signaturePad}>
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
      </SignaturePadRootProvider>
      <output>Paths: {signaturePad().paths.length}</output>
    </div>
  );
}