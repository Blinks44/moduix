import { Breadcrumbs } from '@moduix/react/breadcrumbs';
import { Minus as SeparatorMarkIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import styles from '@/components/examples/breadcrumbs-advanced-customization.module.css';

function AppLink(props: ComponentProps<'a'>) {
  return <a data-framework-link className={styles.link} {...props} />;
}

export default function BreadcrumbsAdvancedCustomizationDemo() {
  return (
    <Breadcrumbs className={styles.root}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link asChild>
            <AppLink href="/">Home</AppLink>
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link asChild>
            <AppLink href="/docs">Docs</AppLink>
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator>
          <SeparatorMarkIcon className={styles.separatorIcon} />
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