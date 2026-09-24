import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Breadcrumbs.module.css';

type BreadcrumbsPathLink = {
  href: string;
  label: JSX.Element;
};

type BreadcrumbsPathProps = Omit<HTMLArkProps<'ol'>, 'asChild' | 'children'> & {
  links: readonly BreadcrumbsPathLink[];
  page: JSX.Element;
  separator?: JSX.Element;
};

function Breadcrumbs(props: HTMLArkProps<'nav'>) {
  const [local, others] = splitProps(props, ['aria-label', 'class']);

  return (
    <ark.nav
      aria-label={local['aria-label'] === undefined ? a11yLabels.breadcrumb : local['aria-label']}
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