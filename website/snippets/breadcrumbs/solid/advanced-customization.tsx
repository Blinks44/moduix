import { Breadcrumbs } from '@moduix/solid/breadcrumbs';
import { Minus as SeparatorMarkIcon } from 'lucide-solid';
import type { JSX } from 'solid-js';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-advanced-customization.module.css';

function AppLink(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a data-framework-link class={styles.link} {...props} />;
}

export default function BreadcrumbsAdvancedCustomizationDemo() {
  return (
    <Breadcrumbs class={styles.root}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link
            asChild={(props) => (
              <AppLink {...props()} href="/">
                Home
              </AppLink>
            )}
          />
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link
            asChild={(props) => (
              <AppLink {...props()} href="/docs">
                Docs
              </AppLink>
            )}
          />
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator>
          <SeparatorMarkIcon class={styles.separatorIcon} />
        </Breadcrumbs.Separator>
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>
            <span title="Go lang developer to production team with cross-functional ownership and platform support">
              Go lang developer to production team with cross-functional ownership and platform
              support
            </span>
          </Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}