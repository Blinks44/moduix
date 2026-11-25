import {
  Toast as ToastPrimitive,
  Toaster as ToasterPrimitive,
  createToaster,
  useToastContext,
  type CreateToasterReturn,
  type ToastOptions,
} from '@ark-ui/solid/toast';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps } from 'solid-js';
import { children as resolveChildren, Show, splitProps } from 'solid-js';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import { OverlayPortal, type OverlayPortalProps } from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import { Spinner } from '../spinner';
import styles from './Toast.module.css';

type ToastMessage = ToastOptions['title'];
type ToastMessageOptions = Omit<ToastOptions, 'title' | 'type'>;

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

const defaultToaster = createToaster({
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

interface ToastHelper {
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

const toast: ToastHelper = Object.assign(
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

type ToasterProps = Omit<ComponentProps<typeof ToasterPrimitive>, 'children' | 'toaster'> &
  OverlayPortalProps & {
    children?: ComponentProps<typeof ToasterPrimitive>['children'];
    toaster?: ComponentProps<typeof ToasterPrimitive>['toaster'];
  };

function ToastToaster(props: ToasterProps) {
  const [local, others] = splitProps(props, [
    'children',
    'class',
    'portalRef',
    'portalled',
    'toaster',
  ]);

  return (
    <OverlayPortal portalled={local.portalled} portalRef={local.portalRef}>
      <ToasterPrimitive
        class={clsx(styles.toaster, local.class)}
        toaster={local.toaster ?? defaultToaster}
        {...others}
        data-slot="toast-toaster"
        children={local.children ?? ((toast) => <DefaultToast toast={toast} />)}
      />
    </OverlayPortal>
  );
}

function DefaultToast(props: { toast: Accessor<ToastOptions> }) {
  return (
    <Toast>
      {props.toast().title != null ? (
        <ToastTitle>
          {props.toast().type === 'loading' ? <Spinner decorative size="sm" /> : null}
          {props.toast().title}
        </ToastTitle>
      ) : null}
      {props.toast().description != null ? <ToastDescription /> : null}
      {props.toast().action != null ? (
        <ToastActionTrigger>{props.toast().action?.label}</ToastActionTrigger>
      ) : null}
      {props.toast().closable !== false ? <ToastCloseTrigger /> : null}
    </Toast>
  );
}

function Toast(props: ComponentProps<typeof ToastPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ToastPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="toast-root"
    />
  );
}

function ToastTitle(props: ComponentProps<typeof ToastPrimitive.Title>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);
  const toast = useToastContext();

  return (
    <ToastPrimitive.Title
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="toast-title"
    >
      {resolvedChildren() === undefined ? toast().title : resolvedChildren()}
    </ToastPrimitive.Title>
  );
}

function ToastDescription(props: ComponentProps<typeof ToastPrimitive.Description>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);
  const toast = useToastContext();

  return (
    <ToastPrimitive.Description
      class={clsx(styles.description, local.class)}
      {...others}
      data-slot="toast-description"
    >
      {resolvedChildren() === undefined ? toast().description : resolvedChildren()}
    </ToastPrimitive.Description>
  );
}

function ToastActionTrigger(props: ComponentProps<typeof ToastPrimitive.ActionTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ToastPrimitive.ActionTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.actionTrigger, local.class)}
      {...others}
      data-slot="toast-action-trigger"
    >
      {local.children}
    </ToastPrimitive.ActionTrigger>
  );
}

function ToastCloseTrigger(props: ComponentProps<typeof ToastPrimitive.CloseTrigger>) {
  const labels = useA11yLabels();
  const [local, others] = splitProps(props, ['aria-label', 'asChild', 'children', 'class']);
  const ariaLabel = () => local['aria-label'] ?? labels().closeToast;

  return (
    <Show
      when={local.asChild}
      fallback={
        <ToastPrimitive.CloseTrigger
          asChild={(triggerProps) => (
            <CloseButton
              {...triggerProps()}
              data-slot="toast-close-trigger"
              aria-label={ariaLabel()}
              class={clsx(styles.closeTrigger, local.class)}
            >
              {local.children}
            </CloseButton>
          )}
          {...others}
        />
      }
    >
      <ToastPrimitive.CloseTrigger
        asChild={local.asChild}
        aria-label={ariaLabel()}
        class={local.class}
        {...others}
        data-slot="toast-close-trigger"
      >
        {local.children}
      </ToastPrimitive.CloseTrigger>
    </Show>
  );
}

const ToastContext = ToastPrimitive.Context;

export {
  Toast,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastContext,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
  toast,
  useToastContext,
};

export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastActionOptions,
  ToastActionTriggerProps,
  ToastCloseTriggerProps,
  ToastContextProps,
  ToastDescriptionProps,
  ToastOptions,
  ToastPlacement,
  ToastPromiseOptions,
  ToastRootProps,
  ToastStatus,
  ToastStatusChangeDetails,
  ToastTitleProps,
  ToastType,
  UseToastContext,
} from '@ark-ui/solid/toast';
export type { ToastHelper, ToastMessage, ToastMessageOptions, ToasterProps };