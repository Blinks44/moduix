import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
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

function DialogRoot({ portalled, portalRef, ...props }: DialogRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.Root {...props} />
    </OverlayPortalProvider>
  );
}

function DialogRootProvider({ portalled, portalRef, ...props }: DialogRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.RootProvider {...props} />
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
      data-slot="dialog-trigger"
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
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
        data-slot="dialog-backdrop"
        className={clsx(styles.backdrop, normalizeClassName(className))}
        {...props}
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
        data-slot="dialog-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
        {...props}
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
      data-slot="dialog-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
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
      data-slot="dialog-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
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
      data-slot="dialog-description"
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
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
      data-slot="dialog-close-trigger"
      className={clsx(!asChild && styles.closeTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const DialogCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton.Root>,
  Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>
>(function DialogCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <DialogPrimitive.CloseTrigger asChild {...props}>
      <CloseButton.Root
        ref={ref}
        data-slot="dialog-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, normalizeClassName(className))}
      >
        {children}
      </CloseButton.Root>
    </DialogPrimitive.CloseTrigger>
  );
});

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={clsx(styles.header, className)} {...props} />;
}

function DialogBody({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-body" className={clsx(styles.body, className)} {...props} />;
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={clsx(styles.footer, className)} {...props} />;
}

const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  RootProvider: DialogRootProvider,
  Context: DialogPrimitive.Context,
  Trigger: DialogTrigger,
  Backdrop: DialogBackdrop,
  Positioner: DialogPositioner,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  CloseTrigger: DialogCloseTrigger,
  CloseIcon: DialogCloseIcon,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});

export { Dialog, useDialog, useDialogContext };
export type { DialogRootProps, DialogRootProviderProps };