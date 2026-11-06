export {
  DialogContext as LightboxContext,
  useDialog as useLightbox,
  useDialogContext as useLightboxContext,
} from '@ark-ui/svelte/dialog';
export { default as Lightbox } from './Lightbox.svelte';
export { default as LightboxBackdrop } from './LightboxBackdrop.svelte';
export { default as LightboxBind } from './LightboxBind.svelte';
export { default as LightboxBody } from './LightboxBody.svelte';
export { default as LightboxCloseIcon } from './LightboxCloseIcon.svelte';
export { default as LightboxCloseTrigger } from './LightboxCloseTrigger.svelte';
export { default as LightboxContent } from './LightboxContent.svelte';
export { default as LightboxDescription } from './LightboxDescription.svelte';
export { default as LightboxFooter } from './LightboxFooter.svelte';
export { default as LightboxGallery } from './LightboxGallery.svelte';
export { default as LightboxHeader } from './LightboxHeader.svelte';
export { default as LightboxImage } from './LightboxImage.svelte';
export { default as LightboxPositioner } from './LightboxPositioner.svelte';
export { default as LightboxRootProvider } from './LightboxRootProvider.svelte';
export { default as LightboxTitle } from './LightboxTitle.svelte';
export { default as LightboxTrigger } from './LightboxTrigger.svelte';

export type {
  DialogBackdropProps as LightboxBackdropProps,
  DialogCloseTriggerProps as LightboxCloseTriggerProps,
  DialogContentProps as LightboxContentProps,
  DialogContextProps as LightboxContextProps,
  DialogDescriptionProps as LightboxDescriptionProps,
  DialogPositionerProps as LightboxPositionerProps,
  DialogTitleProps as LightboxTitleProps,
  DialogTriggerProps as LightboxTriggerProps,
  UseDialogContext as UseLightboxContext,
  UseDialogProps as UseLightboxProps,
  UseDialogReturn as UseLightboxReturn,
} from '@ark-ui/svelte/dialog';
export type { LightboxBindProps, LightboxImageSelectDetails } from './lightbox';
export type { LightboxRootProps } from './Lightbox.svelte';
export type { LightboxRootProviderProps } from './LightboxRootProvider.svelte';
export type { LightboxImageProps } from './LightboxImage.svelte';