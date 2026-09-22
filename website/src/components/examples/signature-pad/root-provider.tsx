import {
  SignaturePadCanvas,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@moduix/react/signature-pad';
import { PreviewMeta } from '@/components/mdx/Components';
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
    <div className={styles.root}>
      <SignaturePadRootProvider value={signaturePad}>
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
      </SignaturePadRootProvider>
      <PreviewMeta>
        <output>Paths: {signaturePad.paths.length}</output>
      </PreviewMeta>
    </div>
  );
}
