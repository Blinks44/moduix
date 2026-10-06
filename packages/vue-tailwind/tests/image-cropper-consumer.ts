import { ImageCropperCropArea } from '@moduix/vue-tailwind/image-cropper';

type CropAreaProps = InstanceType<typeof ImageCropperCropArea>['$props'];

export const cropAreaDoesNotExposeCompositionProps: Extract<
  keyof CropAreaProps,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;