import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

type AlertRootProps = HTMLArkProps<'div'> & {
  status?: AlertStatus;
};

const rootClassName =
  "box-border grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-[var(--moduix-radius-lg)] border border-border bg-card p-3 text-card-foreground data-[status=success]:border-[color-mix(in_oklab,var(--color-success)_34%,transparent)] data-[status=success]:bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] data-[status=success]:text-foreground data-[status=warning]:border-[color-mix(in_oklab,var(--color-warning)_38%,transparent)] data-[status=warning]:bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] data-[status=warning]:text-foreground data-[status=error]:border-[color-mix(in_oklab,var(--color-destructive)_35%,transparent)] data-[status=error]:bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] data-[status=error]:text-foreground [&[data-status='success']>[data-part='indicator']]:text-success [&[data-status='warning']>[data-part='indicator']]:text-warning [&[data-status='error']>[data-part='indicator']]:text-destructive";

const rootChildClassName =
  "[&>[data-part='title']]:[grid-column:2] [&>[data-part='description']]:[grid-column:2] [&:not(:has(>[data-part='indicator']))]:grid-cols-[minmax(0,1fr)] [&:not(:has(>[data-part='indicator']))_>[data-part='content']]:[grid-column:1] [&:not(:has(>[data-part='indicator']))_>[data-part='title']]:[grid-column:1] [&:not(:has(>[data-part='indicator']))_>[data-part='description']]:[grid-column:1]";

const indicatorClassName =
  'mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

const contentClassName = 'grid min-w-0 gap-1';

const titleClassName = 'm-0 min-w-0 text-sm/5 font-semibold [overflow-wrap:anywhere]';

const descriptionClassName =
  'min-w-0 text-sm/5 text-muted-foreground [overflow-wrap:anywhere] [&>:first-child]:mt-0 [&>:last-child]:mb-0';

const actionsClassName = 'mt-2 flex flex-wrap gap-2';

function AlertRoot(props: AlertRootProps) {
  const [local, others] = splitProps(props, ['class', 'role', 'status']);

  return (
    <ark.div
      role={local.role ?? (local.status === 'error' ? 'alert' : 'status')}
      data-scope="alert"
      data-part="root"
      data-slot="alert-root"
      data-status={local.status ?? 'info'}
      class={cn(rootClassName, rootChildClassName, local.class)}
      {...others}
    />
  );
}

function AlertIndicator(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-scope="alert"
      data-part="indicator"
      data-slot="alert-indicator"
      aria-hidden="true"
      class={cn(indicatorClassName, local.class)}
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
      class={cn(contentClassName, local.class)}
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
      class={cn(titleClassName, local.class)}
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
      class={cn(descriptionClassName, local.class)}
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
      class={cn(actionsClassName, local.class)}
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