import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Alert.module.css';

type AlertStatus = 'neutral' | 'info' | 'success' | 'warning' | 'error';
type AlertRootProps = HTMLArkProps<'div'> & { status?: AlertStatus };

const AlertRoot = forwardRef<HTMLDivElement, AlertRootProps>(function AlertRoot(
  { className, role, status = 'neutral', ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      role={role ?? (status === 'error' ? 'alert' : 'status')}
      data-slot="alert-root"
      data-status={status}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const AlertIndicator = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function AlertIndicator(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      data-slot="alert-indicator"
      aria-hidden="true"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const AlertContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function AlertContent(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-slot="alert-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const AlertTitle = forwardRef<HTMLHeadingElement, HTMLArkProps<'h3'>>(function AlertTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      data-slot="alert-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
    />
  );
});

const AlertDescription = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function AlertDescription(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-slot="alert-description"
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
    />
  );
});

const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
});

export { Alert };
export type { AlertStatus };