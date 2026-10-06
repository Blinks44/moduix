import { ImageCropperCropArea } from '@moduix/react/image-cropper';
import type { ComponentProps } from 'react';

type CropAreaProps = ComponentProps<typeof ImageCropperCropArea>;

export const cropAreaDoesNotExposeCompositionProps: Extract<
  keyof CropAreaProps,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;