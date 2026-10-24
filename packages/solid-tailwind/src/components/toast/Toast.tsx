import {
  Toast as ToastPrimitive,
  Toaster as ToasterPrimitive,
  createToaster,
  useToastContext,
  type ToastOptions,
} from '@ark-ui/solid/toast';
import type { Accessor, ComponentProps } from 'solid-js';
import { children as resolveChildren, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import { Spinner } from '../spinner';

type ToasterProps = Omit<ComponentProps<typeof ToasterPrimitive>, 'children'> &
  OverlayPortalProps & {
    children?: ComponentProps<typeof ToasterPrimitive>['children'];
  };

function ToastToaster(props: ToasterProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'portalRef', 'portalled']);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <OverlayPortal>
        <ToasterPrimitive
          class={cn(
            '[@media(max-width:40rem)]:w-[calc(100vw-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)-var(--viewport-offset-left)-var(--viewport-offset-right))]',
            local.class,
          )}
          {...others}
          data-slot="toast-toaster"
          children={local.children ?? ((toast) => <DefaultToast toast={toast} />)}
        />
      </OverlayPortal>
    </OverlayPortalProvider>
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
        '[z-index:var(--z-index)] grid [height:var(--height)] w-80 max-w-[calc(100vw-2rem)] [translate:var(--x)_var(--y)] [scale:var(--scale)] items-start gap-1 rounded-lg border border-border bg-card bg-clip-padding p-4 text-card-foreground [opacity:var(--opacity)] shadow-lg transition-[translate,scale,opacity,height] duration-slow ease-[cubic-bezier(0.21,1.02,0.73,1)] [will-change:translate,opacity,scale] has-[[data-slot=toast-close-trigger]]:pe-11 data-[state=closed]:[transition:translate_var(--moduix-duration-slow)_cubic-bezier(0.06,0.71,0.55,1),scale_var(--moduix-duration-slow)_cubic-bezier(0.06,0.71,0.55,1),opacity_var(--moduix-duration-normal)_cubic-bezier(0.06,0.71,0.55,1)] data-[type=error]:border-destructive/35 data-[type=error]:bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] data-[type=error]:text-foreground data-[type=success]:border-success/34 data-[type=success]:bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] data-[type=success]:text-foreground data-[type=warning]:border-warning/38 data-[type=warning]:bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] data-[type=warning]:text-foreground [@media(max-width:40rem)]:inset-x-0 [@media(max-width:40rem)]:mx-auto [@media(max-width:40rem)]:max-w-full',
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
          'mt-2 inline-flex min-h-control-xs w-max max-w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-2 py-1 text-start text-xs leading-4 font-medium wrap-anywhere text-foreground transition-[background-color] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-ring [@media(hover:hover)]:hover:bg-accent',
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
  const [local, others] = splitProps(props, ['aria-label', 'asChild', 'children', 'class']);
  const ariaLabel = () => local['aria-label'] ?? a11yLabels.closeToast;

  if (local.asChild) {
    return (
      <ToastPrimitive.CloseTrigger
        asChild={local.asChild}
        aria-label={ariaLabel()}
        class={local.class}
        {...others}
        data-slot="toast-close-trigger"
      >
        {local.children}
      </ToastPrimitive.CloseTrigger>
    );
  }

  return (
    <ToastPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="toast-close-trigger"
          aria-label={ariaLabel()}
          class={cn('absolute end-2 top-2', local.class)}
        >
          {local.children}
        </CloseButton>
      )}
      {...others}
    />
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
export type { ToasterProps };