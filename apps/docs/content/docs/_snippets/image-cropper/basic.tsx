/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ImageCropper } from '@moduix/react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export function ImageCropperDemo() {
  return (
    <ImageCropper>
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
    </ImageCropper>
  );
}

//#endregion