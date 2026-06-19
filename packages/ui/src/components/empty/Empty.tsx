import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Empty.module.css';

export type EmptyRootProps = HTMLArkProps<'div'>;
export type EmptyIconProps = HTMLArkProps<'div'>;
export type EmptyContentProps = HTMLArkProps<'div'>;
export type EmptyTitleProps = HTMLArkProps<'h3'>;
export type EmptyDescriptionProps = HTMLArkProps<'div'>;
export type EmptyActionsProps = HTMLArkProps<'div'>;

const EmptyRoot = forwardRef<HTMLDivElement, EmptyRootProps>(function EmptyRoot(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="empty"
      data-part="root"
      data-slot="empty-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const EmptyIcon = forwardRef<HTMLDivElement, EmptyIconProps>(function EmptyIcon(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="empty"
      data-part="icon"
      data-slot="empty-icon"
      className={clsx(styles.icon, normalizeClassName(className))}
      {...props}
    />
  );
});

const EmptyContent = forwardRef<HTMLDivElement, EmptyContentProps>(function EmptyContent(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="empty"
      data-part="content"
      data-slot="empty-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const EmptyTitle = forwardRef<HTMLHeadingElement, EmptyTitleProps>(function EmptyTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      data-scope="empty"
      data-part="title"
      data-slot="empty-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
    />
  );
});

const EmptyDescription = forwardRef<HTMLDivElement, EmptyDescriptionProps>(
  function EmptyDescription({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="empty"
        data-part="description"
        data-slot="empty-description"
        className={clsx(styles.description, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const EmptyActions = forwardRef<HTMLDivElement, EmptyActionsProps>(function EmptyActions(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="empty"
      data-part="actions"
      data-slot="empty-actions"
      className={clsx(styles.actions, normalizeClassName(className))}
      {...props}
    />
  );
});

const Empty = Object.assign(EmptyRoot, {
  Root: EmptyRoot,
  Icon: EmptyIcon,
  Content: EmptyContent,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Actions: EmptyActions,
});

export { Empty };