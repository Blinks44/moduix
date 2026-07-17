import { Portal } from '@ark-ui/react/portal';
import type { ToastOptions } from '@ark-ui/react/toast';
import {
  Toast as ToastPrimitive,
  Toaster as ToasterPrimitive,
  createToaster,
  useToastContext,
} from '@ark-ui/react/toast';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Toast.module.css';

const DEFAULT_CLOSE_TRIGGER_LABEL = 'Close toast';

type ToasterProps = Omit<ComponentProps<typeof ToasterPrimitive>, 'children'> &
  OverlayPortalProps & {
    children?: ComponentProps<typeof ToasterPrimitive>['children'];
  };

const Toaster = forwardRef<ComponentRef<typeof ToasterPrimitive>, ToasterProps>(function Toaster(
  { className, portalled = true, portalRef, ...props },
  ref,
) {
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ToasterPrimitive
        ref={ref}
        data-slot="toast-toaster"
        className={clsx(styles.toaster, normalizeClassName(className))}
        {...props}
      >
        {props.children ?? ((toast) => <DefaultToast toast={toast} />)}
      </ToasterPrimitive>
    </Portal>
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
      data-slot="toast-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="toast-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
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
      data-slot="toast-description"
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
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
      data-slot="toast-action-trigger"
      className={clsx(!asChild && styles.actionTrigger, normalizeClassName(className))}
      {...props}
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
        data-slot="toast-close-trigger"
        aria-label={ariaLabel}
        className={normalizeClassName(className)}
        {...props}
      >
        {children}
      </ToastPrimitive.CloseTrigger>
    );
  }

  return (
    <ToastPrimitive.CloseTrigger asChild>
      <CloseButton.Root
        ref={ref}
        data-slot="toast-close-trigger"
        aria-label={ariaLabel}
        className={clsx(styles.closeTrigger, normalizeClassName(className))}
        {...props}
      >
        {children}
      </CloseButton.Root>
    </ToastPrimitive.CloseTrigger>
  );
});

const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  ActionTrigger: ToastActionTrigger,
  CloseTrigger: ToastCloseTrigger,
  Toaster,
});

export { Toast, Toaster, createToaster };