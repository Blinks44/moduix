/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import {
  ImageCropper as ArkImageCropper,
  FlipHorizontalIcon,
  ImageCropper,
  RestartIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@moduix/react';
import { useState } from 'react';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export function TransformImageCropperDemo() {
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState({
    horizontal: false,
    vertical: false,
  });
  return (
    <div className="cropper-stack">
      <ImageCropper
        rotation={rotation}
        flip={flip}
        onRotationChange={(details) => setRotation(details.rotation)}
        onFlipChange={(details) => setFlip(details.flip)}
      >
        <ArkImageCropper.Context>
          {(context) => (
            <div className="cropper-toolbar">
              <button
                className="cropper-button cropper-icon-button"
                type="button"
                aria-label="Zoom out"
                onClick={() => context.zoomBy(-0.1)}
              >
                <ZoomOutIcon />
              </button>
              <button
                className="cropper-button cropper-icon-button"
                type="button"
                aria-label="Zoom in"
                onClick={() => context.zoomBy(0.1)}
              >
                <ZoomInIcon />
              </button>
              <button
                className="cropper-button cropper-icon-button"
                type="button"
                aria-label="Rotate counterclockwise"
                onClick={() => context.rotateBy(-90)}
              >
                <RotateCcwIcon />
              </button>
              <button
                className="cropper-button cropper-icon-button"
                type="button"
                aria-label="Rotate clockwise"
                onClick={() => context.rotateBy(90)}
              >
                <RotateCwIcon />
              </button>
              <button
                className="cropper-button cropper-icon-button"
                type="button"
                aria-label="Flip horizontally"
                onClick={() => context.flipHorizontally()}
              >
                <FlipHorizontalIcon />
              </button>
              <button
                className="cropper-button cropper-icon-button"
                type="button"
                aria-label="Reset crop"
                onClick={() => context.reset()}
              >
                <RestartIcon />
              </button>
            </div>
          )}
        </ArkImageCropper.Context>
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
      <output className="cropper-output">
        rotation: {rotation}deg, horizontal flip: {String(flip.horizontal)}
      </output>
    </div>
  );
}

//#endregion