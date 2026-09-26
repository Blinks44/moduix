import { createSignal, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import {
  ImageCropper,
  ImageCropperContext,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '@/components/image-cropper/ImageCropper';
import {
  FlipHorizontalIcon,
  RestartIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/internal/icons/ui/Icons';
import { cn } from '@/lib/moduix/cn';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
const stackClass = 'grid w-[min(32rem,calc(100vw-2rem))] gap-3';
const toolbarClass =
  'inline-flex w-fit flex-wrap items-center gap-1 rounded-lg border border-border bg-muted p-1';
const buttonClass =
  'inline-flex min-h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent bg-transparent px-3 text-muted-foreground [font:inherit] transition-[border-color,background-color,box-shadow,color] duration-200 ease-in-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring';
const iconButtonClass = 'size-8 px-0 [&_svg]:size-4';
const outputClass = 'text-xs leading-4 text-muted-foreground';
const previewClass =
  'grid size-32 place-items-center overflow-hidden rounded-md border border-border bg-muted [&>img]:size-full [&>img]:object-cover';
const customSelectionClass =
  'border-destructive shadow-[0_0_0_9999px_rgb(15_23_42_/_55%),inset_0_0_0_1px_rgb(255_255_255_/_64%)]';

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
type ImageCropperProps = ComponentProps<typeof ImageCropper>;
type CropperCanvasProps = Omit<ImageCropperProps, 'children'> & {
  cropAreaClass?: string;
};

function CropperCanvas(props: CropperCanvasProps) {
  const [local, others] = splitProps(props, ['cropAreaClass']);

  return (
    <ImageCropper {...others}>
      <ImageCropperViewport>
        <ImageCropperImage src={sampleImage} crossOrigin="anonymous" />
        <ImageCropperCropArea class={local.cropAreaClass} />
      </ImageCropperViewport>
    </ImageCropper>
  );
}

export const Basic: Story = {
  render: () => <CropperCanvas />,
};

export const AspectRatio: Story = {
  render: () => <CropperCanvas aspectRatio={1} cropShape="circle" />,
};

export const FixedCropArea: Story = {
  render: () => (
    <CropperCanvas
      fixedCropArea
      cropShape="circle"
      aspectRatio={1}
      initialCrop={{ x: 112, y: 64, width: 220, height: 220 }}
    />
  ),
};

export const ControlledZoom: Story = {
  render: () => {
    const [zoom, setZoom] = createSignal(1);

    return (
      <div class={stackClass}>
        <div class={toolbarClass}>
          <button
            class={cn(buttonClass, iconButtonClass)}
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((value) => Math.max(0.5, value - 0.1))}
          >
            <ZoomOutIcon />
          </button>
          <output class={outputClass}>{zoom().toFixed(1)}x</output>
          <button
            class={cn(buttonClass, iconButtonClass)}
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((value) => Math.min(3, value + 0.1))}
          >
            <ZoomInIcon />
          </button>
        </div>
        <CropperCanvas
          zoom={zoom()}
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
    <div class={stackClass}>
      <ImageCropper>
        <ImageCropperContext>
          {(context) => (
            <div class={toolbarClass}>
              <button
                class={cn(buttonClass, iconButtonClass)}
                type="button"
                aria-label="Zoom out"
                onClick={() => context().zoomBy(-0.1)}
              >
                <ZoomOutIcon />
              </button>
              <button
                class={cn(buttonClass, iconButtonClass)}
                type="button"
                aria-label="Zoom in"
                onClick={() => context().zoomBy(0.1)}
              >
                <ZoomInIcon />
              </button>
              <button
                class={cn(buttonClass, iconButtonClass)}
                type="button"
                aria-label="Rotate counterclockwise"
                onClick={() => context().rotateBy(-90)}
              >
                <RotateCcwIcon />
              </button>
              <button
                class={cn(buttonClass, iconButtonClass)}
                type="button"
                aria-label="Rotate clockwise"
                onClick={() => context().rotateBy(90)}
              >
                <RotateCwIcon />
              </button>
              <button
                class={cn(buttonClass, iconButtonClass)}
                type="button"
                aria-label="Flip horizontally"
                onClick={() => context().flipHorizontally()}
              >
                <FlipHorizontalIcon />
              </button>
              <button
                class={cn(buttonClass, iconButtonClass)}
                type="button"
                aria-label="Reset crop"
                onClick={() => context().reset()}
              >
                <RestartIcon />
              </button>
            </div>
          )}
        </ImageCropperContext>
        <ImageCropperViewport>
          <ImageCropperImage src={sampleImage} crossOrigin="anonymous" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropper>
    </div>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const imageCropper = useImageCropper({ aspectRatio: 16 / 9 });

    return (
      <div class={stackClass}>
        <ImageCropperRootProvider value={imageCropper}>
          <ImageCropperViewport>
            <ImageCropperImage src={sampleImage} crossOrigin="anonymous" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropperRootProvider>
        <button
          class={cn(buttonClass, iconButtonClass)}
          type="button"
          aria-label="Reset crop"
          onClick={() => imageCropper().reset()}
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
    const [preview, setPreview] = createSignal<string>();

    const handleCrop = async () => {
      const result = await imageCropper().getCroppedImage({ output: 'dataUrl' });
      if (typeof result === 'string') setPreview(result);
    };

    return (
      <div class={stackClass}>
        <ImageCropperRootProvider value={imageCropper}>
          <ImageCropperViewport>
            <ImageCropperImage src={sampleImage} crossOrigin="anonymous" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropperRootProvider>
        <Button type="button" onClick={handleCrop}>
          Crop image
        </Button>
        <div class={previewClass}>{preview() ? <img src={preview()} alt="" /> : null}</div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <CropperCanvas
      cropAreaClass={customSelectionClass}
      initialCrop={{ x: 80, y: 60, width: 240, height: 180 }}
    />
  ),
};