import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import styles from './Empty.module.css';

const Empty = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function Empty(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      {...props}
      data-scope="empty"
      data-part="root"
      className={clsx(styles.root, className)}
      data-slot="empty-root"
    />
  );
});

const EmptyIcon = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function EmptyIcon(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      {...props}
      data-scope="empty"
      data-part="icon"
      className={clsx(styles.icon, className)}
      data-slot="empty-icon"
    />
  );
});

const EmptyContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function EmptyContent(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      {...props}
      data-scope="empty"
      data-part="content"
      className={clsx(styles.content, className)}
      data-slot="empty-content"
    />
  );
});

const EmptyTitle = forwardRef<HTMLHeadingElement, HTMLArkProps<'h3'>>(function EmptyTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      {...props}
      data-scope="empty"
      data-part="title"
      className={clsx(styles.title, className)}
      data-slot="empty-title"
    />
  );
});

const EmptyDescription = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function EmptyDescription(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      {...props}
      data-scope="empty"
      data-part="description"
      className={clsx(styles.description, className)}
      data-slot="empty-description"
    />
  );
});

const EmptyActions = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function EmptyActions(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      {...props}
      data-scope="empty"
      data-part="actions"
      className={clsx(styles.actions, className)}
      data-slot="empty-actions"
    />
  );
});

export { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle };