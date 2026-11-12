import { Button } from '@moduix/react/button';
import {
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '@moduix/react/image-cropper';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function CropPreviewImageCropperDemo() {
  const imageCropper = useImageCropper({
    cropShape: 'circle',
    aspectRatio: 1,
  });
  const [preview, setPreview] = useState(null as string | null);
  const [status, setStatus] = useState('Preview not created');

  const handleCrop = async () => {
    try {
      const result = await imageCropper.getCroppedImage({
        output: 'dataUrl',
      });

      if (typeof result === 'string') {
        setPreview(result);
        setStatus('Preview created');
      } else {
        setPreview(null);
        setStatus('Image is not ready');
      }
    } catch {
      setPreview(null);
      setStatus('Preview could not be created');
    }
  };

  return (
    <Stack align="center" gap="3">
      <ImageCropperRootProvider value={imageCropper} aria-label="Image cropper">
        <ImageCropperViewport>
          <ImageCropperImage src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropperRootProvider>
      <div data-preview-meta>
        <output>{status}</output>
        {preview ? <img src={preview} alt="Cropped preview" width={128} height={128} /> : null}
        <Button type="button" onClick={handleCrop}>
          Create crop preview
        </Button>
      </div>
    </Stack>
  );
}