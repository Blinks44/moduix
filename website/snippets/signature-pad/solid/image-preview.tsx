import { SignaturePad } from '@moduix/solid/signature-pad';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/signature-pad/signature-pad-image-preview.module.css';

const imageType = 'image/png';

export default function ImagePreviewSignaturePadDemo() {
  const [imageUrl, setImageUrl] = createSignal('');

  return (
    <div class={styles.root}>
      <SignaturePad
        onDrawEnd={(details) => {
          void details.getDataUrl(imageType).then(setImageUrl);
        }}
      >
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad>
      {imageUrl() ? (
        <img src={imageUrl()} alt="Signature preview" class={styles.preview} />
      ) : (
        <div class={styles.placeholder}>Preview appears after signing</div>
      )}
    </div>
  );
}