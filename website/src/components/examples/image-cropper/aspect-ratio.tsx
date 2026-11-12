import { Button } from '@moduix/react/button';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/react/image-cropper';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const aspectRatios = [
  {
    label: '16:9',
    value: 16 / 9,
  },
  {
    label: '1:1',
    value: 1,
  },
  {
    label: '9:16',
    value: 9 / 16,
  },
];

export default function AspectRatioImageCropperDemo() {
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  return (
    <Stack align="center" gap="3">
      <ImageCropper aspectRatio={aspectRatio} aria-label="Image cropper">
        <ImageCropperViewport>
          <ImageCropperImage src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropper>
      <div data-preview-meta>
        <output>
          Aspect ratio: {aspectRatios.find((aspect) => aspect.value === aspectRatio)?.label}
        </output>
        {aspectRatios.map((aspect) => (
          <Button
            key={aspect.label}
            size="sm"
            type="button"
            onClick={() => setAspectRatio(aspect.value)}
          >
            {aspect.label}
          </Button>
        ))}
      </div>
    </Stack>
  );
}