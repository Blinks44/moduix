/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ImageCropper } from '@moduix/react';
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

export function AspectRatioImageCropperDemo() {
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  return (
    <div className="cropper-stack">
      <div className="cropper-toolbar">
        {aspectRatios.map((aspect) => (
          <button
            className="cropper-button"
            type="button"
            key={aspect.label}
            data-state={aspectRatio === aspect.value ? 'checked' : undefined}
            onClick={() => setAspectRatio(aspect.value)}
          >
            {aspect.label}
          </button>
        ))}
      </div>
      <ImageCropper aspectRatio={aspectRatio}>
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper>
    </div>
  );
}

//#endregion