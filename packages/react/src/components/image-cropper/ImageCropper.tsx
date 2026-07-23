import {
  ImageCropper as ImageCropperPrimitive,
  useImageCropper,
  useImageCropperContext,
} from '@ark-ui/react/image-cropper';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './ImageCropper.module.css';

const ImageCropperRoot = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Root>,
  ComponentProps<typeof ImageCropperPrimitive.Root>
>(function ImageCropperRoot({ className, ...props }, ref) {
  return (
    <ImageCropperPrimitive.Root
      ref={ref}
      data-slot="image-cropper-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="image-cropper-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="image-cropper-viewport"
      className={clsx(styles.viewport, normalizeClassName(className))}
      {...props}
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
      data-slot="image-cropper-image"
      className={clsx(styles.image, normalizeClassName(className))}
      {...props}
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
      data-slot="image-cropper-selection"
      className={clsx(styles.selection, normalizeClassName(className))}
      {...props}
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
      data-slot="image-cropper-grid"
      className={clsx(styles.grid, normalizeClassName(className))}
      {...props}
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
      data-slot="image-cropper-handle"
      className={clsx(styles.handle, normalizeClassName(className))}
      {...props}
    />
  );
});

const ImageCropperCropArea = forwardRef<
  ComponentRef<typeof ImageCropperPrimitive.Selection>,
  ComponentProps<typeof ImageCropperPrimitive.Selection> & {
    gridClassName?: string;
    handleClassName?: string;
  }
>(function ImageCropperCropArea({ gridClassName, handleClassName, ...props }, ref) {
  return (
    <ImageCropperSelection ref={ref} {...props}>
      <ImageCropperGrid axis="horizontal" className={gridClassName} />
      <ImageCropperGrid axis="vertical" className={gridClassName} />
      {ImageCropperPrimitive.handles.map((position) => (
        <ImageCropperHandle key={position} position={position} className={handleClassName} />
      ))}
    </ImageCropperSelection>
  );
});

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