import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@moduix/react/signature-pad';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';
import styles from '@/components/examples/signature-pad/signature-pad-image-preview.module.css';

const imageType = 'image/png';

export default function ImagePreviewSignaturePadDemo() {
  const [imageUrl, setImageUrl] = useState('');
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
      {imageUrl ? (
        <img src={imageUrl} alt="Signature preview" className={styles.preview} />
      ) : (
        <div className={styles.placeholder}>Preview appears after signing</div>
      )}
    </Stack>
  );
}