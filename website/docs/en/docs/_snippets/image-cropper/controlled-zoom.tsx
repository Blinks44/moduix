import { Button } from '@moduix/react/button';
import { ImageCropper } from '@moduix/react/image-cropper';
import { ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const minZoom = 0.5;

const maxZoom = 3;

export default function ControlledZoomImageCropperDemo() {
  const [zoom, setZoom] = useState(1);
  return (
    <div className="cropper-stack">
      <ImageCropper
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        aria-label="Image cropper"
        onZoomChange={(details) => setZoom(details.zoom)}
      >
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper>
      <PreviewMeta>
        <output>Zoom: {zoom.toFixed(1)}x</output>
        <Button
          size="sm"
          type="button"
          aria-label="Zoom out"
          onClick={() => setZoom((value) => Math.max(minZoom, value - 0.1))}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          size="sm"
          type="button"
          aria-label="Zoom in"
          onClick={() => setZoom((value) => Math.min(maxZoom, value + 0.1))}
        >
          <ZoomInIcon />
        </Button>
      </PreviewMeta>
    </div>
  );
}