'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef, ReactNode } from 'react';
import { Fragment, forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon, EllipsisIcon } from '@/lib/moduix/icons/ui';

type BreadcrumbsPathLink = {
  href: string;
  label: ReactNode;
};

type BreadcrumbsPathProps = Omit<HTMLArkProps<'ol'>, 'asChild' | 'children'> & {
  links: readonly BreadcrumbsPathLink[];
  page: ReactNode;
  separator?: ReactNode;
};

const Breadcrumbs = forwardRef<ComponentRef<typeof ark.nav>, HTMLArkProps<'nav'>>(
  function Breadcrumbs(
    { className, 'aria-label': ariaLabel = a11yLabels.breadcrumb, ...props },
    ref,
  ) {
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
          'flex min-w-0 items-center gap-1 whitespace-nowrap [&>[data-slot=breadcrumbs-item]:last-child]:max-w-64 [&>[data-slot=breadcrumbs-item]:last-child]:flex-auto',
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
          'block max-w-full min-w-0 truncate rounded-sm px-1 text-inherit no-underline transition-[color] duration-normal ease-in-out outline-none focus-visible:ring-1 focus-visible:ring-ring [@media(hover:hover)]:hover:text-foreground',
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
  function BreadcrumbsPath({ links, page, separator, ...props }, ref) {
    return (
      <BreadcrumbsList ref={ref} {...props}>
        {links.map((link, index) => (
          <Fragment key={index}>
            <BreadcrumbsItem>
              <BreadcrumbsLink href={link.href}>{link.label}</BreadcrumbsLink>
            </BreadcrumbsItem>
            <BreadcrumbsSeparator>{separator}</BreadcrumbsSeparator>
          </Fragment>
        ))}
        <BreadcrumbsItem>
          <BreadcrumbsPage>{page}</BreadcrumbsPage>
        </BreadcrumbsItem>
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
          'inline-flex items-center text-[length:0.875em] leading-none select-none',
          className,
        )}
      >
        {children ?? <ChevronRightIcon className="size-[1em] flex-none [&:dir(rtl)]:rotate-180" />}
      </ark.li>
    );
  },
);

const BreadcrumbsEllipsis = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function BreadcrumbsEllipsis({ className, children, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        {...props}
        data-slot="breadcrumbs-ellipsis"
        aria-hidden="true"
        className={cn(
          'inline-flex min-h-4 min-w-4 items-center justify-center rounded-sm px-1 transition-[color] duration-normal ease-in-out [:where(button:has(>&))]:cursor-pointer [:where(button:has(>&))]:outline-none [button:focus-visible>&]:ring-1 [button:focus-visible>&]:ring-ring [@media(hover:hover)]:[button:hover>&]:text-foreground',
          className,
        )}
      >
        {children ?? <EllipsisIcon className="size-[1em] flex-none" />}
      </ark.span>
    );
  },
);

export {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsPath,
  BreadcrumbsSeparator,
};
export type { BreadcrumbsPathLink, BreadcrumbsPathProps };