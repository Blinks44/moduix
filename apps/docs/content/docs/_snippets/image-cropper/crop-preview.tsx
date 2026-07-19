/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, ImageCropper, useImageCropper } from '@moduix/react';
import { useState } from 'react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export function CropPreviewImageCropperDemo() {
  const imageCropper = useImageCropper({
    cropShape: 'circle',
    aspectRatio: 1,
  });
  const [preview, setPreview] = useState(null as string | null);
  const handleCrop = async () => {
    const result = await imageCropper.getCroppedImage({
      output: 'dataUrl',
    });
    if (typeof result === 'string') setPreview(result);
  };
  return (
    <div className="cropper-stack">
      <ImageCropper.RootProvider value={imageCropper}>
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper.RootProvider>
      <Button type="button" onClick={handleCrop}>
        Crop image
      </Button>
      <div className="cropper-preview">{preview ? <img src={preview} alt="" /> : null}</div>
    </div>
  );
}

//#endregion