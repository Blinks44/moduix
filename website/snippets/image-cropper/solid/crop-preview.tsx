import { Button } from '@moduix/solid/button';
import { ImageCropper, useImageCropper } from '@moduix/solid/image-cropper';
import { Show, createSignal } from 'solid-js';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function CropPreviewImageCropperDemo() {
  const imageCropper = useImageCropper({ cropShape: 'circle', aspectRatio: 1 });
  const [preview, setPreview] = createSignal<string>();
  const [status, setStatus] = createSignal('Preview not created');

  const handleCrop = async () => {
    try {
      const result = await imageCropper().getCroppedImage({ output: 'dataUrl' });

      if (typeof result === 'string') {
        setPreview(result);
        setStatus('Preview created');
      } else {
        setPreview(undefined);
        setStatus('Image is not ready');
      }
    } catch {
      setPreview(undefined);
      setStatus('Preview could not be created');
    }
  };

  return (
    <div>
      <ImageCropper.RootProvider value={imageCropper} aria-label="Image cropper">
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper.RootProvider>
      <output>{status()}</output>
      <Show when={preview()}>
        {(src) => <img src={src()} alt="Cropped image preview" width="128" height="128" />}
      </Show>
      <Button type="button" onClick={handleCrop}>
        Create crop preview
      </Button>
    </div>
  );
}