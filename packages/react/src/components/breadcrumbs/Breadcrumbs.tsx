import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { Fragment, forwardRef, type ComponentRef, type Key, type ReactNode } from 'react';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Breadcrumbs.module.css';

type BreadcrumbsPathItem = {
  href?: string;
  key?: Key;
  label: ReactNode;
};
type BreadcrumbsPathProps = Omit<HTMLArkProps<'ol'>, 'children'> & {
  items: readonly BreadcrumbsPathItem[];
  separator?: ReactNode;
};

const BreadcrumbsRoot = forwardRef<ComponentRef<typeof ark.nav>, HTMLArkProps<'nav'>>(
  function BreadcrumbsRoot({ className, 'aria-label': ariaLabel = 'Breadcrumb', ...props }, ref) {
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
  },
);

const BreadcrumbsList = forwardRef<ComponentRef<typeof ark.ol>, HTMLArkProps<'ol'>>(
  function BreadcrumbsList({ className, ...props }, ref) {
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
  },
);

const BreadcrumbsItem = forwardRef<ComponentRef<typeof ark.li>, HTMLArkProps<'li'>>(
  function BreadcrumbsItem({ className, ...props }, ref) {
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
  },
);

const BreadcrumbsLink = forwardRef<ComponentRef<typeof ark.a>, HTMLArkProps<'a'>>(
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

const BreadcrumbsPage = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function BreadcrumbsPage({ className, ...props }, ref) {
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
  },
);

function BreadcrumbsPath({ items, separator, ...props }: BreadcrumbsPathProps) {
  return (
    <BreadcrumbsList {...props}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <Fragment key={item.key ?? item.href ?? index}>
            <BreadcrumbsItem>
              {item.href && !isLastItem ? (
                <BreadcrumbsLink href={item.href}>{item.label}</BreadcrumbsLink>
              ) : (
                <BreadcrumbsPage>{item.label}</BreadcrumbsPage>
              )}
            </BreadcrumbsItem>
            {!isLastItem ? <BreadcrumbsSeparator>{separator}</BreadcrumbsSeparator> : null}
          </Fragment>
        );
      })}
    </BreadcrumbsList>
  );
}

const BreadcrumbsSeparator = forwardRef<ComponentRef<typeof ark.li>, HTMLArkProps<'li'>>(
  function BreadcrumbsSeparator({ className, children, role = 'presentation', ...props }, ref) {
    return (
      <ark.li
        ref={ref}
        data-scope="breadcrumbs"
        data-part="separator"
        data-slot="breadcrumbs-separator"
        aria-hidden="true"
        role={role}
        className={clsx(styles.separator, normalizeClassName(className))}
        {...props}
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
  Path: BreadcrumbsPath,
  Page: BreadcrumbsPage,
  Separator: BreadcrumbsSeparator,
  Ellipsis: BreadcrumbsEllipsis,
});

export { Breadcrumbs };