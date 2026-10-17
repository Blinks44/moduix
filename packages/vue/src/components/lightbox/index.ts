import { useDialog, useDialogContext } from '@ark-ui/vue/dialog';
import Lightbox from './Lightbox.vue';
import LightboxBackdrop from './LightboxBackdrop.vue';
import LightboxBind from './LightboxBind.vue';
import LightboxBody from './LightboxBody.vue';
import LightboxCloseIcon from './LightboxCloseIcon.vue';
import LightboxCloseTrigger from './LightboxCloseTrigger.vue';
import LightboxContent from './LightboxContent.vue';
import LightboxContext from './LightboxContext.vue';
import LightboxDescription from './LightboxDescription.vue';
import LightboxFooter from './LightboxFooter.vue';
import LightboxGallery from './LightboxGallery.vue';
import LightboxHeader from './LightboxHeader.vue';
import LightboxImage from './LightboxImage.vue';
import LightboxPositioner from './LightboxPositioner.vue';
import LightboxRootProvider from './LightboxRootProvider.vue';
import LightboxTitle from './LightboxTitle.vue';
import LightboxTrigger from './LightboxTrigger.vue';

export {
  Lightbox,
  LightboxBackdrop,
  LightboxBind,
  LightboxBody,
  LightboxCloseIcon,
  LightboxCloseTrigger,
  LightboxContent,
  LightboxContext,
  LightboxDescription,
  LightboxFooter,
  LightboxGallery,
  LightboxHeader,
  LightboxImage,
  LightboxPositioner,
  LightboxRootProvider,
  LightboxTitle,
  LightboxTrigger,
  useDialog as useLightbox,
  useDialogContext as useLightboxContext,
};

export type {
  DialogBackdropProps as LightboxBackdropProps,
  DialogCloseTriggerProps as LightboxCloseTriggerProps,
  DialogContentProps as LightboxContentProps,
  DialogContextProps as LightboxContextProps,
  DialogDescriptionProps as LightboxDescriptionProps,
  DialogPositionerProps as LightboxPositionerProps,
  DialogRootEmits as LightboxRootEmits,
  DialogRootProviderEmits as LightboxRootProviderEmits,
  DialogTitleProps as LightboxTitleProps,
  DialogTriggerProps as LightboxTriggerProps,
  UseDialogContext as UseLightboxContext,
  UseDialogProps as UseLightboxProps,
  UseDialogReturn as UseLightboxReturn,
} from '@ark-ui/vue/dialog';

export type { LightboxBindProps, LightboxImageSelectDetails } from './lightbox';
export type { Props as LightboxRootProps } from './Lightbox.vue';
export type { Props as LightboxRootProviderProps } from './LightboxRootProvider.vue';
export type { Props as LightboxImageProps } from './LightboxImage.vue';