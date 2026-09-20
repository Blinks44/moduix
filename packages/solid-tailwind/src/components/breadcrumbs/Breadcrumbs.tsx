import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { JSX } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';

type BreadcrumbsPathLink = {
  href: string;
  label: JSX.Element;
};

type BreadcrumbsPathProps = Omit<HTMLArkProps<'ol'>, 'asChild' | 'children'> & {
  links: readonly BreadcrumbsPathLink[];
  page: JSX.Element;
  separator?: JSX.Element;
};

function BreadcrumbsRoot(props: HTMLArkProps<'nav'>) {
  const [local, others] = splitProps(props, ['aria-label', 'class']);

  return (
    <ark.nav
      aria-label={local['aria-label'] === undefined ? 'Breadcrumb' : local['aria-label']}
      {...others}
      data-slot="breadcrumbs-root"
      class={cn('max-w-full text-sm text-muted-foreground', local.class)}
    />
  );
}

function BreadcrumbsList(props: HTMLArkProps<'ol'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.ol
      {...others}
      data-slot="breadcrumbs-list"
      class={cn(
        "flex min-w-0 items-center gap-1 whitespace-nowrap [&>[data-slot='breadcrumbs-item']:last-child]:max-w-64 [&>[data-slot='breadcrumbs-item']:last-child]:flex-auto",
        local.class,
      )}
    />
  );
}

function BreadcrumbsItem(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.li
      {...others}
      data-slot="breadcrumbs-item"
      class={cn('inline-flex min-w-0 items-center', local.class)}
    />
  );
}

function BreadcrumbsLink(props: HTMLArkProps<'a'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.a
      {...others}
      data-slot="breadcrumbs-link"
      class={cn(
        'block max-w-full min-w-0 truncate rounded-sm px-1 text-muted-foreground no-underline underline-offset-[0.2em] transition-[color] duration-200 ease-in-out outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none [@media(hover:hover)]:hover:text-foreground',
        local.class,
      )}
    />
  );
}

function BreadcrumbsPage(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <ark.span
      {...others}
      data-slot="breadcrumbs-page"
      aria-current="page"
      class={cn('block max-w-full min-w-0 truncate px-1 font-medium text-foreground', local.class)}
    >
      {local.children}
    </ark.span>
  );
}

function BreadcrumbsPath(props: BreadcrumbsPathProps) {
  const [local, others] = splitProps(props, ['links', 'page', 'separator']);

  return (
    <BreadcrumbsList {...others}>
      <For each={local.links}>
        {(link) => (
          <>
            <BreadcrumbsItem>
              <BreadcrumbsLink href={link.href}>{link.label}</BreadcrumbsLink>
            </BreadcrumbsItem>
            <BreadcrumbsSeparator>{local.separator}</BreadcrumbsSeparator>
          </>
        )}
      </For>
      <BreadcrumbsItem>
        <BreadcrumbsPage>{local.page}</BreadcrumbsPage>
      </BreadcrumbsItem>
    </BreadcrumbsList>
  );
}

function BreadcrumbsSeparator(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ark.li
      {...others}
      data-slot="breadcrumbs-separator"
      aria-hidden="true"
      class={cn(
        'inline-flex items-center text-[length:0.875em] leading-none text-muted-foreground select-none',
        local.class,
      )}
    >
      {resolvedChildren() ?? <ChevronRightIcon class="size-[1em] flex-none rtl:rotate-180" />}
    </ark.li>
  );
}

function BreadcrumbsEllipsis(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ark.span
      {...others}
      data-slot="breadcrumbs-ellipsis"
      aria-hidden="true"
      class={cn(
        'inline-flex min-h-4 min-w-4 items-center justify-center overflow-hidden px-1 text-ellipsis text-muted-foreground',
        local.class,
      )}
    >
      {resolvedChildren() === undefined ? '...' : resolvedChildren()}
    </ark.span>
  );
}

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