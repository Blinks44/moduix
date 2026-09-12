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

function Toaster(props: ToasterProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'portalRef', 'portalled']);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <OverlayPortal>
        <ToasterPrimitive
          data-slot="toast-toaster"
          class={cn('z-70 max-[40rem]:w-full', local.class)}
          {...others}
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
    <ToastRoot>
      {props.toast().title != null ? <ToastTitle /> : null}
      {props.toast().description != null ? <ToastDescription /> : null}
      {hasAction() ? <ToastActionTrigger>{actionLabel()}</ToastActionTrigger> : null}
      {props.toast().closable !== false ? <ToastCloseTrigger /> : null}
    </ToastRoot>
  );
}

function ToastRoot(props: ComponentProps<typeof ToastPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ToastPrimitive.Root
      data-slot="toast-root"
      class={cn(
        'group/toast pointer-events-auto [z-index:var(--z-index)] box-border grid [height:var(--height)] min-h-0 w-80 max-w-[calc(100vw-2rem)] min-w-0 [translate:var(--x)_var(--y)] [scale:var(--scale)] items-start gap-1 rounded-lg border border-border bg-card bg-clip-padding p-4 pe-11 text-card-foreground [opacity:var(--opacity)] shadow-lg transition-[translate,scale,opacity,height,box-shadow] duration-350 ease-[cubic-bezier(0.21,1.02,0.73,1)] [will-change:translate,opacity,scale] data-[state=closed]:ease-[cubic-bezier(0.06,0.71,0.55,1)] data-[state=closed]:[transition:translate_350ms,scale_350ms,opacity_200ms] data-[type=error]:border-destructive/35 data-[type=error]:bg-destructive/9 data-[type=error]:text-foreground data-[type=success]:border-success/34 data-[type=success]:bg-success/10 data-[type=success]:text-foreground data-[type=warning]:border-warning/38 data-[type=warning]:bg-warning/13 data-[type=warning]:text-foreground motion-reduce:transition-none max-[40rem]:inset-x-0 max-[40rem]:w-[calc(100%_-_(var(--gap)*2))] max-[40rem]:max-w-none',
        local.class,
      )}
      {...others}
    />
  );
}

function ToastTitle(props: ComponentProps<typeof ToastPrimitive.Title>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);
  const toast = useToastContext();

  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      class={cn(
        'm-0 flex min-w-0 items-center gap-2 text-sm leading-5 font-semibold wrap-anywhere text-inherit',
        local.class,
      )}
      {...others}
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
      data-slot="toast-description"
      class={cn('m-0 min-w-0 text-sm leading-5 wrap-anywhere text-muted-foreground', local.class)}
      {...others}
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
      data-slot="toast-action-trigger"
      class={cn(
        !local.asChild &&
          'mt-2 inline-flex min-h-control-xs w-max max-w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-2 py-1 text-start text-xs leading-4 font-medium wrap-anywhere text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none [font:inherit] focus-visible:outline-1 focus-visible:outline-ring motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
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
        data-slot="toast-close-trigger"
        aria-label={ariaLabel}
        aria-labelledby={local['aria-labelledby']}
        class={local.class}
        {...others}
      >
        {local.children}
      </ToastPrimitive.CloseTrigger>
    );
  }

  return (
    <ToastPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="toast-close-trigger"
          aria-label={ariaLabel}
          aria-labelledby={local['aria-labelledby']}
          class={cn('absolute end-2 top-2', local.class)}
        >
          {resolvedChildren()}
        </CloseButton.Root>
      )}
      data-slot="toast-close-trigger"
      aria-label={ariaLabel}
      aria-labelledby={local['aria-labelledby']}
      {...others}
    />
  );
}

const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  Context: ToastPrimitive.Context,
  Title: ToastTitle,
  Description: ToastDescription,
  ActionTrigger: ToastActionTrigger,
  CloseTrigger: ToastCloseTrigger,
  Toaster,
});

export { Toast, Toaster, createToaster, useToastContext };