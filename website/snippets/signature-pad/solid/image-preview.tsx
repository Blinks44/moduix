import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@moduix/solid/signature-pad';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/signature-pad/signature-pad-image-preview.module.css';

const imageType = 'image/png';

export default function ImagePreviewSignaturePadDemo() {
  const [imageUrl, setImageUrl] = createSignal('');

  return (
    <Stack align="center" gap="3">
      <SignaturePad
        onDrawEnd={(details) => {
          void details.getDataUrl(imageType).then(setImageUrl);
        }}
      >
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
      </SignaturePad>
      {imageUrl() ? (
        <img src={imageUrl()} alt="Signature preview" class={styles.preview} />
      ) : (
        <div class={styles.placeholder}>Preview appears after signing</div>
      )}
    </Stack>
  );
}