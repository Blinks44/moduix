import {
  ImageCropper as ImageCropperPrimitive,
  useImageCropper,
  useImageCropperContext,
} from '@ark-ui/solid/image-cropper';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './ImageCropper.module.css';

function ImageCropperRoot(props: ComponentProps<typeof ImageCropperPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Root
      data-slot="image-cropper-root"
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function ImageCropperViewport(props: ComponentProps<typeof ImageCropperPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Viewport
      data-slot="image-cropper-viewport"
      class={clsx(styles.viewport, local.class)}
      {...others}
    />
  );
}

function ImageCropperImage(props: ComponentProps<typeof ImageCropperPrimitive.Image>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Image
      data-slot="image-cropper-image"
      class={clsx(styles.image, local.class)}
      {...others}
    />
  );
}

function ImageCropperSelection(props: ComponentProps<typeof ImageCropperPrimitive.Selection>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Selection
      data-slot="image-cropper-selection"
      class={clsx(styles.selection, local.class)}
      {...others}
    />
  );
}

function ImageCropperGrid(props: ComponentProps<typeof ImageCropperPrimitive.Grid>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Grid
      data-slot="image-cropper-grid"
      class={clsx(styles.grid, local.class)}
      {...others}
    />
  );
}

function ImageCropperHandle(props: ComponentProps<typeof ImageCropperPrimitive.Handle>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Handle
      data-slot="image-cropper-handle"
      class={clsx(styles.handle, local.class)}
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