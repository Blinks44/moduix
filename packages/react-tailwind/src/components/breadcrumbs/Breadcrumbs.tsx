'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef, Key, ReactNode } from 'react';
import { Fragment, forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

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
        className={cn('max-w-full text-sm text-muted-foreground', className)}
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
        className={cn(
          "flex min-w-0 items-center gap-1 whitespace-nowrap [&>[data-slot='breadcrumbs-item']:last-child]:max-w-64 [&>[data-slot='breadcrumbs-item']:last-child]:flex-auto",
          className,
        )}
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
        className={cn('inline-flex min-w-0 items-center', className)}
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
        className={cn(
          'block max-w-full min-w-0 truncate rounded-sm px-1 text-muted-foreground no-underline underline-offset-[0.2em] transition-[color] duration-200 ease-in-out outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none [@media(hover:hover)]:hover:text-foreground',
          className,
        )}
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
        className={cn(
          'block max-w-full min-w-0 truncate px-1 font-medium text-foreground',
          className,
        )}
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
        className={cn(
          'inline-flex items-center text-[length:0.875em] leading-none text-muted-foreground select-none',
          className,
        )}
      >
        {children ?? <ChevronRightIcon className="size-[1em] flex-none rtl:rotate-180" />}
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
        className={cn(
          'inline-flex min-h-4 min-w-4 items-center justify-center overflow-hidden px-1 text-ellipsis text-muted-foreground',
          className,
        )}
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