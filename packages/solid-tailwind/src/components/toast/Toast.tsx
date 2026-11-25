import {
  Toast as ToastPrimitive,
  Toaster as ToasterPrimitive,
  createToaster,
  useToastContext,
  type CreateToasterReturn,
  type ToastOptions,
} from '@ark-ui/solid/toast';
import type { Accessor, ComponentProps } from 'solid-js';
import { children as resolveChildren, Show, splitProps } from 'solid-js';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { OverlayPortal, type OverlayPortalProps } from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import { Spinner } from '../spinner';

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
    <OverlayPortal liveAnnouncer portalled={local.portalled} portalRef={local.portalRef}>
      <ToasterPrimitive
        class={cn(
          '[@media(max-width:40rem)]:w-[calc(100vw-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)-var(--viewport-offset-left)-var(--viewport-offset-right))]',
          local.class,
        )}
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
      class={cn(
        [
          '[z-index:var(--z-index)] grid [height:var(--height)] w-80 max-w-[calc(100vw-var(--moduix-spacing-4)*2)] [translate:var(--x)_var(--y)] [scale:var(--scale)] items-start gap-1 rounded-lg border border-border bg-card bg-clip-padding p-4 text-card-foreground [opacity:var(--opacity)] shadow-lg',
          'transition-[translate,scale,opacity,height] duration-slow ease-toast-in [will-change:translate,opacity,scale]',
          'has-[[data-slot=toast-close-trigger]]:pe-[calc(var(--moduix-spacing-4)+var(--moduix-spacing-7))]',
          'data-[state=closed]:[transition:translate_var(--moduix-duration-slow)_var(--moduix-ease-toast-out),scale_var(--moduix-duration-slow)_var(--moduix-ease-toast-out),opacity_var(--moduix-duration-normal)_var(--moduix-ease-toast-out)]',
          'data-[type=info]:border-info/34 data-[type=info]:bg-[color-mix(in_oklab,var(--color-info)_10%,var(--color-background))] data-[type=info]:text-foreground data-[type=info]:[--_toast-hover:color-mix(in_oklab,var(--color-info)_16%,transparent)]',
          'data-[type=success]:border-success/34 data-[type=success]:bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] data-[type=success]:text-foreground data-[type=success]:[--_toast-hover:color-mix(in_oklab,var(--color-success)_16%,transparent)]',
          'data-[type=warning]:border-warning/38 data-[type=warning]:bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] data-[type=warning]:text-foreground data-[type=warning]:[--_toast-hover:color-mix(in_oklab,var(--color-warning)_20%,transparent)]',
          'data-[type=error]:border-destructive/35 data-[type=error]:bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] data-[type=error]:text-foreground data-[type=error]:[--_toast-hover:color-mix(in_oklab,var(--color-destructive)_14%,transparent)]',
          '[@media(max-width:40rem)]:inset-x-0 [@media(max-width:40rem)]:mx-auto [@media(max-width:40rem)]:max-w-full',
        ],
        local.class,
      )}
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
      class={cn(
        'm-0 flex min-w-0 items-center gap-2 text-sm leading-5 font-semibold wrap-anywhere',
        local.class,
      )}
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
      class={cn('m-0 min-w-0 text-sm leading-5 wrap-anywhere text-muted-foreground', local.class)}
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
      class={cn(
        !local.asChild &&
          'mt-2 inline-flex min-h-control-xs w-max max-w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-2 py-1 text-start text-xs leading-4 font-medium wrap-anywhere text-foreground transition-[background-color] duration-normal ease-in-out select-none hover:bg-[color:var(--_toast-hover,var(--color-accent))] focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring',
        local.class,
      )}
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
              class={cn(
                'absolute end-2 top-2 not-data-disabled:hover:bg-[color:var(--_toast-hover,var(--color-muted))]',
                local.class,
              )}
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