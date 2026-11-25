import { createToaster } from '@ark-ui/svelte/toast';
import type { CreateToasterReturn, ToastOptions } from '@ark-ui/svelte/toast';
import type { Snippet } from 'svelte';

export type ToastMessage = string | Snippet;
export type ToastHelperOptions = Omit<ToastOptions, 'title' | 'description'> & {
  title?: ToastMessage;
  description?: ToastMessage;
};
export type ToastMessageOptions = Omit<ToastHelperOptions, 'title' | 'type'>;

function isToastOptions(value: ToastMessage | ToastHelperOptions): value is ToastHelperOptions {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype &&
    !('$$typeof' in value) &&
    !('__v_isVNode' in value)
  );
}

function toToastOptions(
  input: ToastMessage | ToastHelperOptions,
  options?: Omit<ToastHelperOptions, 'title'>,
): ToastHelperOptions {
  if (isToastOptions(input)) {
    return options ? { ...input, ...options } : input;
  }

  return { ...options, title: input };
}

export const defaultToaster: CreateToasterReturn<ToastMessage> = createToaster<ToastMessage>({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
});

function createTypedToast(
  type: ToastHelperOptions['type'],
  input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
  options?: ToastMessageOptions,
) {
  return defaultToaster.create({ ...toToastOptions(input, options), type });
}

export interface ToastHelper {
  (input: ToastMessage | ToastHelperOptions, options?: Omit<ToastHelperOptions, 'title'>): string;
  create: (
    input: ToastMessage | ToastHelperOptions,
    options?: Omit<ToastHelperOptions, 'title'>,
  ) => string;
  success: (
    input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  error: (
    input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  info: (
    input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  warning: (
    input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  loading: (
    input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  promise: CreateToasterReturn<ToastMessage>['promise'];
  dismiss: CreateToasterReturn<ToastMessage>['dismiss'];
  remove: CreateToasterReturn<ToastMessage>['remove'];
  update: CreateToasterReturn<ToastMessage>['update'];
  pause: CreateToasterReturn<ToastMessage>['pause'];
  resume: CreateToasterReturn<ToastMessage>['resume'];
  isVisible: CreateToasterReturn<ToastMessage>['isVisible'];
  isDismissed: CreateToasterReturn<ToastMessage>['isDismissed'];
  getVisibleToasts: CreateToasterReturn<ToastMessage>['getVisibleToasts'];
  getCount: CreateToasterReturn<ToastMessage>['getCount'];
  expand: CreateToasterReturn<ToastMessage>['expand'];
  collapse: CreateToasterReturn<ToastMessage>['collapse'];
  toaster: CreateToasterReturn<ToastMessage>;
}

export const toast: ToastHelper = Object.assign(
  (input: ToastMessage | ToastHelperOptions, options?: Omit<ToastHelperOptions, 'title'>) =>
    defaultToaster.create(toToastOptions(input, options)),
  {
    create: (
      input: ToastMessage | ToastHelperOptions,
      options?: Omit<ToastHelperOptions, 'title'>,
    ) => defaultToaster.create(toToastOptions(input, options)),
    success: (
      input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
      options?: ToastMessageOptions,
    ) => createTypedToast('success', input, options),
    error: (
      input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
      options?: ToastMessageOptions,
    ) => createTypedToast('error', input, options),
    info: (input: ToastMessage | Omit<ToastHelperOptions, 'type'>, options?: ToastMessageOptions) =>
      createTypedToast('info', input, options),
    warning: (
      input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
      options?: ToastMessageOptions,
    ) => createTypedToast('warning', input, options),
    loading: (
      input: ToastMessage | Omit<ToastHelperOptions, 'type'>,
      options?: ToastMessageOptions,
    ) => createTypedToast('loading', input, options),
    promise: defaultToaster.promise,
    dismiss: defaultToaster.dismiss,
    remove: defaultToaster.remove,
    update: defaultToaster.update,
    pause: defaultToaster.pause,
    resume: defaultToaster.resume,
    isVisible: defaultToaster.isVisible,
    isDismissed: defaultToaster.isDismissed,
    getVisibleToasts: defaultToaster.getVisibleToasts,
    getCount: defaultToaster.getCount,
    expand: defaultToaster.expand,
    collapse: defaultToaster.collapse,
    toaster: defaultToaster,
  },
);