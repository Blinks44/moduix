import { ImageCropper } from '@moduix/react/image-cropper';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function FixedImageCropperDemo() {
  return (
    <ImageCropper
      fixedCropArea
      cropShape="circle"
      aspectRatio={1}
      aria-label="Image cropper"
      initialCrop={{
        x: 112,
        y: 64,
        width: 220,
        height: 220,
      }}
    >
      <ImageCropper.Viewport>
        <ImageCropper.Image src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
        <ImageCropper.CropArea />
      </ImageCropper.Viewport>
    </ImageCropper>
  );
}