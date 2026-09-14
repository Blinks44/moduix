import { Button } from '@moduix/solid/button';
import { ImageCropper } from '@moduix/solid/image-cropper';
import {
  FlipHorizontal as FlipHorizontalIcon,
  RotateCcw as RestartIcon,
  RotateCcw as RotateCcwIcon,
  RotateCw as RotateCwIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from 'lucide-solid';
import { createSignal } from 'solid-js';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function TransformImageCropperDemo() {
  const [rotation, setRotation] = createSignal(0);
  const [flip, setFlip] = createSignal({ horizontal: false, vertical: false });

  return (
    <div>
      <ImageCropper
        aria-label="Image cropper"
        rotation={rotation()}
        flip={flip()}
        onRotationChange={(details) => setRotation(details.rotation)}
        onFlipChange={(details) => setFlip(details.flip)}
      >
        <ImageCropper.Context>
          {(context) => (
            <div>
              <Button
                size="sm"
                type="button"
                aria-label="Zoom out"
                onClick={() => context().zoomBy(-0.1)}
              >
                <ZoomOutIcon />
              </Button>
              <Button
                size="sm"
                type="button"
                aria-label="Zoom in"
                onClick={() => context().zoomBy(0.1)}
              >
                <ZoomInIcon />
              </Button>
              <Button
                size="sm"
                type="button"
                aria-label="Rotate counterclockwise"
                onClick={() => context().rotateBy(-90)}
              >
                <RotateCcwIcon />
              </Button>
              <Button
                size="sm"
                type="button"
                aria-label="Rotate clockwise"
                onClick={() => context().rotateBy(90)}
              >
                <RotateCwIcon />
              </Button>
              <Button
                size="sm"
                type="button"
                aria-label="Flip horizontally"
                onClick={() => context().flipHorizontally()}
              >
                <FlipHorizontalIcon />
              </Button>
              <Button
                size="sm"
                type="button"
                aria-label="Reset crop"
                onClick={() => context().reset()}
              >
                <RestartIcon />
              </Button>
            </div>
          )}
        </ImageCropper.Context>
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper>
      <output>
        Rotation: {rotation()}deg, horizontal flip: {String(flip().horizontal)}
      </output>
    </div>
  );
}