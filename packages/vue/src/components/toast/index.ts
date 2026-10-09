import { ToastContext, createToaster, useToastContext } from '@ark-ui/vue/toast';
import Toast from './Toast.vue';
import ToastActionTrigger from './ToastActionTrigger.vue';
import ToastCloseTrigger from './ToastCloseTrigger.vue';
import ToastDescription from './ToastDescription.vue';
import ToastTitle from './ToastTitle.vue';
import ToastToaster from './ToastToaster.vue';

export {
  Toast,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastContext,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
  useToastContext,
};

export type { Props as ToastRootProps } from './Toast.vue';
export type { Props as ToastActionTriggerProps } from './ToastActionTrigger.vue';
export type { Props as ToastCloseTriggerProps } from './ToastCloseTrigger.vue';
export type { Props as ToastDescriptionProps } from './ToastDescription.vue';
export type { Props as ToastTitleProps } from './ToastTitle.vue';
export type { Props as ToasterProps } from './ToastToaster.vue';

export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastActionOptions,
  ToastActionTriggerBaseProps,
  ToastCloseTriggerBaseProps,
  ToastContextProps,
  ToastDescriptionBaseProps,
  ToastPlacement,
  ToastPromiseOptions,
  ToastRootBaseProps,
  ToastStatus,
  ToastStatusChangeDetails,
  ToastStoreProps,
  ToastTitleBaseProps,
  ToastType,
  ToasterBaseProps,
  ToastOptions,
  UseToastContext,
} from '@ark-ui/vue/toast';