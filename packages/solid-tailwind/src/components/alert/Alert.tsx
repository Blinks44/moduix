import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
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

function AlertRoot(props: AlertRootProps) {
  const [local, others] = splitProps(props, ['class', 'role', 'status']);

  return (
    <ark.div
      role={local.role ?? (local.status === 'error' ? 'alert' : 'status')}
      data-scope="alert"
      data-part="root"
      data-status={local.status ?? 'info'}
      class={cn(alertVariants({ status: local.status }), local.class)}
      {...others}
      data-slot="alert-root"
    />
  );
}

function AlertIndicator(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-scope="alert"
      data-part="indicator"
      aria-hidden="true"
      class={cn(
        'mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground group-data-[status=error]/alert:text-destructive group-data-[status=success]/alert:text-success group-data-[status=warning]/alert:text-warning [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        local.class,
      )}
      {...others}
      data-slot="alert-indicator"
    />
  );
}

function AlertContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="alert"
      data-part="content"
      class={cn('grid min-w-0 flex-1 gap-1', local.class)}
      {...others}
      data-slot="alert-content"
    />
  );
}

function AlertTitle(props: HTMLArkProps<'p'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.p
      data-scope="alert"
      data-part="title"
      class={cn('m-0 min-w-0 text-sm font-semibold [overflow-wrap:anywhere]', local.class)}
      {...others}
      data-slot="alert-title"
    />
  );
}

function AlertDescription(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="alert"
      data-part="description"
      class={cn(
        'min-w-0 text-sm [overflow-wrap:anywhere] text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0',
        local.class,
      )}
      {...others}
      data-slot="alert-description"
    />
  );
}

function AlertActions(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="alert"
      data-part="actions"
      class={cn('mt-2 flex flex-wrap gap-2', local.class)}
      {...others}
      data-slot="alert-actions"
    />
  );
}

const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
  Actions: AlertActions,
});

export { Alert };