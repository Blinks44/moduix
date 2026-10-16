import {
  ImageCropper as ImageCropperPrimitive,
  useImageCropper,
  useImageCropperContext,
} from '@ark-ui/solid/image-cropper';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

const ImageCropperContext = ImageCropperPrimitive.Context;
const ImageCropperHandles = ImageCropperPrimitive.handles;
const imageCropperRootClass =
  'box-border grid w-[32rem] max-w-full gap-3 data-dragging:cursor-grabbing data-panning:cursor-grabbing';

function ImageCropper(props: ComponentProps<typeof ImageCropperPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Root
      class={cn(imageCropperRootClass, local.class)}
      {...others}
      data-slot="image-cropper-root"
    />
  );
}

function ImageCropperRootProvider(
  props: ComponentProps<typeof ImageCropperPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.RootProvider
      class={cn(imageCropperRootClass, local.class)}
      {...others}
      data-slot="image-cropper-root-provider"
    />
  );
}

function ImageCropperViewport(props: ComponentProps<typeof ImageCropperPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Viewport
      class={cn(
        'box-border aspect-[8/5] w-full rounded-lg border border-border [background:repeating-conic-gradient(var(--color-muted)_0_25%,var(--color-background)_0_50%)_0_0/1rem_1rem] data-disabled:cursor-grab',
        local.class,
      )}
      {...others}
      data-slot="image-cropper-viewport"
    />
  );
}

function ImageCropperImage(props: ComponentProps<typeof ImageCropperPrimitive.Image>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Image
      class={cn('absolute inset-0 m-auto block max-h-full max-w-full', local.class)}
      {...others}
      data-slot="image-cropper-image"
    />
  );
}

function ImageCropperSelection(props: ComponentProps<typeof ImageCropperPrimitive.Selection>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Selection
      class={cn(
        'box-border cursor-grab rounded-md border-2 border-primary shadow-[0_0_0_9999px_rgb(0_0_0_/_45%),inset_0_0_0_1px_rgb(255_255_255_/_64%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-default data-dragging:cursor-grabbing data-[shape=circle]:rounded-full data-[shape=circle]:border-transparent',
        local.class,
      )}
      {...others}
      data-slot="image-cropper-selection"
    />
  );
}

function ImageCropperGrid(props: ComponentProps<typeof ImageCropperPrimitive.Grid>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Grid
      class={cn(
        'border-white/62 data-[axis=horizontal]:border-y data-[axis=vertical]:border-x',
        local.class,
      )}
      {...others}
      data-slot="image-cropper-grid"
    />
  );
}

function ImageCropperHandle(props: ComponentProps<typeof ImageCropperPrimitive.Handle>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Handle
      class={cn(
        'size-3 rounded-xs bg-white/96 shadow-[0_1px_3px_rgb(15_23_42_/_18%)] data-disabled:hidden data-[position=e]:w-[0.2rem] data-[position=e]:rounded-full data-[position=n]:h-[0.2rem] data-[position=n]:rounded-full data-[position=ne]:z-1 data-[position=nw]:z-1 data-[position=s]:h-[0.2rem] data-[position=s]:rounded-full data-[position=se]:z-1 data-[position=sw]:z-1 data-[position=w]:w-[0.2rem] data-[position=w]:rounded-full',
        local.class,
      )}
      {...others}
      data-slot="image-cropper-handle"
    />
  );
}

type ImageCropperCropAreaProps = Omit<
  ComponentProps<typeof ImageCropperPrimitive.Selection>,
  'asChild' | 'children'
> & {
  gridClassName?: string;
  handleClassName?: string;
};

function ImageCropperCropArea(props: ImageCropperCropAreaProps) {
  const [local, others] = splitProps(props, ['gridClassName', 'handleClassName']);

  return (
    <ImageCropperSelection {...others}>
      <ImageCropperGrid axis="horizontal" class={local.gridClassName} />
      <ImageCropperGrid axis="vertical" class={local.gridClassName} />
      {ImageCropperHandles.map((position) => (
        <ImageCropperHandle position={position} class={local.handleClassName} />
      ))}
    </ImageCropperSelection>
  );
}

export {
  ImageCropper,
  ImageCropperContext,
  ImageCropperCropArea,
  ImageCropperGrid,
  ImageCropperHandle,
  ImageCropperHandles,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperSelection,
  ImageCropperViewport,
  useImageCropper,
  useImageCropperContext,
};
export type { ImageCropperCropAreaProps };

export type {
  ImageCropperContextProps,
  ImageCropperCropChangeDetails,
  ImageCropperFlipChangeDetails,
  ImageCropperFlipState,
  ImageCropperGridProps,
  ImageCropperHandlePosition,
  ImageCropperHandleProps,
  ImageCropperImageProps,
  ImageCropperRootProps,
  ImageCropperRootProviderProps,
  ImageCropperRotationChangeDetails,
  ImageCropperSelectionProps,
  ImageCropperViewportProps,
  ImageCropperZoomChangeDetails,
  UseImageCropperContext,
  UseImageCropperProps,
  UseImageCropperReturn,
} from '@ark-ui/solid/image-cropper';