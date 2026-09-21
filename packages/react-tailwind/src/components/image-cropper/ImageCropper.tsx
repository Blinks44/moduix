'use client';

import {
  ImageCropper as ImageCropperPrimitive,
  useImageCropper,
  useImageCropperContext,
} from '@ark-ui/react/image-cropper';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const ImageCropper = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Root>,
  ComponentProps<typeof ImageCropperPrimitive.Root>
>(function ImageCropper({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Root
      ref={ref}
      className={cn(
        'box-border grid w-[32rem] max-w-full gap-3 text-foreground data-dragging:cursor-grabbing data-panning:cursor-grabbing',
        className,
      )}
      {...props}
      data-slot="image-cropper-root"
    />
  );
});

const ImageCropperRootProvider = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.RootProvider>,
  ComponentProps<typeof ImageCropperPrimitive.RootProvider>
>(function ImageCropperRootProvider({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.RootProvider
      ref={ref}
      className={cn(
        'box-border grid w-[32rem] max-w-full gap-3 text-foreground data-dragging:cursor-grabbing data-panning:cursor-grabbing',
        className,
      )}
      {...props}
      data-slot="image-cropper-root-provider"
    />
  );
});

const ImageCropperViewport = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Viewport>,
  ComponentProps<typeof ImageCropperPrimitive.Viewport>
>(function ImageCropperViewport({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Viewport
      ref={ref}
      className={cn(
        'box-border h-[min(20rem,62.5vw)] w-full overflow-hidden rounded-lg border border-border bg-background bg-[conic-gradient(rgb(0_0_0_/_8%)_25%,transparent_0_50%,rgb(0_0_0_/_8%)_0_75%,transparent_0)] [background-size:1rem_1rem] shadow-none data-disabled:cursor-grab',
        className,
      )}
      {...props}
      data-slot="image-cropper-viewport"
    />
  );
});

const ImageCropperImage = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Image>,
  ComponentProps<typeof ImageCropperPrimitive.Image>
>(function ImageCropperImage({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Image
      ref={ref}
      className={cn(
        'absolute inset-0 block size-full origin-center object-contain backface-hidden',
        className,
      )}
      {...props}
      data-slot="image-cropper-image"
    />
  );
});

const ImageCropperSelection = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Selection>,
  ComponentProps<typeof ImageCropperPrimitive.Selection>
>(function ImageCropperSelection({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Selection
      ref={ref}
      className={cn(
        'box-border cursor-grab rounded-md border-2 border-primary shadow-[0_0_0_9999px_rgb(0_0_0_/_45%),inset_0_0_0_1px_rgb(255_255_255_/_64%)] outline-0 transition-[border-color,box-shadow] duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-default data-dragging:cursor-grabbing data-[shape=circle]:rounded-full data-[shape=circle]:border-transparent motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="image-cropper-selection"
    />
  );
});

const ImageCropperGrid = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Grid>,
  ComponentProps<typeof ImageCropperPrimitive.Grid>
>(function ImageCropperGrid({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Grid
      ref={ref}
      className={cn(
        'pointer-events-none data-[axis=horizontal]:border-y data-[axis=horizontal]:border-white/62 data-[axis=vertical]:border-x data-[axis=vertical]:border-white/62',
        className,
      )}
      {...props}
      data-slot="image-cropper-grid"
    />
  );
});

const ImageCropperHandle = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Handle>,
  ComponentProps<typeof ImageCropperPrimitive.Handle>
>(function ImageCropperHandle({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Handle
      ref={ref}
      className={cn(
        'absolute z-1 box-border size-3 rounded-xs border border-white/88 bg-white/96 shadow-[0_1px_3px_rgb(15_23_42_/_18%)] transition-[border-color,background-color,box-shadow,opacity] duration-200 ease-in-out data-disabled:hidden data-[position=e]:!h-full data-[position=e]:!w-[0.2rem] data-[position=e]:rounded-full data-[position=e]:border-0 data-[position=n]:!h-[0.2rem] data-[position=n]:!w-full data-[position=n]:rounded-full data-[position=n]:border-0 data-[position=ne]:z-2 data-[position=nw]:z-2 data-[position=s]:!h-[0.2rem] data-[position=s]:!w-full data-[position=s]:rounded-full data-[position=s]:border-0 data-[position=se]:z-2 data-[position=sw]:z-2 data-[position=w]:!h-full data-[position=w]:!w-[0.2rem] data-[position=w]:rounded-full data-[position=w]:border-0 motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="image-cropper-handle"
    />
  );
});

const ImageCropperCropArea = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Selection>,
  Omit<ComponentProps<typeof ImageCropperPrimitive.Selection>, 'asChild' | 'children'> & {
    gridClassName?: string;
    handleClassName?: string;
  }
>(function ImageCropperCropArea({ gridClassName, handleClassName, ...props }, ref) {
  const {
    asChild: _asChild,
    children: _children,
    ...selectionProps
  } = props as ComponentProps<typeof ImageCropperPrimitive.Selection>;

  return (
    <ImageCropperSelection ref={ref} {...selectionProps}>
      <ImageCropperGrid axis="horizontal" className={gridClassName} />
      <ImageCropperGrid axis="vertical" className={gridClassName} />
      {ImageCropperHandles.map((position) => (
        <ImageCropperHandle key={position} position={position} className={handleClassName} />
      ))}
    </ImageCropperSelection>
  );
});

const ImageCropperContext = ImageCropperPrimitive.Context;
const ImageCropperHandles = ImageCropperPrimitive.handles;

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
