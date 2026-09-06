import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

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
      role={role ?? (status === 'error' ? 'alert' : 'status')}
      data-scope="alert"
      data-part="root"
      data-slot="alert-root"
      data-status={status}
      className={cn(
        "box-border grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-[var(--moduix-radius-lg)] border border-border bg-card p-3 text-card-foreground data-[status=error]:border-[color-mix(in_oklab,var(--color-destructive)_35%,transparent)] data-[status=error]:bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] data-[status=error]:text-foreground data-[status=success]:border-[color-mix(in_oklab,var(--color-success)_34%,transparent)] data-[status=success]:bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] data-[status=success]:text-foreground data-[status=warning]:border-[color-mix(in_oklab,var(--color-warning)_38%,transparent)] data-[status=warning]:bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] data-[status=warning]:text-foreground [&:not(:has(>[data-part='indicator']))]:grid-cols-[minmax(0,1fr)] [&:not(:has(>[data-part='indicator']))_>[data-part='content']]:[grid-column:1] [&:not(:has(>[data-part='indicator']))_>[data-part='description']]:[grid-column:1] [&:not(:has(>[data-part='indicator']))_>[data-part='title']]:[grid-column:1] [&>[data-part='description']]:[grid-column:2] [&>[data-part='title']]:[grid-column:2] [&[data-status='error']>[data-part='indicator']]:text-destructive [&[data-status='success']>[data-part='indicator']]:text-success [&[data-status='warning']>[data-part='indicator']]:text-warning",
        className,
      )}
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
          'mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
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
        className={cn('grid min-w-0 gap-1', className)}
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
      className={cn('m-0 min-w-0 text-sm/5 font-semibold [overflow-wrap:anywhere]', className)}
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
          'min-w-0 text-sm/5 [overflow-wrap:anywhere] text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0',
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