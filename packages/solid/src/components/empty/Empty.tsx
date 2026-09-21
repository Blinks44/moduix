import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Empty.module.css';

function Empty(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="root"
      data-slot="empty-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

function EmptyIcon(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="icon"
      data-slot="empty-icon"
      class={clsx(styles.icon, local.class)}
    />
  );
}

function EmptyContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="content"
      data-slot="empty-content"
      class={clsx(styles.content, local.class)}
    />
  );
}

function EmptyTitle(props: HTMLArkProps<'h3'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.h3
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="title"
      data-slot="empty-title"
      class={clsx(styles.title, local.class)}
    />
  );
}

function EmptyDescription(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="description"
      data-slot="empty-description"
      class={clsx(styles.description, local.class)}
    />
  );
}

function EmptyActions(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="actions"
      data-slot="empty-actions"
      class={clsx(styles.actions, local.class)}
    />
  );
}

export { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle };
