import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { createContext, splitProps, useContext } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

const alertVariants = cva(
  'box-border flex w-full min-w-0 items-start gap-3 rounded-lg border bg-card p-3 text-card-foreground',
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

const alertIndicatorVariants = cva(
  'mt-0.5 inline-flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      status: {
        info: 'text-muted-foreground',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-destructive',
      },
    },
  },
);

const AlertStatusContext = createContext<() => AlertStatus>((): AlertStatus => 'info');

type AlertRootProps = HTMLArkProps<'div'> & {
  status?: AlertStatus;
};

function AlertRoot(props: AlertRootProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'role', 'status']);

  return (
    <AlertStatusContext.Provider value={(): AlertStatus => local.status ?? 'info'}>
      <ark.div
        role={local.role ?? (local.status === 'error' ? 'alert' : 'status')}
        data-scope="alert"
        data-part="root"
        data-slot="alert-root"
        data-status={local.status ?? 'info'}
        class={cn(alertVariants({ status: local.status }), local.class)}
        {...others}
      >
        {local.children}
      </ark.div>
    </AlertStatusContext.Provider>
  );
}

function AlertIndicator(props: HTMLArkProps<'span'>) {
  const status = useContext(AlertStatusContext)!;
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-scope="alert"
      data-part="indicator"
      data-slot="alert-indicator"
      aria-hidden="true"
      class={cn(alertIndicatorVariants({ status: status() }), local.class)}
      {...others}
    />
  );
}

function AlertContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="alert"
      data-part="content"
      data-slot="alert-content"
      class={cn('grid min-w-0 flex-1 gap-1', local.class)}
      {...others}
    />
  );
}

function AlertTitle(props: HTMLArkProps<'p'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.p
      data-scope="alert"
      data-part="title"
      data-slot="alert-title"
      class={cn('m-0 min-w-0 text-sm font-semibold [overflow-wrap:anywhere]', local.class)}
      {...others}
    />
  );
}

function AlertDescription(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="alert"
      data-part="description"
      data-slot="alert-description"
      class={cn(
        'min-w-0 text-sm [overflow-wrap:anywhere] text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0',
        local.class,
      )}
      {...others}
    />
  );
}

function AlertActions(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="alert"
      data-part="actions"
      data-slot="alert-actions"
      class={cn('mt-2 flex flex-wrap gap-2', local.class)}
      {...others}
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