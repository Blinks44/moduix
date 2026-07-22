import { ImageCropper, useImageCropper } from '@moduix/react';
import { RotateCcw as RestartIcon } from 'lucide-react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function RootProviderImageCropperDemo() {
  const imageCropper = useImageCropper({
    aspectRatio: 16 / 9,
  });
  return (
    <div className="cropper-stack">
      <ImageCropper.RootProvider value={imageCropper}>
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper.RootProvider>
      <button
        className="cropper-button cropper-icon-button"
        type="button"
        aria-label="Reset crop"
        onClick={() => imageCropper.reset()}
      >
        <RestartIcon />
      </button>
    </div>
  );
}