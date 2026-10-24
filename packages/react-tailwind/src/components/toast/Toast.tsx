'use client';

import { Portal } from '@ark-ui/react/portal';
import {
  Toast as ToastPrimitive,
  Toaster as ToasterPrimitive,
  createToaster,
  useToastContext,
} from '@ark-ui/react/toast';
import type { ToastOptions } from '@ark-ui/react/toast';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import { Spinner } from '../spinner';

type ToasterProps = Omit<ComponentProps<typeof ToasterPrimitive>, 'children'> &
  OverlayPortalProps & {
    children?: ComponentProps<typeof ToasterPrimitive>['children'];
  };

const ToastToaster = forwardRef<ComponentRef<typeof ToasterPrimitive>, ToasterProps>(
  function ToastToaster({ children, className, portalled = true, portalRef, ...props }, ref) {
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ToasterPrimitive
          ref={ref}
          className={cn(
            '[@media(max-width:40rem)]:w-[calc(100vw-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)-var(--viewport-offset-left)-var(--viewport-offset-right))]',
            className,
          )}
          {...props}
          data-slot="toast-toaster"
        >
          {children ?? ((toast) => <DefaultToast toast={toast} />)}
        </ToasterPrimitive>
      </Portal>
    );
  },
);

function DefaultToast({ toast }: { toast: ToastOptions }) {
  return (
    <Toast>
      {toast.title != null ? (
        <ToastTitle>
          {toast.type === 'loading' ? <Spinner decorative size="sm" /> : null}
          {toast.title}
        </ToastTitle>
      ) : null}
      {toast.description != null ? <ToastDescription /> : null}
      {toast.action ? <ToastActionTrigger>{toast.action.label}</ToastActionTrigger> : null}
      {toast.closable !== false ? <ToastCloseTrigger /> : null}
    </Toast>
  );
}

const Toast = forwardRef<
  ComponentRef<typeof ToastPrimitive.Root>,
  ComponentProps<typeof ToastPrimitive.Root>
>(function Toast({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        '[z-index:var(--z-index)] grid [height:var(--height)] w-80 max-w-[calc(100vw-2rem)] [translate:var(--x)_var(--y)] [scale:var(--scale)] items-start gap-1 rounded-lg border border-border bg-card bg-clip-padding p-4 text-card-foreground [opacity:var(--opacity)] shadow-lg transition-[translate,scale,opacity,height] duration-slow ease-[cubic-bezier(0.21,1.02,0.73,1)] [will-change:translate,opacity,scale] has-[[data-slot=toast-close-trigger]]:pe-11 data-[state=closed]:[transition:translate_var(--moduix-duration-slow)_cubic-bezier(0.06,0.71,0.55,1),scale_var(--moduix-duration-slow)_cubic-bezier(0.06,0.71,0.55,1),opacity_var(--moduix-duration-normal)_cubic-bezier(0.06,0.71,0.55,1)] data-[type=error]:border-destructive/35 data-[type=error]:bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] data-[type=error]:text-foreground data-[type=success]:border-success/34 data-[type=success]:bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] data-[type=success]:text-foreground data-[type=warning]:border-warning/38 data-[type=warning]:bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] data-[type=warning]:text-foreground [@media(max-width:40rem)]:inset-x-0 [@media(max-width:40rem)]:mx-auto [@media(max-width:40rem)]:max-w-full',
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
        'm-0 flex min-w-0 items-center gap-2 text-sm leading-5 font-semibold wrap-anywhere',
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
          'mt-2 inline-flex min-h-control-xs w-max max-w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-2 py-1 text-start text-xs leading-4 font-medium wrap-anywhere text-foreground transition-[background-color] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-ring [@media(hover:hover)]:hover:bg-accent',
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
  { asChild, className, children, 'aria-label': ariaLabel = a11yLabels.closeToast, ...props },
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
} from '@ark-ui/react/toast';
export type { ToasterProps };