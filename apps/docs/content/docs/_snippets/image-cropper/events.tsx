/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ImageCropper } from '@moduix/react';
import { useState } from 'react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export function EventsImageCropperDemo() {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [zoom, setZoom] = useState(1);
  return (
    <div className="cropper-stack">
      <ImageCropper
        onCropChange={(details) => setCrop(details.crop)}
        onZoomChange={(details) => setZoom(details.zoom)}
      >
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper>
      <output className="cropper-output">
        zoom: {zoom.toFixed(2)}x, crop: {Math.round(crop.x)}, {Math.round(crop.y)},{' '}
        {Math.round(crop.width)} x {Math.round(crop.height)}
      </output>
    </div>
  );
}

//#endregion