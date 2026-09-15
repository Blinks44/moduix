import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Alert.module.css';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

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
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.indicator, local.class)}
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
      class={clsx(styles.content, local.class)}
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
      class={clsx(styles.title, local.class)}
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
      class={clsx(styles.description, local.class)}
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
      class={clsx(styles.actions, local.class)}
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