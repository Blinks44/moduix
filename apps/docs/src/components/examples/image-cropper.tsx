import { Button, ImageCropper, useImageCropper } from '@moduix/react';
import {
  FlipHorizontal as FlipHorizontalIcon,
  RotateCcw as RestartIcon,
  RotateCcw as RotateCcwIcon,
  RotateCw as RotateCwIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from 'lucide-react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const aspectRatios = [
  { label: '16:9', value: 16 / 9 },
  { label: '1:1', value: 1 },
  { label: '9:16', value: 9 / 16 },
] as const;

export const imageCropperSampleImageData = `
const sampleImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90";
`;

export const imageCropperAspectRatiosData = `
const aspectRatios = [
  { label: "16:9", value: 16 / 9 },
  { label: "1:1", value: 1 },
  { label: "9:16", value: 9 / 16 },
];
`;

export const imageCropperInitialCropData = `
const initialCrop = { x: 96, y: 72, width: 260, height: 180 };
`;

export const imageCropperZoomLimitsData = `
const minZoom = 0.5;
const maxZoom = 3;
`;

export const imageCropperSizeLimitsData = `
const cropLimits = {
  minWidth: 96,
  minHeight: 72,
  maxWidth: 320,
  maxHeight: 240,
};
`;

export const imageCropperExampleCss = `
.cropper-stack {
  display: grid;
  width: min(32rem, 100%);
  gap: var(--spacing-3);
}

.cropper-toolbar {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  width: fit-content;
  gap: var(--spacing-1);
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-1);
  background: var(--color-muted);
}

.cropper-button {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: var(--border-width-sm) solid transparent;
  border-radius: var(--radius-md);
  padding-inline: var(--spacing-3);
  background: transparent;
  color: var(--color-muted-foreground);
  font: inherit;
  cursor: pointer;
  transition:
    border-color var(--transition-default),
    background-color var(--transition-default),
    box-shadow var(--transition-default),
    color var(--transition-default);
}

.cropper-button:hover {
  color: var(--color-foreground);
}

.cropper-button[data-state="checked"] {
  background: var(--color-background);
  color: var(--color-foreground);
  box-shadow: var(--shadow-sm);
}

.cropper-button:focus-visible {
  outline: var(--border-width-md) solid var(--color-ring);
  outline-offset: var(--border-width-sm);
}

.cropper-icon-button {
  width: 2rem;
  padding-inline: 0;
}

.cropper-icon-button svg {
  width: 1rem;
  height: 1rem;
}

.cropper-output {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
  line-height: var(--line-height-text-xs);
}

.cropper-preview {
  display: grid;
  width: 8rem;
  height: 8rem;
  place-items: center;
  overflow: hidden;
  border: var(--border-width-sm) solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-muted);
}

.cropper-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;

export const imageCropperOverrideCssProperties: CssPropertyInput[] = [
  ['--image-cropper-border-color', 'var(--color-border)', 'Controls the viewport border color.'],
  ['--image-cropper-border-width', 'var(--border-width-sm)', 'Controls the viewport border width.'],
  [
    '--image-cropper-checker-color',
    'color-mix(in oklab, var(--color-muted) 72%, transparent)',
    'Controls the checkerboard tile color.',
  ],
  ['--image-cropper-checker-size', 'var(--spacing-4)', 'Controls the checkerboard tile size.'],
  ['--image-cropper-color', 'var(--color-foreground)', 'Controls inherited text color.'],
  ['--image-cropper-focus-ring-color', 'var(--color-ring)', 'Controls selection focus ring color.'],
  [
    '--image-cropper-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls selection focus ring width.',
  ],
  ['--image-cropper-gap', 'var(--spacing-3)', 'Controls root layout gap.'],
  ['--image-cropper-grid-color', 'rgb(255 255 255 / 62%)', 'Controls crop grid color.'],
  ['--image-cropper-grid-width', 'var(--border-width-sm)', 'Controls crop grid line width.'],
  ['--image-cropper-handle-bg', 'rgb(255 255 255 / 96%)', 'Controls handle fill color.'],
  [
    '--image-cropper-handle-border-color',
    'rgb(255 255 255 / 88%)',
    'Controls handle border color.',
  ],
  [
    '--image-cropper-handle-border-width',
    'var(--border-width-sm)',
    'Controls handle border width.',
  ],
  ['--image-cropper-handle-edge-radius', 'var(--radius-full)', 'Controls side handle radius.'],
  ['--image-cropper-handle-edge-thickness', '0.2rem', 'Controls side handle thickness.'],
  ['--image-cropper-handle-radius', 'var(--radius-xs)', 'Controls corner handle radius.'],
  ['--image-cropper-handle-shadow', '0 1px 3px rgb(15 23 42 / 18%)', 'Controls handle shadow.'],
  ['--image-cropper-handle-size', 'var(--spacing-3)', 'Controls corner handle size.'],
  ['--image-cropper-max-width', '100%', 'Controls root maximum width.'],
  ['--image-cropper-radius', 'var(--radius-lg)', 'Controls viewport radius.'],
  [
    '--image-cropper-selection-border-color',
    'var(--color-primary)',
    'Controls selection border color.',
  ],
  [
    '--image-cropper-selection-border-width',
    'var(--border-width-md)',
    'Controls selection border width.',
  ],
  [
    '--image-cropper-selection-circle-radius',
    'var(--radius-full)',
    'Controls circular selection radius.',
  ],
  [
    '--image-cropper-selection-inner-border-color',
    'rgb(255 255 255 / 64%)',
    'Controls selection inner border color.',
  ],
  [
    '--image-cropper-selection-inner-border-width',
    'var(--border-width-sm)',
    'Controls selection inner border width.',
  ],
  [
    '--image-cropper-selection-overlay-bg',
    'rgb(0 0 0 / 45%)',
    'Controls the outside-selection overlay color.',
  ],
  ['--image-cropper-selection-radius', 'var(--radius-md)', 'Controls selection radius.'],
  ['--image-cropper-shadow', 'none', 'Controls viewport shadow.'],
  ['--image-cropper-transition', 'var(--transition-default)', 'Controls visual transitions.'],
  ['--image-cropper-viewport-bg', 'var(--color-background)', 'Controls viewport background.'],
  [
    '--image-cropper-viewport-height',
    'var(--image-cropper-viewport-min-height, 20rem)',
    'Controls viewport height.',
  ],
  ['--image-cropper-viewport-min-height', '20rem', 'Controls viewport minimum height.'],
  ['--image-cropper-width', '32rem', 'Controls root width.'],
];

export function ImageCropperCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={imageCropperOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function ImageCropperCanvas(props: Omit<ImageCropperRootProps, 'children'>) {
  return (
    <ImageCropper {...props}>
      <ImageCropper.Viewport>
        <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
        <ImageCropper.CropArea />
      </ImageCropper.Viewport>
    </ImageCropper>
  );
}

type ImageCropperRootProps = ComponentProps<typeof ImageCropper.Root>;

export function ImageCropperExample() {
  return <ImageCropperCanvas />;
}

export function AdvancedCustomizationImageCropperExample() {
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

export function AspectRatioImageCropperExample() {
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  return (
    <div className="cropper-stack">
      <div className="cropper-toolbar">
        {aspectRatios.map((aspect) => (
          <button
            className="cropper-button"
            type="button"
            key={aspect.label}
            data-state={aspectRatio === aspect.value ? 'checked' : undefined}
            onClick={() => setAspectRatio(aspect.value)}
          >
            {aspect.label}
          </button>
        ))}
      </div>
      <ImageCropperCanvas aspectRatio={aspectRatio} />
    </div>
  );
}

export function CircleImageCropperExample() {
  return <ImageCropperCanvas cropShape="circle" aspectRatio={1} />;
}

export function InitialCropImageCropperExample() {
  return <ImageCropperCanvas initialCrop={{ x: 96, y: 72, width: 260, height: 180 }} />;
}

export function ControlledZoomImageCropperExample() {
  const [zoom, setZoom] = useState(1);
  const minZoom = 0.5;
  const maxZoom = 3;

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
      <ImageCropperCanvas
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        onZoomChange={(details) => setZoom(details.zoom)}
      />
    </div>
  );
}

export function TransformImageCropperExample() {
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
        <ImageCropper.Context>
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
        </ImageCropper.Context>
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper>
      <output className="cropper-output">
        rotation: {rotation}deg, horizontal flip: {String(flip.horizontal)}
      </output>
    </div>
  );
}

export function SizeLimitImageCropperExample() {
  return <ImageCropperCanvas minWidth={96} minHeight={72} maxWidth={320} maxHeight={240} />;
}

export function FixedImageCropperExample() {
  return (
    <ImageCropperCanvas
      fixedCropArea
      cropShape="circle"
      aspectRatio={1}
      initialCrop={{ x: 112, y: 64, width: 220, height: 220 }}
    />
  );
}

export function CropPreviewImageCropperExample() {
  const imageCropper = useImageCropper({ cropShape: 'circle', aspectRatio: 1 });
  const [preview, setPreview] = useState<string | null>(null);

  const handleCrop = async () => {
    const result = await imageCropper.getCroppedImage({ output: 'dataUrl' });
    if (typeof result === 'string') setPreview(result);
  };

  return (
    <div className="cropper-stack">
      <ImageCropper.RootProvider value={imageCropper}>
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
          <ImageCropper.CropArea />
        </ImageCropper.Viewport>
      </ImageCropper.RootProvider>
      <Button type="button" onClick={handleCrop}>
        Crop image
      </Button>
      <div className="cropper-preview">{preview ? <img src={preview} alt="" /> : null}</div>
    </div>
  );
}

export function EventsImageCropperExample() {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div className="cropper-stack">
      <ImageCropperCanvas
        onCropChange={(details) => setCrop(details.crop)}
        onZoomChange={(details) => setZoom(details.zoom)}
      />
      <output className="cropper-output">
        zoom: {zoom.toFixed(2)}x, crop: {Math.round(crop.x)}, {Math.round(crop.y)},{' '}
        {Math.round(crop.width)} x {Math.round(crop.height)}
      </output>
    </div>
  );
}

export function RootProviderImageCropperExample() {
  const imageCropper = useImageCropper({ aspectRatio: 16 / 9 });

  return (
    <div className="cropper-stack">
      <ImageCropper.RootProvider value={imageCropper}>
        <ImageCropper.Viewport>
          <ImageCropper.Image src={sampleImage} crossOrigin="anonymous" />
          <ImageCropper.CropArea />
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