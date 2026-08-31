import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { ChevronRightIcon } from '@/internal/icons/ui/Icons';
import styles from './Breadcrumbs.module.css';

type BreadcrumbsPathItem = {
  href?: string;
  key?: string | number;
  label: JSX.Element;
};

type BreadcrumbsPathProps = Omit<HTMLArkProps<'ol'>, 'asChild' | 'children'> & {
  items: readonly BreadcrumbsPathItem[];
  separator?: JSX.Element;
};

function BreadcrumbsRoot(props: HTMLArkProps<'nav'>) {
  const [local, others] = splitProps(props, ['aria-label', 'class']);

  return (
    <ark.nav
      aria-label={local['aria-label'] === undefined ? 'Breadcrumb' : local['aria-label']}
      {...others}
      data-slot="breadcrumbs-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

function BreadcrumbsList(props: HTMLArkProps<'ol'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.ol {...others} data-slot="breadcrumbs-list" class={clsx(styles.list, local.class)} />;
}

function BreadcrumbsItem(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.li {...others} data-slot="breadcrumbs-item" class={clsx(styles.item, local.class)} />;
}

function BreadcrumbsLink(props: HTMLArkProps<'a'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.a {...others} data-slot="breadcrumbs-link" class={clsx(styles.link, local.class)} />;
}

function BreadcrumbsPage(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <ark.span
      {...others}
      data-slot="breadcrumbs-page"
      aria-current="page"
      class={clsx(styles.page, local.class)}
    >
      {local.children}
    </ark.span>
  );
}

function BreadcrumbsPath(props: BreadcrumbsPathProps) {
  const [local, others] = splitProps(props, ['items', 'separator']);

  return (
    <BreadcrumbsList {...others}>
      <For each={local.items}>
        {(item, index) => {
          const isLastItem = () => index() === local.items.length - 1;

          return (
            <>
              <BreadcrumbsItem>
                {isLastItem() ? (
                  <BreadcrumbsPage>{item.label}</BreadcrumbsPage>
                ) : (
                  <BreadcrumbsLink href={item.href}>{item.label}</BreadcrumbsLink>
                )}
              </BreadcrumbsItem>
              {!isLastItem() ? (
                <BreadcrumbsSeparator>{local.separator}</BreadcrumbsSeparator>
              ) : null}
            </>
          );
        }}
      </For>
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
      class={clsx(styles.separator, local.class)}
    >
      {resolvedChildren() ?? <ChevronRightIcon class={styles.separatorIcon} />}
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
      class={clsx(styles.ellipsis, local.class)}
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