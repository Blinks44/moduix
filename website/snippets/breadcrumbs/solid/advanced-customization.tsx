import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/solid/breadcrumbs';
import { Minus as SeparatorMarkIcon } from 'lucide-solid';
import type { JSX } from 'solid-js';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-advanced-customization.module.css';

function AppLink(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a data-framework-link class={styles.link} {...props} />;
}

export default function BreadcrumbsAdvancedCustomizationDemo() {
  return (
    <Breadcrumbs class={styles.root}>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink
            asChild={(props) => (
              <AppLink {...props()} href="/">
                Home
              </AppLink>
            )}
          />
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink
            asChild={(props) => (
              <AppLink {...props()} href="/docs">
                Docs
              </AppLink>
            )}
          />
        </BreadcrumbsItem>
        <BreadcrumbsSeparator>
          <SeparatorMarkIcon class={styles.separatorIcon} />
        </BreadcrumbsSeparator>
        <BreadcrumbsItem>
          <BreadcrumbsPage>
            <span title="Go lang developer to production team with cross-functional ownership and platform support">
              Go lang developer to production team with cross-functional ownership and platform
              support
            </span>
          </BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
}