'use client';

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
import type { OverlayPortalProps } from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Toast.module.css';

const DEFAULT_CLOSE_TRIGGER_LABEL = 'Close toast';

type ToasterProps = Omit<ComponentProps<typeof ToasterPrimitive>, 'children'> &
  OverlayPortalProps & {
    children?: ComponentProps<typeof ToasterPrimitive>['children'];
  };

const ToastToaster = forwardRef<ComponentRef<typeof ToasterPrimitive>, ToasterProps>(
  function ToastToaster({ className, portalled = true, portalRef, ...props }, ref) {
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ToasterPrimitive
          ref={ref}
          className={clsx(styles.toaster, className)}
          {...props}
          data-slot="toast-toaster"
        >
          {props.children ?? ((toast) => <DefaultToast toast={toast} />)}
        </ToasterPrimitive>
      </Portal>
    );
  },
);

function DefaultToast({ toast }: { toast: ToastOptions }) {
  return (
    <Toast key={toast.id}>
      {toast.title != null ? <ToastTitle /> : null}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.title, className)}
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
      className={clsx(styles.description, className)}
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
      className={clsx(!asChild && styles.actionTrigger, className)}
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
        className={clsx(styles.closeTrigger, className)}
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