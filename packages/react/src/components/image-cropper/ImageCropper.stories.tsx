import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import {
  FlipHorizontalIcon,
  RestartIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { ImageCropper, useImageCropper } from './ImageCropper';
import styles from './ImageCropper.stories.module.css';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const meta = {
  title: 'Components/ImageCropper',
  component: ImageCropper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ImageCropper>;

export default meta;

type Story = StoryObj<typeof meta>;

function CropperCanvas(props: Omit<ImageCropperRootProps, 'children'>) {
  return (
    <ImageCropper {...props}>
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

type ImageCropperRootProps = ComponentProps<typeof ImageCropper.Root>;

export const Basic: Story = {
  render: () => <CropperCanvas />,
};

export const AspectRatio: Story = {
  render: () => <CropperCanvas aspectRatio={1} cropShape="circle" />,
};

export const ControlledZoom: Story = {
  render: () => {
    const [zoom, setZoom] = useState(1);

    return (
      <div className={styles.stack}>
        <div className={styles.toolbar}>
          <button
            className={`${styles.button} ${styles.iconButton}`}
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((value) => Math.max(0.5, value - 0.1))}
          >
            <ZoomOutIcon />
          </button>
          <output className={styles.output}>{zoom.toFixed(1)}x</output>
          <button
            className={`${styles.button} ${styles.iconButton}`}
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((value) => Math.min(3, value + 0.1))}
          >
            <ZoomInIcon />
          </button>
        </div>
        <CropperCanvas
          zoom={zoom}
          minZoom={0.5}
          maxZoom={3}
          onZoomChange={(details) => setZoom(details.zoom)}
        />
      </div>
    );
  },
};

export const TransformControls: Story = {
  render: () => (
    <div className={styles.stack}>
      <ImageCropper>
        <ImageCropper.Context>
          {(context) => (
            <div className={styles.toolbar}>
              <button
                className={`${styles.button} ${styles.iconButton}`}
                type="button"
                aria-label="Zoom out"
                onClick={() => context.zoomBy(-0.1)}
              >
                <ZoomOutIcon />
              </button>
              <button
                className={`${styles.button} ${styles.iconButton}`}
                type="button"
                aria-label="Zoom in"
                onClick={() => context.zoomBy(0.1)}
              >
                <ZoomInIcon />
              </button>
              <button
                className={`${styles.button} ${styles.iconButton}`}
                type="button"
                aria-label="Rotate counterclockwise"
                onClick={() => context.rotateBy(-90)}
              >
                <RotateCcwIcon />
              </button>
              <button
                className={`${styles.button} ${styles.iconButton}`}
                type="button"
                aria-label="Rotate clockwise"
                onClick={() => context.rotateBy(90)}
              >
                <RotateCwIcon />
              </button>
              <button
                className={`${styles.button} ${styles.iconButton}`}
                type="button"
                aria-label="Flip horizontally"
                onClick={() => context.flipHorizontally()}
              >
                <FlipHorizontalIcon />
              </button>
              <button
                className={`${styles.button} ${styles.iconButton}`}
                type="button"
                aria-label="Reset crop"
                onClick={() => context.reset()}
              >
                <RestartIcon />
              </button>
            </div>
          )}
        </ImageCropper.Context>
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
  ),
};

export const RootProvider: Story = {
  render: () => {
    const imageCropper = useImageCropper({ aspectRatio: 16 / 9 });

    return (
      <div className={styles.stack}>
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
          className={`${styles.button} ${styles.iconButton}`}
          type="button"
          aria-label="Reset crop"
          onClick={() => imageCropper.reset()}
        >
          <RestartIcon />
        </button>
      </div>
    );
  },
};

export const CropPreview: Story = {
  render: () => {
    const imageCropper = useImageCropper({ cropShape: 'circle', aspectRatio: 1 });
    const [preview, setPreview] = useState<string | null>(null);

    const handleCrop = async () => {
      const result = await imageCropper.getCroppedImage({ output: 'dataUrl' });
      if (typeof result === 'string') setPreview(result);
    };

    return (
      <div className={styles.stack}>
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
        <Button type="button" onClick={handleCrop}>
          Crop image
        </Button>
        <div className={styles.preview}>{preview ? <img src={preview} alt="" /> : null}</div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <CropperCanvas
      className={styles.customRoot}
      initialCrop={{ x: 80, y: 60, width: 240, height: 180 }}
    />
  ),
};