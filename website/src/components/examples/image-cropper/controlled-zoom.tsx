import { Button } from '@moduix/react/button';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/react/image-cropper';
import { ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/image-cropper/image-cropper-controlled-zoom.module.css';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const minZoom = 0.5;

const maxZoom = 3;

export default function ControlledZoomImageCropperDemo() {
  const [zoom, setZoom] = useState(1);
  return (
    <div className={styles.stack}>
      <ImageCropper
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        aria-label="Image cropper"
        onZoomChange={(details) => setZoom(details.zoom)}
      >
        <ImageCropperViewport>
          <ImageCropperImage src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
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
