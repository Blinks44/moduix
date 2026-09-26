import { Button } from '@moduix/react/button';
import {
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '@moduix/react/image-cropper';
import { RotateCcw as RestartIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/image-cropper/image-cropper-root-provider.module.css';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

export default function RootProviderImageCropperDemo() {
  const imageCropper = useImageCropper({
    aspectRatio: 16 / 9,
  });
  const [resets, setResets] = useState(0);

  const handleReset = () => {
    imageCropper.reset();
    setResets((value) => value + 1);
  };

  return (
    <div className={styles.stack}>
      <ImageCropperRootProvider value={imageCropper} aria-label="Image cropper">
        <ImageCropperViewport>
          <ImageCropperImage src={sampleImage} alt="Landscape" crossOrigin="anonymous" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropperRootProvider>
      <PreviewMeta>
        <output>Resets: {resets}</output>
        <Button size="sm" type="button" aria-label="Reset crop" onClick={handleReset}>
          <RestartIcon />
        </Button>
      </PreviewMeta>
    </div>
  );
}