import { Button } from '@moduix/solid/button';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/solid/image-cropper';
import { For, createSignal } from 'solid-js';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const aspectRatios = [
  { label: '16:9', value: 16 / 9 },
  { label: '1:1', value: 1 },
  { label: '9:16', value: 9 / 16 },
];

export default function AspectRatioImageCropperDemo() {
  const [aspectRatio, setAspectRatio] = createSignal(16 / 9);

  return (
    <div>
      <ImageCropper aspectRatio={aspectRatio()} aria-label="Image cropper">
        <ImageCropperViewport>
          <ImageCropperImage src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropper>
      <output>
        Aspect ratio: {aspectRatios.find((aspect) => aspect.value === aspectRatio())?.label}
      </output>
      <For each={aspectRatios}>
        {(aspect) => (
          <Button size="sm" type="button" onClick={() => setAspectRatio(aspect.value)}>
            {aspect.label}
          </Button>
        )}
      </For>
    </div>
  );
}