import type { ComponentProps } from 'react';
import { useRender } from '@base-ui/react/use-render';
import { clsx } from 'clsx';
import styles from './Breadcrumbs.module.css';

function Breadcrumbs({
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="breadcrumbs-root"
      aria-label={ariaLabel}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function BreadcrumbsList({ className, ...props }: ComponentProps<'ol'>) {
  return <ol data-slot="breadcrumbs-list" className={clsx(styles.list, className)} {...props} />;
}

function BreadcrumbsItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-slot="breadcrumbs-item" className={clsx(styles.item, className)} {...props} />;
}

function BreadcrumbsLink({ className, render, ...props }: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: {
      ...props,
      'data-slot': 'breadcrumbs-link',
      className: clsx(styles.link, className),
    },
  });
}

function BreadcrumbsPage({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumbs-page"
      aria-current="page"
      className={clsx(styles.page, className)}
      {...props}
    />
  );
}

function BreadcrumbsSeparator({ className, children, ...props }: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumbs-separator"
      aria-hidden="true"
      className={clsx(styles.separator, className)}
      {...props}
    >
      {children ?? '/'}
    </li>
  );
}

function BreadcrumbsEllipsis({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumbs-ellipsis"
      aria-hidden="true"
      className={clsx(styles.ellipsis, className)}
      {...props}
    >
      {children ?? '...'}
    </span>
  );
}

export {
  Breadcrumbs,
  BreadcrumbsList,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
  BreadcrumbsEllipsis,
};