import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import * as React from 'react';
import { CloseButton } from '@/components/CloseButton';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Dialog.module.css';

type DialogContentClassNames = {
  portal?: DialogPrimitive.Portal.Props['className'];
  backdrop?: DialogPrimitive.Backdrop.Props['className'];
  viewport?: DialogPrimitive.Viewport.Props['className'];
  closeIcon?: DialogPrimitive.Close.Props['className'];
};

type DialogContentSlotProps = {
  portal?: Omit<DialogPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<DialogPrimitive.Backdrop.Props, 'className'>;
  viewport?: Omit<DialogPrimitive.Viewport.Props, 'className'>;
};

type DialogContentProps = Omit<DialogPrimitive.Popup.Props, 'className'> & {
  className?: DialogPrimitive.Popup.Props['className'];
  classNames?: DialogContentClassNames;
  slotProps?: DialogContentSlotProps;
  container?: DialogPrimitive.Portal.Props['container'];
  outsideCloseIcon?: React.ReactNode;
  withBackdrop?: boolean;
  withCloseButton?: boolean;
  closeButtonLabel?: string;
};

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close dialog';

const Dialog = DialogPrimitive.Root;
const createDialogHandle = DialogPrimitive.createHandle;

function DialogTrigger({ className, render, ...props }: DialogPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
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
  'aria-label': ariaLabel = 'Close dialog',
  ...props
}: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close-icon"
      render={<CloseButton aria-label={ariaLabel}>{children}</CloseButton>}
      className={mergeClassName(className, styles.closeIcon)}
      {...props}
    />
  );
}

function DialogContent({
  className,
  classNames,
  slotProps,
  container,
  outsideCloseIcon,
  withBackdrop = true,
  withCloseButton = false,
  closeButtonLabel = DEFAULT_CLOSE_BUTTON_LABEL,
  children,
  ...props
}: DialogContentProps) {
  const { container: slotPortalContainer, ...restPortalSlotProps } = slotProps?.portal ?? {};
  const resolvedContainer = container ?? slotPortalContainer;

  return (
    <DialogPrimitive.Portal
      data-slot="dialog-portal"
      className={classNames?.portal}
      container={resolvedContainer}
      {...restPortalSlotProps}
    >
      {withBackdrop ? (
        <DialogBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <DialogViewport
        className={classNames?.viewport}
        {...slotProps?.viewport}
        data-with-backdrop={withBackdrop ? 'true' : 'false'}
      >
        {outsideCloseIcon}
        <DialogPopup className={className} {...props}>
          {withCloseButton ? (
            <DialogCloseIcon
              aria-label={closeButtonLabel}
              className={mergeClassName(styles.autoCloseIcon, classNames?.closeIcon)}
            />
          ) : null}
          {children}
        </DialogPopup>
      </DialogViewport>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={clsx(styles.header, className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={clsx(styles.footer, className)} {...props} />;
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-body" className={clsx(styles.body, className)} {...props} />;
}

type DialogProps<Payload = unknown> = DialogPrimitive.Root.Props<Payload>;
type DialogHandle<Payload = unknown> = DialogPrimitive.Handle<Payload>;
type DialogTriggerProps = DialogPrimitive.Trigger.Props;
type DialogTitleProps = DialogPrimitive.Title.Props;
type DialogDescriptionProps = DialogPrimitive.Description.Props;
type DialogCloseProps = DialogPrimitive.Close.Props;
type DialogCloseIconProps = DialogPrimitive.Close.Props;
type DialogHeaderProps = React.ComponentProps<'div'>;
type DialogBodyProps = React.ComponentProps<'div'>;
type DialogFooterProps = React.ComponentProps<'div'>;

export {
  Dialog,
  createDialogHandle,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
};

export type {
  DialogProps,
  DialogHandle,
  DialogTriggerProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogCloseIconProps,
  DialogContentProps,
  DialogContentClassNames,
  DialogContentSlotProps,
  DialogHeaderProps,
  DialogBodyProps,
  DialogFooterProps,
};