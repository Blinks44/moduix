import clsx from 'clsx';
import * as React from 'react';
import styles from './Alert.module.css';

function Alert({
  className,
  role,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'destructive';
}) {
  return (
    <div
      role={role ?? (variant === 'destructive' ? 'alert' : 'status')}
      data-slot="alert-root"
      data-variant={variant}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function AlertIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="alert-icon"
      aria-hidden="true"
      className={clsx(styles.icon, className)}
      {...props}
    />
  );
}

function AlertContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-content" className={clsx(styles.content, className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 data-slot="alert-title" className={clsx(styles.title, className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-description" className={clsx(styles.description, className)} {...props} />
  );
}

export { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription };