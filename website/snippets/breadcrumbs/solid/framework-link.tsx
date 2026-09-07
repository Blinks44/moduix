import { Breadcrumbs } from '@moduix/solid/breadcrumbs';
import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-framework-link.module.css';

const pathItems = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
] as const;

function AppLink(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a data-framework-link class={styles.link} {...props} />;
}

export default function BreadcrumbsWithAppLinkDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <For each={pathItems}>
          {(item) => (
            <>
              <Breadcrumbs.Item>
                <Breadcrumbs.Link
                  asChild={(props) => (
                    <AppLink {...props()} href={item.href}>
                      {item.label}
                    </AppLink>
                  )}
                />
              </Breadcrumbs.Item>
              <Breadcrumbs.Separator />
            </>
          )}
        </For>
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}