import {
  ImageCropper as ImageCropperPrimitive,
  useImageCropper,
  useImageCropperContext,
} from '@ark-ui/solid/image-cropper';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function ImageCropperRoot(props: ComponentProps<typeof ImageCropperPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Root
      data-slot="image-cropper-root"
      class={cn(
        'box-border grid w-[32rem] max-w-full gap-3 text-foreground data-dragging:cursor-grabbing data-panning:cursor-grabbing',
        local.class,
      )}
      {...others}
    />
  );
}

function ImageCropperRootProvider(
  props: ComponentProps<typeof ImageCropperPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.RootProvider
      data-slot="image-cropper-root-provider"
      class={cn(
        'box-border grid w-[32rem] max-w-full gap-3 text-foreground data-dragging:cursor-grabbing data-panning:cursor-grabbing',
        local.class,
      )}
      {...others}
    />
  );
}

function ImageCropperViewport(props: ComponentProps<typeof ImageCropperPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Viewport
      data-slot="image-cropper-viewport"
      class={cn(
        'box-border h-[min(20rem,62.5vw)] w-full overflow-hidden rounded-lg border border-border bg-background bg-[conic-gradient(rgb(0_0_0_/_8%)_25%,transparent_0_50%,rgb(0_0_0_/_8%)_0_75%,transparent_0)] [background-size:1rem_1rem] shadow-none data-disabled:cursor-grab',
        local.class,
      )}
      {...others}
    />
  );
}

function ImageCropperImage(props: ComponentProps<typeof ImageCropperPrimitive.Image>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Image
      data-slot="image-cropper-image"
      class={cn(
        'absolute inset-0 block size-full origin-center object-contain backface-hidden',
        local.class,
      )}
      {...others}
    />
  );
}

function ImageCropperSelection(props: ComponentProps<typeof ImageCropperPrimitive.Selection>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Selection
      data-slot="image-cropper-selection"
      class={cn(
        'box-border cursor-grab rounded-md border-2 border-primary shadow-[0_0_0_9999px_rgb(0_0_0_/_45%),inset_0_0_0_1px_rgb(255_255_255_/_64%)] outline-0 transition-[border-color,box-shadow] duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-default data-dragging:cursor-grabbing data-[shape=circle]:rounded-full data-[shape=circle]:border-transparent motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

function ImageCropperGrid(props: ComponentProps<typeof ImageCropperPrimitive.Grid>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Grid
      data-slot="image-cropper-grid"
      class={cn(
        'pointer-events-none data-[axis=horizontal]:border-y data-[axis=horizontal]:border-white/62 data-[axis=vertical]:border-x data-[axis=vertical]:border-white/62',
        local.class,
      )}
      {...others}
    />
  );
}

function ImageCropperHandle(props: ComponentProps<typeof ImageCropperPrimitive.Handle>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Handle
      data-slot="image-cropper-handle"
      class={cn(
        'absolute z-1 box-border size-3 rounded-xs border border-white/88 bg-white/96 shadow-[0_1px_3px_rgb(15_23_42_/_18%)] transition-[border-color,background-color,box-shadow,opacity] duration-200 ease-in-out data-disabled:hidden data-[position=e]:!h-full data-[position=e]:!w-[0.2rem] data-[position=e]:rounded-full data-[position=e]:border-0 data-[position=n]:!h-[0.2rem] data-[position=n]:!w-full data-[position=n]:rounded-full data-[position=n]:border-0 data-[position=ne]:z-2 data-[position=nw]:z-2 data-[position=s]:!h-[0.2rem] data-[position=s]:!w-full data-[position=s]:rounded-full data-[position=s]:border-0 data-[position=se]:z-2 data-[position=sw]:z-2 data-[position=w]:!h-full data-[position=w]:!w-[0.2rem] data-[position=w]:rounded-full data-[position=w]:border-0 motion-reduce:transition-none',
        local.class,
      )}
      {...others}
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

type ImageCropperCropAreaInternalProps = ImageCropperCropAreaProps & {
  asChild?: ComponentProps<typeof ImageCropperPrimitive.Selection>['asChild'];
  children?: ComponentProps<typeof ImageCropperPrimitive.Selection>['children'];
};

function ImageCropperCropArea(props: ImageCropperCropAreaProps) {
  const [local, others] = splitProps(props as ImageCropperCropAreaInternalProps, [
    'asChild',
    'children',
    'class',
    'gridClassName',
    'handleClassName',
  ]);

  return (
    <ImageCropperSelection class={local.class} {...others}>
      <ImageCropperGrid axis="horizontal" class={local.gridClassName} />
      <ImageCropperGrid axis="vertical" class={local.gridClassName} />
      {ImageCropperPrimitive.handles.map((position) => (
        <ImageCropperHandle position={position} class={local.handleClassName} />
      ))}
    </ImageCropperSelection>
  );
}

const ImageCropper = Object.assign(ImageCropperRoot, {
  Root: ImageCropperRoot,
  RootProvider: ImageCropperRootProvider,
  Context: ImageCropperPrimitive.Context,
  Viewport: ImageCropperViewport,
  Image: ImageCropperImage,
  Selection: ImageCropperSelection,
  Grid: ImageCropperGrid,
  Handle: ImageCropperHandle,
  CropArea: ImageCropperCropArea,
  handles: ImageCropperPrimitive.handles,
});

export { ImageCropper, useImageCropper, useImageCropperContext };