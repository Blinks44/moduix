import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Breadcrumbs.module.css';

export type BreadcrumbsRootProps = HTMLArkProps<'nav'>;
export type BreadcrumbsListProps = HTMLArkProps<'ol'>;
export type BreadcrumbsItemProps = HTMLArkProps<'li'>;
export type BreadcrumbsLinkProps = HTMLArkProps<'a'>;
export type BreadcrumbsPageProps = HTMLArkProps<'span'>;
export type BreadcrumbsSeparatorProps = HTMLArkProps<'li'>;
export type BreadcrumbsEllipsisProps = HTMLArkProps<'span'>;

const BreadcrumbsRoot = forwardRef<HTMLElement, BreadcrumbsRootProps>(function BreadcrumbsRoot(
  { className, 'aria-label': ariaLabel = 'Breadcrumb', ...props },
  ref,
) {
  return (
    <ark.nav
      ref={ref}
      data-scope="breadcrumbs"
      data-part="root"
      data-slot="breadcrumbs-root"
      aria-label={ariaLabel}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const BreadcrumbsList = forwardRef<HTMLOListElement, BreadcrumbsListProps>(function BreadcrumbsList(
  { className, ...props },
  ref,
) {
  return (
    <ark.ol
      ref={ref}
      data-scope="breadcrumbs"
      data-part="list"
      data-slot="breadcrumbs-list"
      className={clsx(styles.list, normalizeClassName(className))}
      {...props}
    />
  );
});

const BreadcrumbsItem = forwardRef<HTMLLIElement, BreadcrumbsItemProps>(function BreadcrumbsItem(
  { className, ...props },
  ref,
) {
  return (
    <ark.li
      ref={ref}
      data-scope="breadcrumbs"
      data-part="item"
      data-slot="breadcrumbs-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const BreadcrumbsLink = forwardRef<HTMLAnchorElement, BreadcrumbsLinkProps>(
  function BreadcrumbsLink({ className, ...props }, ref) {
    return (
      <ark.a
        ref={ref}
        data-scope="breadcrumbs"
        data-part="link"
        data-slot="breadcrumbs-link"
        className={clsx(styles.link, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const BreadcrumbsPage = forwardRef<HTMLSpanElement, BreadcrumbsPageProps>(function BreadcrumbsPage(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      data-scope="breadcrumbs"
      data-part="page"
      data-slot="breadcrumbs-page"
      aria-current="page"
      className={clsx(styles.page, normalizeClassName(className))}
      {...props}
    />
  );
});

const BreadcrumbsSeparator = forwardRef<HTMLLIElement, BreadcrumbsSeparatorProps>(
  function BreadcrumbsSeparator({ className, children = '/', ...props }, ref) {
    return (
      <ark.li
        ref={ref}
        data-scope="breadcrumbs"
        data-part="separator"
        data-slot="breadcrumbs-separator"
        aria-hidden="true"
        className={clsx(styles.separator, normalizeClassName(className))}
        {...props}
      >
        {children}
      </ark.li>
    );
  },
);

const BreadcrumbsEllipsis = forwardRef<HTMLSpanElement, BreadcrumbsEllipsisProps>(
  function BreadcrumbsEllipsis({ className, children = '...', ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-scope="breadcrumbs"
        data-part="ellipsis"
        data-slot="breadcrumbs-ellipsis"
        aria-hidden="true"
        className={clsx(styles.ellipsis, normalizeClassName(className))}
        {...props}
      >
        {children}
      </ark.span>
    );
  },
);

const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Root: BreadcrumbsRoot,
  List: BreadcrumbsList,
  Item: BreadcrumbsItem,
  Link: BreadcrumbsLink,
  Page: BreadcrumbsPage,
  Separator: BreadcrumbsSeparator,
  Ellipsis: BreadcrumbsEllipsis,
});

export { Breadcrumbs };