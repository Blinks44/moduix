/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SignaturePad } from '@moduix/react';
import { useState } from 'react';

const imageType = 'image/png';

export function ImagePreviewSignaturePadDemo() {
  const [imageUrl, setImageUrl] = useState('');
  return (
    <div className="signature-pad-stack">
      <SignaturePad
        onDrawEnd={(details) => {
          void details.getDataUrl(imageType).then(setImageUrl);
        }}
      >
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad>
      {imageUrl ? (
        <img src={imageUrl} alt="Signature preview" className="signature-pad-preview" />
      ) : (
        <div className="signature-pad-preview-placeholder">Preview appears after signing</div>
      )}
    </div>
  );
}

//#endregion