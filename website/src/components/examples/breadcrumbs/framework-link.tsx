import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/react/breadcrumbs';
import { Fragment, type ComponentProps } from 'react';

const pathItems = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
] as const;

function AppLink(props: ComponentProps<'a'>) {
  return <a data-framework-link {...props} />;
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