import { ImageCropperCropArea } from '@moduix/solid/image-cropper';
import type { ComponentProps } from 'solid-js';

type CropAreaProps = ComponentProps<typeof ImageCropperCropArea>;

export const cropAreaDoesNotExposeCompositionProps: Extract<
  keyof CropAreaProps,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;