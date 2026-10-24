'use client';

import {
  ImageCropper as ImageCropperPrimitive,
  useImageCropper,
  useImageCropperContext,
} from '@ark-ui/react/image-cropper';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const ImageCropperContext = ImageCropperPrimitive.Context;
const ImageCropperHandles = ImageCropperPrimitive.handles;
const imageCropperRootClass =
  'grid w-[32rem] max-w-full gap-3 data-dragging:cursor-grabbing data-panning:cursor-grabbing';

const ImageCropper = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Root>,
  ComponentProps<typeof ImageCropperPrimitive.Root>
>(function ImageCropper({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Root
      ref={ref}
      className={cn(imageCropperRootClass, className)}
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
      className={cn(imageCropperRootClass, className)}
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
        'aspect-[8/5] w-full rounded-lg border border-border [background:repeating-conic-gradient(var(--color-muted)_0_25%,var(--color-background)_0_50%)_0_0/1rem_1rem] data-disabled:cursor-grab',
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
      className={cn('absolute inset-0 m-auto block max-h-full max-w-full', className)}
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
        'cursor-grab rounded-md border-2 border-primary shadow-[0_0_0_9999px_rgb(0_0_0_/_45%),inset_0_0_0_1px_rgb(255_255_255_/_64%)] focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring data-disabled:cursor-default data-dragging:cursor-grabbing data-[shape=circle]:rounded-full data-[shape=circle]:border-transparent',
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
        'border-white/62 data-[axis=horizontal]:border-y data-[axis=vertical]:border-x',
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
        'size-3 rounded-xs bg-white/96 shadow-[0_1px_3px_rgb(15_23_42_/_18%)] data-disabled:hidden data-[position=e]:w-[0.2rem] data-[position=e]:rounded-full data-[position=n]:h-[0.2rem] data-[position=n]:rounded-full data-[position=ne]:z-1 data-[position=nw]:z-1 data-[position=s]:h-[0.2rem] data-[position=s]:rounded-full data-[position=se]:z-1 data-[position=sw]:z-1 data-[position=w]:w-[0.2rem] data-[position=w]:rounded-full',
        className,
      )}
      {...props}
      data-slot="image-cropper-handle"
    />
  );
});

type ImageCropperCropAreaProps = Omit<
  ComponentProps<typeof ImageCropperPrimitive.Selection>,
  'asChild' | 'children'
> & {
  gridClassName?: string;
  handleClassName?: string;
};

const ImageCropperCropArea = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Selection>,
  ImageCropperCropAreaProps
>(function ImageCropperCropArea({ gridClassName, handleClassName, ...props }, ref) {
  return (
    <ImageCropperSelection ref={ref} {...props}>
      <ImageCropperGrid axis="horizontal" className={gridClassName} />
      <ImageCropperGrid axis="vertical" className={gridClassName} />
      {ImageCropperHandles.map((position) => (
        <ImageCropperHandle key={position} position={position} className={handleClassName} />
      ))}
    </ImageCropperSelection>
  );
});

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
} from '@ark-ui/react/image-cropper';