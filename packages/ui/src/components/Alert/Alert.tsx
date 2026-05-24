import clsx from 'clsx';
import * as React from 'react';
import { CloseButton, type CloseButtonProps } from '@/components/CloseButton';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Alert.module.css';

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'destructive';
type AlertSize = 'sm' | 'md' | 'lg';
type AlertTitleAs = 'h2' | 'h3' | 'h4' | 'div' | 'p' | 'span';

type AlertProps = Omit<React.ComponentProps<'div'>, 'title'> & {
  variant?: AlertVariant;
  size?: AlertSize;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  withCloseButton?: boolean;
  withDismissAnimation?: boolean;
  closeButtonLabel?: string;
  closeButton?: React.ReactNode;
};

type AlertIconProps = React.ComponentProps<'span'>;
type AlertTitleProps = React.ComponentProps<'h3'> & {
  as?: AlertTitleAs;
};
type AlertDescriptionProps = React.ComponentProps<'div'>;
type AlertContentProps = React.ComponentProps<'div'>;
type AlertCloseProps = CloseButtonProps;

const AlertContext = React.createContext<(() => void) | null>(null);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    className,
    variant = 'default',
    size = 'md',
    open,
    defaultOpen = true,
    onOpenChange,
    withCloseButton = false,
    withDismissAnimation = true,
    closeButtonLabel = 'Close alert',
    closeButton,
    role,
    children,
    onAnimationEnd,
    ...props
  },
  ref,
) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const [mounted, setMounted] = React.useState(isOpen);
  const resolvedRole = role ?? (variant === 'destructive' ? 'alert' : 'status');
  const shouldRenderCloseButton = closeButton !== undefined || withCloseButton;

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
  const handleAnimationEnd = React.useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      onAnimationEnd?.(event);
      if (event.currentTarget !== event.target) return;
      if (!isOpen) setMounted(false);
    },
    [isOpen, onAnimationEnd],
  );

  if (!mounted) return null;

  return (
    <AlertContext.Provider value={dismiss}>
      <div
        ref={ref}
        role={resolvedRole}
        data-slot="alert-root"
        data-state={isOpen ? 'open' : 'closed'}
        data-variant={variant}
        data-size={size}
        data-animated={withDismissAnimation ? '' : undefined}
        className={clsx(styles.root, className)}
        onAnimationEnd={handleAnimationEnd}
        {...props}
      >
        {children}
        {shouldRenderCloseButton ? (
          <AlertClose aria-label={closeButtonLabel}>{closeButton}</AlertClose>
        ) : null}
      </div>
    </AlertContext.Provider>
  );
});

const AlertIcon = React.forwardRef<HTMLSpanElement, AlertIconProps>(function AlertIcon(
  { className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="alert-icon"
      aria-hidden="true"
      className={clsx(styles.icon, className)}
      {...props}
    />
  );
});

const AlertContent = React.forwardRef<HTMLDivElement, AlertContentProps>(function AlertContent(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="alert-content"
      className={clsx(styles.content, className)}
      {...props}
    />
  );
});

const AlertTitle = React.forwardRef<HTMLElement, AlertTitleProps>(function AlertTitle(
  { as: Component = 'h3', className, ...props },
  ref,
) {
  return (
    <Component
      ref={
        ref as React.Ref<
          HTMLHeadingElement & HTMLDivElement & HTMLParagraphElement & HTMLSpanElement
        >
      }
      data-slot="alert-title"
      className={clsx(styles.title, className)}
      {...props}
    />
  );
});

const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  function AlertDescription({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="alert-description"
        className={clsx(styles.description, className)}
        {...props}
      />
    );
  },
);

const AlertClose = React.forwardRef<HTMLElement, AlertCloseProps>(function AlertClose(
  { className, onClick, ...props },
  ref,
) {
  const dismiss = React.useContext(AlertContext);
  const handleClick = (event: Parameters<NonNullable<CloseButtonProps['onClick']>>[0]) => {
    onClick?.(event);
    if (!event.defaultPrevented) dismiss?.();
  };

  return (
    <CloseButton
      ref={ref}
      data-slot="alert-close"
      className={mergeClassName(className, styles.close)}
      onClick={handleClick}
      {...props}
    />
  );
});

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