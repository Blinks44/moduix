import { SignaturePad } from '@moduix/react/signature-pad';
import { useState } from 'react';
import styles from '@/components/examples/signature-pad/signature-pad-image-preview.module.css';

const imageType = 'image/png';

export default function ImagePreviewSignaturePadDemo() {
  const [imageUrl, setImageUrl] = useState('');
  return (
    <div className={styles.root}>
      <SignaturePad
        onDrawEnd={(details) => {
          void details.getDataUrl(imageType).then(setImageUrl);
        }}
      >
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad>
      {imageUrl ? (
        <img src={imageUrl} alt="Signature preview" className={styles.preview} />
      ) : (
        <div className={styles.placeholder}>Preview appears after signing</div>
      )}
    </div>
  );
}