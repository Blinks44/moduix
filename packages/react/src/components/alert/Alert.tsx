import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef } from 'react';
import styles from './Alert.module.css';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

type AlertRootProps = HTMLArkProps<'div'> & {
  status?: AlertStatus;
};

const AlertRoot = forwardRef<ComponentRef<typeof ark.div>, AlertRootProps>(function AlertRoot(
  { children, className, role, status = 'info', ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      role={role}
      className={clsx(styles.root, className)}
      {...props}
      data-scope="alert"
      data-part="root"
      data-status={status}
      data-slot="alert-root"
    >
      {children}
    </ark.div>
  );
});

const AlertIndicator = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function AlertIndicator({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        aria-hidden="true"
        className={clsx(styles.indicator, className)}
        {...props}
        data-scope="alert"
        data-part="indicator"
        data-slot="alert-indicator"
      />
    );
  },
);

const AlertContent = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertContent({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.content, className)}
        {...props}
        data-scope="alert"
        data-part="content"
        data-slot="alert-content"
      />
    );
  },
);

const AlertTitle = forwardRef<ComponentRef<typeof ark.p>, HTMLArkProps<'p'>>(function AlertTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.p
      ref={ref}
      className={clsx(styles.title, className)}
      {...props}
      data-scope="alert"
      data-part="title"
      data-slot="alert-title"
    />
  );
});

const AlertDescription = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertDescription({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.description, className)}
        {...props}
        data-scope="alert"
        data-part="description"
        data-slot="alert-description"
      />
    );
  },
);

const AlertActions = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertActions({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.actions, className)}
        {...props}
        data-scope="alert"
        data-part="actions"
        data-slot="alert-actions"
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
  Actions: AlertActions,
});

export { Alert };