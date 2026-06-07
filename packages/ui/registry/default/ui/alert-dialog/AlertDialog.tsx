import type { ComponentProps } from 'react';
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import { clsx } from 'clsx';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './AlertDialog.module.css';

const AlertDialog = AlertDialogPrimitive.Root;
const createAlertDialogHandle = AlertDialogPrimitive.createHandle;

function AlertDialogPortal({ className, ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" className={className} {...props} />
  );
}

function AlertDialogTrigger({ className, render, ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      render={render}
      className={render ? className : mergeClassName(className, styles.trigger)}
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

function AlertDialogContent({ className, children, ...props }: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogViewport>
        <AlertDialogPopup className={className} {...props}>
          {children}
        </AlertDialogPopup>
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="alert-dialog-header" className={clsx(styles.header, className)} {...props} />
  );
}

function AlertDialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="alert-dialog-footer" className={clsx(styles.footer, className)} {...props} />
  );
}

function AlertDialogBody({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="alert-dialog-body" className={clsx(styles.body, className)} {...props} />;
}

function AlertDialogAction({ className, ...props }: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogClose className={mergeClassName(className, styles.action)} {...props} />;
}

function AlertDialogCancel({ className, ...props }: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogClose className={mergeClassName(className, styles.cancel)} {...props} />;
}

export {
  AlertDialog,
  createAlertDialogHandle,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};