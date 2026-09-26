import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/react/breadcrumbs';
import { Fragment, type ComponentProps } from 'react';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-framework-link.module.css';

const pathItems = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
] as const;

function AppLink(props: ComponentProps<'a'>) {
  return <a data-framework-link className={styles.link} {...props} />;
}

export default function BreadcrumbsWithAppLinkDemo() {
  return (
    <Breadcrumbs>
      <BreadcrumbsList>
        {pathItems.map((item) => (
          <Fragment key={item.href}>
            <BreadcrumbsItem>
              <BreadcrumbsLink asChild>
                <AppLink href={item.href}>{item.label}</AppLink>
              </BreadcrumbsLink>
            </BreadcrumbsItem>
            <BreadcrumbsSeparator />
          </Fragment>
        ))}
        <BreadcrumbsItem>
          <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
}