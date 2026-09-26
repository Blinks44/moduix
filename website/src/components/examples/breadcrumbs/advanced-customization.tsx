import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/react/breadcrumbs';
import { Minus as SeparatorMarkIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-advanced-customization.module.css';

function AppLink(props: ComponentProps<'a'>) {
  return <a data-framework-link className={styles.link} {...props} />;
}

export default function BreadcrumbsAdvancedCustomizationDemo() {
  return (
    <Breadcrumbs className={styles.root}>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink asChild>
            <AppLink href="/">Home</AppLink>
          </BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink asChild>
            <AppLink href="/docs">Docs</AppLink>
          </BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator>
          <SeparatorMarkIcon className={styles.separatorIcon} />
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