'use client';

import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Dialog.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close dialog';

type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root> & OverlayPortalProps;
type DialogRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  OverlayPortalProps;

function Dialog({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: DialogRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
    </OverlayPortalProvider>
  );
}

function DialogRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: DialogRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.RootProvider
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

const DialogTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.Trigger>,
  ComponentProps<typeof DialogPrimitive.Trigger>
>(function DialogTrigger({ asChild, className, ...props }, ref) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
      data-slot="dialog-trigger"
    />
  );
});

const DialogBackdrop = forwardRef<
  ComponentRef<typeof DialogPrimitive.Backdrop>,
  ComponentProps<typeof DialogPrimitive.Backdrop>
>(function DialogBackdrop({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        ref={ref}
        className={clsx(styles.backdrop, className)}
        {...props}
        data-slot="dialog-backdrop"
      />
    </OverlayPortal>
  );
});

const DialogPositioner = forwardRef<
  ComponentRef<typeof DialogPrimitive.Positioner>,
  ComponentProps<typeof DialogPrimitive.Positioner>
>(function DialogPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="dialog-positioner"
      />
    </OverlayPortal>
  );
});

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentProps<typeof DialogPrimitive.Content>
>(function DialogContent({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
      data-slot="dialog-content"
    />
  );
});

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentProps<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={clsx(styles.title, className)}
      {...props}
      data-slot="dialog-title"
    />
  );
});

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentProps<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={clsx(styles.description, className)}
      {...props}
      data-slot="dialog-description"
    />
  );
});

const DialogCloseTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.CloseTrigger>,
  ComponentProps<typeof DialogPrimitive.CloseTrigger>
>(function DialogCloseTrigger({ asChild, className, ...props }, ref) {
  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.closeTrigger, className)}
      {...props}
      data-slot="dialog-close-trigger"
    />
  );
});

const DialogCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton>,
  Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>
>(function DialogCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <DialogPrimitive.CloseTrigger asChild {...props}>
      <CloseButton
        ref={ref}
        data-slot="dialog-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, className)}
      >
        {children}
      </CloseButton>
    </DialogPrimitive.CloseTrigger>
  );
});

const DialogHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DialogHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.header, className)}
        {...props}
        data-slot="dialog-header"
      />
    );
  },
);

const DialogBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DialogBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.body, className)}
        {...props}
        data-slot="dialog-body"
      />
    );
  },
);

const DialogFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DialogFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.footer, className)}
        {...props}
        data-slot="dialog-footer"
      />
    );
  },
);

const DialogContext = DialogPrimitive.Context;

export {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
  useDialog,
  useDialogContext,
};
export type { DialogRootProps, DialogRootProviderProps };