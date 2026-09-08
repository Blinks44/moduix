import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

const alertVariants = cva(
  'group/alert box-border flex w-full min-w-0 items-start gap-3 rounded-lg border bg-card p-3 text-card-foreground',
  {
    variants: {
      status: {
        info: 'border-border',
        success:
          'border-success/34 bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] text-foreground',
        warning:
          'border-warning/38 bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] text-foreground',
        error:
          'border-destructive/35 bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] text-foreground',
      },
    },
    defaultVariants: {
      status: 'info',
    },
  },
);

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
      role={role ?? (status === 'error' ? 'alert' : 'status')}
      data-scope="alert"
      data-part="root"
      data-slot="alert-root"
      data-status={status}
      className={cn(alertVariants({ status }), className)}
      {...props}
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
        data-scope="alert"
        data-part="indicator"
        data-slot="alert-indicator"
        aria-hidden="true"
        className={cn(
          'mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground group-data-[status=error]/alert:text-destructive group-data-[status=success]/alert:text-success group-data-[status=warning]/alert:text-warning [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          className,
        )}
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
        className={cn('grid min-w-0 flex-1 gap-1', className)}
        {...props}
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
      data-scope="alert"
      data-part="title"
      data-slot="alert-title"
      className={cn('m-0 min-w-0 text-sm font-semibold [overflow-wrap:anywhere]', className)}
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
        className={cn(
          'min-w-0 text-sm [overflow-wrap:anywhere] text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0',
          className,
        )}
        {...props}
      />
    );
  },
);

const AlertActions = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertActions({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="alert"
        data-part="actions"
        data-slot="alert-actions"
        className={cn('mt-2 flex flex-wrap gap-2', className)}
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
  Actions: AlertActions,
});

export { Alert };