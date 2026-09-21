'use client';

import {
  Toast as ToastPrimitive,
  Toaster as ToasterPrimitive,
  createToaster,
  useToastContext,
} from '@ark-ui/react/toast';
import type { ToastOptions } from '@ark-ui/react/toast';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
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

const Toaster = forwardRef<ComponentRef<typeof ToasterPrimitive>, ToasterProps>(function Toaster(
  { className, portalled, portalRef, ...props },
  ref,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <OverlayPortal>
        <ToasterPrimitive
          ref={ref}
          className={cn('max-[40rem]:w-full', className)}
          {...props}
          data-slot="toast-toaster"
        >
          {props.children ?? ((toast) => <DefaultToast toast={toast} />)}
        </ToasterPrimitive>
      </OverlayPortal>
    </OverlayPortalProvider>
  );
});

function DefaultToast({ toast }: { toast: ToastOptions }) {
  return (
    <ToastRoot key={toast.id}>
      {toast.title != null ? <ToastTitle /> : null}
      {toast.description != null ? <ToastDescription /> : null}
      {toast.action ? <ToastActionTrigger>{toast.action.label}</ToastActionTrigger> : null}
      {toast.closable !== false ? <ToastCloseTrigger /> : null}
    </ToastRoot>
  );
}

const ToastRoot = forwardRef<
  ComponentRef<typeof ToastPrimitive.Root>,
  ComponentProps<typeof ToastPrimitive.Root>
>(function ToastRoot({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        'group/toast pointer-events-auto [z-index:var(--z-index)] box-border grid [height:var(--height)] min-h-0 w-80 max-w-[calc(100vw-2rem)] min-w-0 [translate:var(--x)_var(--y)] [scale:var(--scale)] items-start gap-1 rounded-lg border border-border bg-card bg-clip-padding p-4 pe-11 text-card-foreground [opacity:var(--opacity)] shadow-lg transition-[translate,scale,opacity,height,box-shadow] duration-350 ease-[cubic-bezier(0.21,1.02,0.73,1)] [will-change:translate,opacity,scale] data-[state=closed]:[transition:translate_350ms_cubic-bezier(0.06,0.71,0.55,1),scale_350ms_cubic-bezier(0.06,0.71,0.55,1),opacity_200ms_cubic-bezier(0.06,0.71,0.55,1)] data-[type=error]:border-destructive/35 data-[type=error]:bg-destructive/9 data-[type=error]:text-foreground data-[type=success]:border-success/34 data-[type=success]:bg-success/10 data-[type=success]:text-foreground data-[type=warning]:border-warning/38 data-[type=warning]:bg-warning/13 data-[type=warning]:text-foreground motion-reduce:transition-none motion-reduce:data-[state=closed]:[transition:none] max-[40rem]:inset-x-0 max-[40rem]:w-[calc(100%_-_(var(--gap)*2))] max-[40rem]:max-w-none',
        className,
      )}
      {...props}
      data-slot="toast-root"
    />
  );
});

const ToastTitle = forwardRef<
  ComponentRef<typeof ToastPrimitive.Title>,
  ComponentProps<typeof ToastPrimitive.Title>
>(function ToastTitle({ className, children, ...props }, ref) {
  const toast = useToastContext();

  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn(
        'm-0 flex min-w-0 items-center gap-2 text-sm leading-5 font-semibold wrap-anywhere text-inherit',
        className,
      )}
      {...props}
      data-slot="toast-title"
    >
      {children === undefined ? toast.title : children}
    </ToastPrimitive.Title>
  );
});

const ToastDescription = forwardRef<
  ComponentRef<typeof ToastPrimitive.Description>,
  ComponentProps<typeof ToastPrimitive.Description>
>(function ToastDescription({ className, children, ...props }, ref) {
  const toast = useToastContext();

  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn('m-0 min-w-0 text-sm leading-5 wrap-anywhere text-muted-foreground', className)}
      {...props}
      data-slot="toast-description"
    >
      {children === undefined ? toast.description : children}
    </ToastPrimitive.Description>
  );
});

const ToastActionTrigger = forwardRef<
  ComponentRef<typeof ToastPrimitive.ActionTrigger>,
  ComponentProps<typeof ToastPrimitive.ActionTrigger>
>(function ToastActionTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <ToastPrimitive.ActionTrigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'mt-2 inline-flex min-h-control-xs w-max max-w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-2 py-1 text-start text-xs leading-4 font-medium wrap-anywhere text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:outline-ring motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
      data-slot="toast-action-trigger"
    >
      {children}
    </ToastPrimitive.ActionTrigger>
  );
});

const ToastCloseTrigger = forwardRef<
  ComponentRef<typeof ToastPrimitive.CloseTrigger>,
  ComponentProps<typeof ToastPrimitive.CloseTrigger>
>(function ToastCloseTrigger(
  { asChild, className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_TRIGGER_LABEL, ...props },
  ref,
) {
  if (asChild) {
    return (
      <ToastPrimitive.CloseTrigger
        ref={ref}
        asChild
        aria-label={ariaLabel}
        className={className}
        {...props}
        data-slot="toast-close-trigger"
      >
        {children}
      </ToastPrimitive.CloseTrigger>
    );
  }

  return (
    <ToastPrimitive.CloseTrigger asChild>
      <CloseButton
        ref={ref}
        aria-label={ariaLabel}
        className={cn('absolute end-2 top-2', className)}
        {...props}
        data-slot="toast-close-trigger"
      >
        {children}
      </CloseButton>
    </ToastPrimitive.CloseTrigger>
  );
});

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