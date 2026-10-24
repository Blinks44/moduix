import { useDialog, useDialogContext } from '@ark-ui/vue/dialog';
import Dialog from './Dialog.vue';
import DialogBackdrop from './DialogBackdrop.vue';
import DialogBody from './DialogBody.vue';
import DialogCloseIcon from './DialogCloseIcon.vue';
import DialogCloseTrigger from './DialogCloseTrigger.vue';
import DialogContent from './DialogContent.vue';
import DialogContext from './DialogContext.vue';
import DialogDescription from './DialogDescription.vue';
import DialogFooter from './DialogFooter.vue';
import DialogHeader from './DialogHeader.vue';
import DialogPositioner from './DialogPositioner.vue';
import DialogRootProvider from './DialogRootProvider.vue';
import DialogTitle from './DialogTitle.vue';
import DialogTrigger from './DialogTrigger.vue';

export {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContent,
  DialogContext,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
  useDialog,
  useDialogContext,
};

export type {
  DialogBackdropProps,
  DialogCloseTriggerProps,
  DialogContextProps,
  DialogDescriptionProps,
  DialogFocusOutsideEvent,
  DialogInteractOutsideEvent,
  DialogOpenChangeDetails,
  DialogPointerDownOutsideEvent,
  DialogPositionerProps,
  DialogRootEmits,
  DialogRootProviderEmits,
  DialogTitleProps,
  DialogTriggerProps,
  DialogTriggerValueChangeDetails,
  UseDialogContext,
  UseDialogProps,
  UseDialogReturn,
} from '@ark-ui/vue/dialog';

export type { Props as DialogRootProps } from './Dialog.vue';
export type { Props as DialogRootProviderProps } from './DialogRootProvider.vue';
export type {
  Props as DialogContentProps,
  DialogPlacement,
  DialogScrollBehavior,
  DialogSize,
} from './DialogContent.vue';