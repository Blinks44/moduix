import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Alert.module.css';

type AlertRootProps = HTMLArkProps<'div'> & {
  status?: 'neutral' | 'info' | 'success' | 'warning' | 'error';
};

const AlertRoot = forwardRef<ComponentRef<typeof ark.div>, AlertRootProps>(function AlertRoot(
  { className, role, status = 'neutral', ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      role={role ?? (status === 'error' ? 'alert' : 'status')}
      data-scope="alert"
      data-part="root"
      data-slot="alert-root"
      data-status={status}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const AlertIndicator = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function AlertIndicator({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-scope="alert"
        data-part="indicator"
        data-slot="alert-indicator"
        aria-hidden="true"
        className={clsx(styles.indicator, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const AlertContent = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertContent({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="alert"
        data-part="content"
        data-slot="alert-content"
        className={clsx(styles.content, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const AlertTitle = forwardRef<ComponentRef<typeof ark.h3>, HTMLArkProps<'h3'>>(function AlertTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      data-scope="alert"
      data-part="title"
      data-slot="alert-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
    />
  );
});

const AlertDescription = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertDescription({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="alert"
        data-part="description"
        data-slot="alert-description"
        className={clsx(styles.description, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
});

export { Alert };