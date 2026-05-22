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
  withBackdrop?: boolean;
  withCloseButton?: boolean;
  closeButtonLabel?: string;
};

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

function DialogPortal({ className, ...props }: DialogPrimitive.Portal.Props) {
  return (
    <DialogPrimitive.Portal
      data-slot="dialog-portal"
      className={mergeClassName(className)}
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
  withBackdrop = true,
  withCloseButton = false,
  closeButtonLabel = 'Close dialog',
  children,
  ...props
}: DialogContentProps) {
  const { container: slotPortalContainer, ...restPortalSlotProps } = slotProps?.portal ?? {};
  const portalContainer = container ?? slotPortalContainer;
  const popupChildren: React.ReactNode[] = [];
  const viewportChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === DialogCloseIcon) {
      viewportChildren.push(child);
      return;
    }

    popupChildren.push(child);
  });

  return (
    <DialogPortal
      className={classNames?.portal}
      container={portalContainer}
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
        {viewportChildren}
        <DialogPopup className={className} {...props}>
          {withCloseButton ? (
            <DialogCloseIcon
              aria-label={closeButtonLabel}
              className={mergeClassName(styles.autoCloseIcon, classNames?.closeIcon)}
            />
          ) : null}
          {popupChildren}
        </DialogPopup>
      </DialogViewport>
    </DialogPortal>
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