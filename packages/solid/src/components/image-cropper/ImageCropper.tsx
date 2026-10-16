import {
  ImageCropper as ImageCropperPrimitive,
  useImageCropper,
  useImageCropperContext,
} from '@ark-ui/solid/image-cropper';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './ImageCropper.module.css';

const ImageCropperContext = ImageCropperPrimitive.Context;
const ImageCropperHandles = ImageCropperPrimitive.handles;

function ImageCropper(props: ComponentProps<typeof ImageCropperPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Root
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="image-cropper-root-provider"
    />
  );
}

function ImageCropperViewport(props: ComponentProps<typeof ImageCropperPrimitive.Viewport>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Viewport
      class={clsx(styles.viewport, local.class)}
      {...others}
      data-slot="image-cropper-viewport"
    />
  );
}

function ImageCropperImage(props: ComponentProps<typeof ImageCropperPrimitive.Image>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Image
      class={clsx(styles.image, local.class)}
      {...others}
      data-slot="image-cropper-image"
    />
  );
}

function ImageCropperSelection(props: ComponentProps<typeof ImageCropperPrimitive.Selection>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Selection
      class={clsx(styles.selection, local.class)}
      {...others}
      data-slot="image-cropper-selection"
    />
  );
}

function ImageCropperGrid(props: ComponentProps<typeof ImageCropperPrimitive.Grid>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Grid
      class={clsx(styles.grid, local.class)}
      {...others}
      data-slot="image-cropper-grid"
    />
  );
}

function ImageCropperHandle(props: ComponentProps<typeof ImageCropperPrimitive.Handle>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ImageCropperPrimitive.Handle
      class={clsx(styles.handle, local.class)}
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