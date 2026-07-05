/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useImageCropper } from '@ark-ui/react/image-cropper';
import { ImageCropper, RestartIcon } from '@moduix/react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export function RootProviderImageCropperDemo() {
  const imageCropper = useImageCropper({
    aspectRatio: 16 / 9,
  });
  return (
    <div className="cropper-stack">
      <ImageCropper.RootProvider value={imageCropper}>
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
          <ImageCropper.Selection>
            <ImageCropper.Grid axis="horizontal" />
            <ImageCropper.Grid axis="vertical" />
            {ImageCropper.handles.map((position) => (
              <ImageCropper.Handle key={position} position={position} />
            ))}
          </ImageCropper.Selection>
        </ImageCropper.Viewport>
      </ImageCropper.RootProvider>
      <button
        className="cropper-button cropper-icon-button"
        type="button"
        aria-label="Reset crop"
        onClick={() => imageCropper.reset()}
      >
        <RestartIcon />
      </button>
    </div>
  );
}

//#endregion