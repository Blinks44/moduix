import { createToaster } from '@ark-ui/vue/toast';
import type { CreateToasterReturn, ToastOptions } from '@ark-ui/vue/toast';

export type ToastMessage = ToastOptions['title'];
export type ToastMessageOptions = Omit<ToastOptions, 'title' | 'type'>;

function isToastOptions(value: ToastMessage | ToastOptions): value is ToastOptions {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype &&
    !('$$typeof' in value) &&
    !('__v_isVNode' in value)
  );
}

function toToastOptions(
  input: ToastMessage | ToastOptions,
  options?: Omit<ToastOptions, 'title'>,
): ToastOptions {
  if (isToastOptions(input)) {
    return options ? { ...input, ...options } : input;
  }

  return { ...options, title: input };
}

export const defaultToaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
});

function createTypedToast(
  type: ToastOptions['type'],
  input: ToastMessage | Omit<ToastOptions, 'type'>,
  options?: ToastMessageOptions,
) {
  return defaultToaster.create({ ...toToastOptions(input, options), type });
}

export interface ToastHelper {
  (input: ToastMessage | ToastOptions, options?: Omit<ToastOptions, 'title'>): string;
  create: (input: ToastMessage | ToastOptions, options?: Omit<ToastOptions, 'title'>) => string;
  success: (
    input: ToastMessage | Omit<ToastOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  error: (
    input: ToastMessage | Omit<ToastOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  info: (input: ToastMessage | Omit<ToastOptions, 'type'>, options?: ToastMessageOptions) => string;
  warning: (
    input: ToastMessage | Omit<ToastOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  loading: (
    input: ToastMessage | Omit<ToastOptions, 'type'>,
    options?: ToastMessageOptions,
  ) => string;
  promise: CreateToasterReturn['promise'];
  dismiss: CreateToasterReturn['dismiss'];
  remove: CreateToasterReturn['remove'];
  update: CreateToasterReturn['update'];
  pause: CreateToasterReturn['pause'];
  resume: CreateToasterReturn['resume'];
  isVisible: CreateToasterReturn['isVisible'];
  isDismissed: CreateToasterReturn['isDismissed'];
  getVisibleToasts: CreateToasterReturn['getVisibleToasts'];
  getCount: CreateToasterReturn['getCount'];
  expand: CreateToasterReturn['expand'];
  collapse: CreateToasterReturn['collapse'];
  toaster: CreateToasterReturn;
}

export const toast: ToastHelper = Object.assign(
  (input: ToastMessage | ToastOptions, options?: Omit<ToastOptions, 'title'>) =>
    defaultToaster.create(toToastOptions(input, options)),
  {
    create: (input: ToastMessage | ToastOptions, options?: Omit<ToastOptions, 'title'>) =>
      defaultToaster.create(toToastOptions(input, options)),
    success: (input: ToastMessage | Omit<ToastOptions, 'type'>, options?: ToastMessageOptions) =>
      createTypedToast('success', input, options),
    error: (input: ToastMessage | Omit<ToastOptions, 'type'>, options?: ToastMessageOptions) =>
      createTypedToast('error', input, options),
    info: (input: ToastMessage | Omit<ToastOptions, 'type'>, options?: ToastMessageOptions) =>
      createTypedToast('info', input, options),
    warning: (input: ToastMessage | Omit<ToastOptions, 'type'>, options?: ToastMessageOptions) =>
      createTypedToast('warning', input, options),
    loading: (input: ToastMessage | Omit<ToastOptions, 'type'>, options?: ToastMessageOptions) =>
      createTypedToast('loading', input, options),
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