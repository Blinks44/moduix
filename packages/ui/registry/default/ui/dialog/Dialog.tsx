import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import { createContext, useContext, type ComponentProps } from 'react';
import { CloseButton } from '@/components/moduix/close-button';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Dialog.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close dialog';
const DialogModeContext = createContext<DialogPrimitive.Root.Props['modal']>(true);

const createDialogHandle = DialogPrimitive.createHandle;

function Dialog<Payload = unknown>({
  modal = true,
  ...props
}: DialogPrimitive.Root.Props<Payload>) {
  return (
    <DialogModeContext.Provider value={modal}>
      <DialogPrimitive.Root modal={modal} {...props} />
    </DialogModeContext.Provider>
  );
}

function DialogTrigger({ className, render, ...props }: DialogPrimitive.Trigger.Props) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      render={render}
      className={render ? className : mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
}

function DialogPortal({ className, ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" className={className} {...props} />;
}

function DialogBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function DialogViewport({ className, ...props }: DialogPrimitive.Viewport.Props) {
  return (
    <DialogPrimitive.Viewport
      data-slot="dialog-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function DialogPopup({ className, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={mergeClassName(className, styles.title)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={mergeClassName(className, styles.description)}
      {...props}
    />
  );
}

function DialogClose({ className, ...props }: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    />
  );
}

function DialogCloseIcon({
  className,
  children,
  'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL,
  render,
  ...props
}: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close-icon"
      render={render ?? <CloseButton aria-label={ariaLabel}>{children}</CloseButton>}
      className={mergeClassName(className, styles.closeIcon)}
      {...props}
    />
  );
}

function DialogContent({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  const modal = useContext(DialogModeContext);
  const blocksOutsidePointerInteraction = modal === true;

  return (
    <DialogPortal>
      {blocksOutsidePointerInteraction ? <DialogBackdrop /> : null}
      <DialogViewport
        className={blocksOutsidePointerInteraction ? undefined : styles.viewportNonBlocking}
      >
        <DialogPopup className={className} {...props}>
          {children}
        </DialogPopup>
      </DialogViewport>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={clsx(styles.header, className)} {...props} />;
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={clsx(styles.footer, className)} {...props} />;
}

function DialogBody({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-body" className={clsx(styles.body, className)} {...props} />;
}

export {
  Dialog,
  createDialogHandle,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogViewport,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
};