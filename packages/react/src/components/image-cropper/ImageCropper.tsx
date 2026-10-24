'use client';

import {
  ImageCropper as ImageCropperPrimitive,
  useImageCropper,
  useImageCropperContext,
} from '@ark-ui/react/image-cropper';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './ImageCropper.module.css';

const ImageCropperContext = ImageCropperPrimitive.Context;
const ImageCropperHandles = ImageCropperPrimitive.handles;

const ImageCropper = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Root>,
  ComponentProps<typeof ImageCropperPrimitive.Root>
>(function ImageCropper({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.viewport, className)}
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
      className={clsx(styles.image, className)}
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
      className={clsx(styles.selection, className)}
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
      className={clsx(styles.grid, className)}
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
      className={clsx(styles.handle, className)}
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