import { Button } from '@moduix/react/button';
import { ImageCropper } from '@moduix/react/image-cropper';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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
    <div className="cropper-stack">
      <ImageCropper aspectRatio={aspectRatio} aria-label="Image cropper">
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper>
      <PreviewMeta>
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
      </PreviewMeta>
    </div>
  );
}