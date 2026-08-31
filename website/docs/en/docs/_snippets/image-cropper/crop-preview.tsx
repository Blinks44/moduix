import { Button } from '@moduix/react/button';
import { ImageCropper, useImageCropper } from '@moduix/react/image-cropper';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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
    <div className="cropper-stack">
      <ImageCropper.RootProvider value={imageCropper} aria-label="Image cropper">
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper.RootProvider>
      <PreviewMeta>
        <output>{status}</output>
        {preview ? (
          <img src={preview} alt="Cropped image preview" width={128} height={128} />
        ) : null}
        <Button type="button" onClick={handleCrop}>
          Create crop preview
        </Button>
      </PreviewMeta>
    </div>
  );
}