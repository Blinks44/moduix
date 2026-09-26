import {
  ImageCropper,
  ImageCropperGrid,
  ImageCropperHandle,
  ImageCropperHandles,
  ImageCropperImage,
  ImageCropperSelection,
  ImageCropperViewport,
} from '@moduix/solid/image-cropper';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function AdvancedCustomizationImageCropperDemo() {
  return (
    <ImageCropper aria-label="Image cropper">
      <ImageCropperViewport>
        <ImageCropperImage src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
        <ImageCropperSelection>
          <ImageCropperGrid axis="horizontal" />
          <ImageCropperGrid axis="vertical" />
          {ImageCropperHandles.map((position) => (
            <ImageCropperHandle position={position} />
          ))}
        </ImageCropperSelection>
      </ImageCropperViewport>
    </ImageCropper>
  );
}