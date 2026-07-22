import { ImageCropper } from '@moduix/react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function SizeLimitImageCropperDemo() {
  return (
    <ImageCropper minWidth={96} minHeight={72} maxWidth={320} maxHeight={240}>
      <ImageCropper.Viewport>
        <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
        <ImageCropper.CropArea />
      </ImageCropper.Viewport>
    </ImageCropper>
  );
}