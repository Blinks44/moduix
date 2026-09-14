import { ImageCropper } from '@moduix/react/image-cropper';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function ImageCropperDemo() {
  return (
    <ImageCropper aria-label="Image cropper">
      <ImageCropper.Viewport>
        <ImageCropper.Image src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
        <ImageCropper.CropArea />
      </ImageCropper.Viewport>
    </ImageCropper>
  );
}