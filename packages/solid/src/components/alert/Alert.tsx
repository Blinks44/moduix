import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Alert.module.css';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

type AlertProps = HTMLArkProps<'div'> & {
  status?: AlertStatus;
};

function Alert(props: AlertProps) {
  const [local, others] = splitProps(props, ['class', 'role', 'status']);

  return (
    <ark.div
      role={local.role}
      class={clsx(styles.root, local.class)}
      {...others}
      data-scope="alert"
      data-part="root"
      data-status={local.status ?? 'info'}
      data-slot="alert-root"
    />
  );
}

function AlertIndicator(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      aria-hidden="true"
      class={clsx(styles.indicator, local.class)}
      {...others}
      data-scope="alert"
      data-part="indicator"
      data-slot="alert-indicator"
    />
  );
}

function AlertContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={clsx(styles.content, local.class)}
      {...others}
      data-scope="alert"
      data-part="content"
      data-slot="alert-content"
    />
  );
}

function AlertTitle(props: HTMLArkProps<'p'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.p
      class={clsx(styles.title, local.class)}
      {...others}
      data-scope="alert"
      data-part="title"
      data-slot="alert-title"
    />
  );
}

function AlertDescription(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={clsx(styles.description, local.class)}
      {...others}
      data-scope="alert"
      data-part="description"
      data-slot="alert-description"
    />
  );
}

function AlertActions(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={clsx(styles.actions, local.class)}
      {...others}
      data-scope="alert"
      data-part="actions"
      data-slot="alert-actions"
    />
  );
}

export { Alert, AlertActions, AlertContent, AlertDescription, AlertIndicator, AlertTitle };