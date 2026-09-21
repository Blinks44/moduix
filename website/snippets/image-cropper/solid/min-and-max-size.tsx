import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/solid/image-cropper';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function SizeLimitImageCropperDemo() {
  return (
    <ImageCropper
      minWidth={96}
      minHeight={72}
      maxWidth={320}
      maxHeight={240}
      aria-label="Image cropper"
    >
      <ImageCropperViewport>
        <ImageCropperImage src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  );
}
