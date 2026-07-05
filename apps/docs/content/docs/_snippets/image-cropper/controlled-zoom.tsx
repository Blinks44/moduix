/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ImageCropper, ZoomInIcon, ZoomOutIcon } from '@moduix/react';
import { useState } from 'react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const minZoom = 0.5;

const maxZoom = 3;

export function ControlledZoomImageCropperDemo() {
  const [zoom, setZoom] = useState(1);
  return (
    <div className="cropper-stack">
      <div className="cropper-toolbar">
        <button
          className="cropper-button cropper-icon-button"
          type="button"
          aria-label="Zoom out"
          onClick={() => setZoom((value) => Math.max(minZoom, value - 0.1))}
        >
          <ZoomOutIcon />
        </button>
        <output className="cropper-output">{zoom.toFixed(1)}x</output>
        <button
          className="cropper-button cropper-icon-button"
          type="button"
          aria-label="Zoom in"
          onClick={() => setZoom((value) => Math.min(maxZoom, value + 0.1))}
        >
          <ZoomInIcon />
        </button>
      </div>
      <ImageCropper
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        onZoomChange={(details) => setZoom(details.zoom)}
      >
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
    </div>
  );
}

//#endregion