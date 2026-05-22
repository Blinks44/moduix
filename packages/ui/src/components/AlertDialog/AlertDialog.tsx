import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import { clsx } from 'clsx';
import * as React from 'react';
import { CloseButton } from '@/components/CloseButton';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './AlertDialog.module.css';

type AlertDialogContentClassNames = {
  portal?: AlertDialogPrimitive.Portal.Props['className'];
  backdrop?: AlertDialogPrimitive.Backdrop.Props['className'];
  viewport?: AlertDialogPrimitive.Viewport.Props['className'];
  closeIcon?: AlertDialogPrimitive.Close.Props['className'];
};

type AlertDialogContentSlotProps = {
  portal?: Omit<AlertDialogPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<AlertDialogPrimitive.Backdrop.Props, 'className'>;
  viewport?: Omit<AlertDialogPrimitive.Viewport.Props, 'className'>;
};

type AlertDialogContentProps = Omit<AlertDialogPrimitive.Popup.Props, 'className'> & {
  className?: AlertDialogPrimitive.Popup.Props['className'];
  classNames?: AlertDialogContentClassNames;
  slotProps?: AlertDialogContentSlotProps;
  container?: AlertDialogPrimitive.Portal.Props['container'];
  withBackdrop?: boolean;
  withCloseButton?: boolean;
  closeButtonLabel?: string;
};

const AlertDialog = AlertDialogPrimitive.Root;
const createAlertDialogHandle = AlertDialogPrimitive.createHandle;

function AlertDialogTrigger({ className, render, ...props }: AlertDialogPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

function AlertDialogPortal({ className, ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      className={mergeClassName(className)}
      {...props}
    />
  );
}

function AlertDialogBackdrop({ className, ...props }: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function AlertDialogViewport({ className, ...props }: AlertDialogPrimitive.Viewport.Props) {
  return (
    <AlertDialogPrimitive.Viewport
      data-slot="alert-dialog-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function AlertDialogPopup({ className, ...props }: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPrimitive.Popup
      data-slot="alert-dialog-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={mergeClassName(className, styles.title)}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={mergeClassName(className, styles.description)}
      {...props}
    />
  );
}

function AlertDialogClose({ className, ...props }: AlertDialogPrimitive.Close.Props) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    />
  );
}

function AlertDialogCloseIcon({
  className,
  children,
  'aria-label': ariaLabel = 'Close dialog',
  ...props
}: AlertDialogPrimitive.Close.Props) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-close-icon"
      render={<CloseButton aria-label={ariaLabel}>{children}</CloseButton>}
      className={mergeClassName(className, styles.closeIcon)}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  classNames,
  slotProps,
  container,
  withBackdrop = true,
  withCloseButton = false,
  closeButtonLabel = 'Close dialog',
  children,
  ...props
}: AlertDialogContentProps) {
  const { container: slotPortalContainer, ...restPortalSlotProps } = slotProps?.portal ?? {};
  const portalContainer = container ?? slotPortalContainer;

  return (
    <AlertDialogPortal
      className={classNames?.portal}
      container={portalContainer}
      {...restPortalSlotProps}
    >
      {withBackdrop ? (
        <AlertDialogBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <AlertDialogViewport
        className={classNames?.viewport}
        {...slotProps?.viewport}
        data-with-backdrop={withBackdrop ? 'true' : 'false'}
      >
        <AlertDialogPopup className={className} {...props}>
          {withCloseButton ? (
            <AlertDialogCloseIcon
              aria-label={closeButtonLabel}
              className={mergeClassName(styles.autoCloseIcon, classNames?.closeIcon)}
            />
          ) : null}
          {children}
        </AlertDialogPopup>
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-dialog-header" className={clsx(styles.header, className)} {...props} />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-dialog-footer" className={clsx(styles.footer, className)} {...props} />
  );
}

function AlertDialogBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-dialog-body" className={clsx(styles.body, className)} {...props} />;
}

function AlertDialogAction({ className, ...props }: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogClose className={mergeClassName(className, styles.action)} {...props} />;
}

function AlertDialogCancel({ className, ...props }: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogClose className={mergeClassName(className, styles.cancel)} {...props} />;
}

type AlertDialogProps<Payload = unknown> = AlertDialogPrimitive.Root.Props<Payload>;
type AlertDialogHandle<Payload = unknown> = AlertDialogPrimitive.Handle<Payload>;
type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props;
type AlertDialogTitleProps = AlertDialogPrimitive.Title.Props;
type AlertDialogDescriptionProps = AlertDialogPrimitive.Description.Props;
type AlertDialogCloseProps = AlertDialogPrimitive.Close.Props;
type AlertDialogCloseIconProps = AlertDialogPrimitive.Close.Props;
type AlertDialogHeaderProps = React.ComponentProps<'div'>;
type AlertDialogBodyProps = React.ComponentProps<'div'>;
type AlertDialogFooterProps = React.ComponentProps<'div'>;
type AlertDialogActionProps = AlertDialogPrimitive.Close.Props;
type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props;

export {
  AlertDialog,
  createAlertDialogHandle,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogCloseIcon,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};

export type {
  AlertDialogProps,
  AlertDialogHandle,
  AlertDialogTriggerProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogCloseProps,
  AlertDialogCloseIconProps,
  AlertDialogContentProps,
  AlertDialogContentClassNames,
  AlertDialogContentSlotProps,
  AlertDialogHeaderProps,
  AlertDialogBodyProps,
  AlertDialogFooterProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
};