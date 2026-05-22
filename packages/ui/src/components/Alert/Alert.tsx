import clsx from 'clsx';
import * as React from 'react';
import { CloseButton, type CloseButtonProps } from '@/components/CloseButton';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Alert.module.css';

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'destructive';
type AlertSize = 'sm' | 'md' | 'lg';

type AlertProps = Omit<React.ComponentProps<'div'>, 'title'> & {
  variant?: AlertVariant;
  size?: AlertSize;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  withCloseButton?: boolean;
  withDismissAnimation?: boolean;
  closeButtonLabel?: string;
};

type AlertIconProps = React.ComponentProps<'span'>;
type AlertTitleProps = React.ComponentProps<'h3'>;
type AlertDescriptionProps = React.ComponentProps<'div'>;
type AlertContentProps = React.ComponentProps<'div'>;
type AlertCloseProps = CloseButtonProps;

const AlertContext = React.createContext<(() => void) | null>(null);

function Alert({
  className,
  variant = 'default',
  size = 'md',
  open,
  defaultOpen = true,
  onOpenChange,
  withCloseButton = false,
  withDismissAnimation = true,
  closeButtonLabel = 'Close alert',
  role,
  children,
  onAnimationEnd,
  ...props
}: AlertProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const [mounted, setMounted] = React.useState(isOpen);

  React.useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return;
    }

    if (!withDismissAnimation) setMounted(false);
  }, [isOpen, withDismissAnimation]);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      if (nextOpen) setMounted(true);
      if (!nextOpen && !withDismissAnimation) setMounted(false);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange, withDismissAnimation],
  );

  const dismiss = React.useCallback(() => setOpen(false), [setOpen]);

  if (!mounted) return null;

  return (
    <AlertContext.Provider value={dismiss}>
      <div
        role={role ?? (variant === 'destructive' ? 'alert' : 'status')}
        data-slot="alert-root"
        data-state={isOpen ? 'open' : 'closed'}
        data-variant={variant}
        data-size={size}
        data-animated={withDismissAnimation ? '' : undefined}
        className={clsx(styles.root, className)}
        onAnimationEnd={(event) => {
          onAnimationEnd?.(event);
          if (event.currentTarget === event.target && !isOpen) setMounted(false);
        }}
        {...props}
      >
        {children}
        {withCloseButton ? <AlertClose aria-label={closeButtonLabel} /> : null}
      </div>
    </AlertContext.Provider>
  );
}

function AlertIcon({ className, ...props }: AlertIconProps) {
  return (
    <span
      data-slot="alert-icon"
      aria-hidden="true"
      className={clsx(styles.icon, className)}
      {...props}
    />
  );
}

function AlertContent({ className, ...props }: AlertContentProps) {
  return <div data-slot="alert-content" className={clsx(styles.content, className)} {...props} />;
}

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <h3 data-slot="alert-title" className={clsx(styles.title, className)} {...props} />;
}

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div data-slot="alert-description" className={clsx(styles.description, className)} {...props} />
  );
}

function AlertClose({ className, onClick, ...props }: AlertCloseProps) {
  const dismiss = React.useContext(AlertContext);

  return (
    <CloseButton
      data-slot="alert-close"
      className={mergeClassName(className, styles.close)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) dismiss?.();
      }}
      {...props}
    />
  );
}

export { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertClose };
export type {
  AlertProps,
  AlertIconProps,
  AlertContentProps,
  AlertTitleProps,
  AlertDescriptionProps,
  AlertCloseProps,
  AlertVariant,
  AlertSize,
};