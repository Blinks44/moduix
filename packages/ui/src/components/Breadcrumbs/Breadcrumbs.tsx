import { clsx } from 'clsx';
import * as React from 'react';
import styles from './Breadcrumbs.module.css';

function Breadcrumbs({
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="breadcrumbs-root"
      aria-label={ariaLabel}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function BreadcrumbsList({ className, ...props }: React.ComponentProps<'ol'>) {
  return <ol data-slot="breadcrumbs-list" className={clsx(styles.list, className)} {...props} />;
}

function BreadcrumbsItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="breadcrumbs-item" className={clsx(styles.item, className)} {...props} />;
}

function BreadcrumbsLink({
  className,
  render,
  ...props
}: React.ComponentProps<'a'> & {
  render?: (
    props: React.ComponentPropsWithRef<'a'> & {
      'data-slot': 'breadcrumbs-link';
    },
  ) => React.ReactElement;
}) {
  const resolvedClassName = clsx(styles.link, className);

  if (render) {
    return render({ ...props, 'data-slot': 'breadcrumbs-link', className: resolvedClassName });
  }

  return <a data-slot="breadcrumbs-link" className={resolvedClassName} {...props} />;
}

function BreadcrumbsPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumbs-page"
      aria-current="page"
      className={clsx(styles.page, className)}
      {...props}
    />
  );
}

function BreadcrumbsSeparator({ className, children, ...props }: React.ComponentProps<'li'>) {
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

function BreadcrumbsEllipsis({ className, children, ...props }: React.ComponentProps<'span'>) {
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