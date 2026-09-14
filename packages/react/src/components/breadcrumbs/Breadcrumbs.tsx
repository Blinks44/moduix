import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { Fragment, forwardRef, type ComponentRef, type Key, type ReactNode } from 'react';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
import styles from './Breadcrumbs.module.css';

type BreadcrumbsPathItem = {
  href?: string;
  key?: Key;
  label: ReactNode;
};
type BreadcrumbsPathProps = Omit<HTMLArkProps<'ol'>, 'asChild' | 'children'> & {
  items: readonly BreadcrumbsPathItem[];
  separator?: ReactNode;
};

const BreadcrumbsRoot = forwardRef<ComponentRef<typeof ark.nav>, HTMLArkProps<'nav'>>(
  function BreadcrumbsRoot({ className, 'aria-label': ariaLabel = 'Breadcrumb', ...props }, ref) {
    return (
      <ark.nav
        ref={ref}
        aria-label={ariaLabel}
        {...props}
        data-slot="breadcrumbs-root"
        className={clsx(styles.root, className)}
      />
    );
  },
);

const BreadcrumbsList = forwardRef<ComponentRef<typeof ark.ol>, HTMLArkProps<'ol'>>(
  function BreadcrumbsList({ className, ...props }, ref) {
    return (
      <ark.ol
        ref={ref}
        {...props}
        data-slot="breadcrumbs-list"
        className={clsx(styles.list, className)}
      />
    );
  },
);

const BreadcrumbsItem = forwardRef<ComponentRef<typeof ark.li>, HTMLArkProps<'li'>>(
  function BreadcrumbsItem({ className, ...props }, ref) {
    return (
      <ark.li
        ref={ref}
        {...props}
        data-slot="breadcrumbs-item"
        className={clsx(styles.item, className)}
      />
    );
  },
);

const BreadcrumbsLink = forwardRef<ComponentRef<typeof ark.a>, HTMLArkProps<'a'>>(
  function BreadcrumbsLink({ className, ...props }, ref) {
    return (
      <ark.a
        ref={ref}
        {...props}
        data-slot="breadcrumbs-link"
        className={clsx(styles.link, className)}
      />
    );
  },
);

const BreadcrumbsPage = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function BreadcrumbsPage({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        {...props}
        data-slot="breadcrumbs-page"
        aria-current="page"
        className={clsx(styles.page, className)}
      />
    );
  },
);

const BreadcrumbsPath = forwardRef<ComponentRef<typeof ark.ol>, BreadcrumbsPathProps>(
  function BreadcrumbsPath({ items, separator, ...props }, ref) {
    return (
      <BreadcrumbsList ref={ref} {...props}>
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <Fragment key={item.key ?? index}>
              <BreadcrumbsItem>
                {isLastItem ? (
                  <BreadcrumbsPage>{item.label}</BreadcrumbsPage>
                ) : (
                  <BreadcrumbsLink href={item.href}>{item.label}</BreadcrumbsLink>
                )}
              </BreadcrumbsItem>
              {!isLastItem ? <BreadcrumbsSeparator>{separator}</BreadcrumbsSeparator> : null}
            </Fragment>
          );
        })}
      </BreadcrumbsList>
    );
  },
);

const BreadcrumbsSeparator = forwardRef<ComponentRef<typeof ark.li>, HTMLArkProps<'li'>>(
  function BreadcrumbsSeparator({ className, children, ...props }, ref) {
    return (
      <ark.li
        ref={ref}
        {...props}
        data-slot="breadcrumbs-separator"
        aria-hidden="true"
        className={clsx(styles.separator, className)}
      >
        {children ?? <ChevronRightIcon className={styles.separatorIcon} />}
      </ark.li>
    );
  },
);

const BreadcrumbsEllipsis = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function BreadcrumbsEllipsis({ className, children = '...', ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        {...props}
        data-slot="breadcrumbs-ellipsis"
        aria-hidden="true"
        className={clsx(styles.ellipsis, className)}
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
  Path: BreadcrumbsPath,
  Page: BreadcrumbsPage,
  Separator: BreadcrumbsSeparator,
  Ellipsis: BreadcrumbsEllipsis,
});

export { Breadcrumbs };