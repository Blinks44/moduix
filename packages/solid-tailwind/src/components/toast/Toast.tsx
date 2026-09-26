import {
  Toast as ToastPrimitive,
  Toaster as ToasterPrimitive,
  createToaster,
  useToastContext,
  type ToastOptions,
} from '@ark-ui/solid/toast';
import type { Accessor, ComponentProps } from 'solid-js';
import { children as resolveChildren, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

const DEFAULT_CLOSE_TRIGGER_LABEL = 'Close toast';

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
          class={cn('max-[40rem]:w-full', local.class)}
          {...others}
          data-slot="toast-toaster"
          children={local.children ?? ((toast) => <DefaultToast toast={toast} />)}
        />
      </OverlayPortal>
    </OverlayPortalProvider>
  );
}

function DefaultToast(props: { toast: Accessor<ToastOptions> }) {
  const hasAction = () => props.toast().action != null;
  const actionLabel = () => props.toast().action?.label;

  return (
    <Toast>
      {props.toast().title != null ? <ToastTitle /> : null}
      {props.toast().description != null ? <ToastDescription /> : null}
      {hasAction() ? <ToastActionTrigger>{actionLabel()}</ToastActionTrigger> : null}
      {props.toast().closable !== false ? <ToastCloseTrigger /> : null}
    </Toast>
  );
}

function Toast(props: ComponentProps<typeof ToastPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ToastPrimitive.Root
      class={cn(
        'group/toast pointer-events-auto [z-index:var(--z-index)] box-border grid [height:var(--height)] min-h-0 w-80 max-w-[calc(100vw-2rem)] min-w-0 [translate:var(--x)_var(--y)] [scale:var(--scale)] items-start gap-1 rounded-lg border border-border bg-card bg-clip-padding p-4 pe-11 text-card-foreground [opacity:var(--opacity)] shadow-lg transition-[translate,scale,opacity,height,box-shadow] duration-350 ease-[cubic-bezier(0.21,1.02,0.73,1)] [will-change:translate,opacity,scale] data-[state=closed]:[transition:translate_350ms_cubic-bezier(0.06,0.71,0.55,1),scale_350ms_cubic-bezier(0.06,0.71,0.55,1),opacity_200ms_cubic-bezier(0.06,0.71,0.55,1)] data-[type=error]:border-destructive/35 data-[type=error]:bg-destructive/9 data-[type=error]:text-foreground data-[type=success]:border-success/34 data-[type=success]:bg-success/10 data-[type=success]:text-foreground data-[type=warning]:border-warning/38 data-[type=warning]:bg-warning/13 data-[type=warning]:text-foreground motion-reduce:transition-none motion-reduce:data-[state=closed]:[transition:none] max-[40rem]:inset-x-0 max-[40rem]:w-[calc(100%_-_(var(--gap)*2))] max-[40rem]:max-w-none',
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
        'm-0 flex min-w-0 items-center gap-2 text-sm leading-5 font-semibold wrap-anywhere text-inherit',
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
          'mt-2 inline-flex min-h-control-xs w-max max-w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-2 py-1 text-start text-xs leading-4 font-medium wrap-anywhere text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:outline-ring motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
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
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);
  const resolvedChildren = resolveChildren(() => local.children);
  const ariaLabel =
    local['aria-label'] === undefined ? DEFAULT_CLOSE_TRIGGER_LABEL : local['aria-label'];

  if (local.asChild) {
    return (
      <ToastPrimitive.CloseTrigger
        asChild={local.asChild}
        aria-label={ariaLabel}
        aria-labelledby={local['aria-labelledby']}
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
          aria-label={ariaLabel}
          aria-labelledby={local['aria-labelledby']}
          class={cn('absolute end-2 top-2', local.class)}
        >
          {resolvedChildren()}
        </CloseButton>
      )}
      aria-label={ariaLabel}
      aria-labelledby={local['aria-labelledby']}
      {...others}
      data-slot="toast-close-trigger"
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