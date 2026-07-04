import { Breadcrumbs } from '@moduix/react';
//#region demo
import { Fragment, type ComponentProps } from 'react';

const pathItems = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
] as const;

function AppLink(props: ComponentProps<'a'>) {
  return <a data-framework-link {...props} />;
}

export function BreadcrumbsWithAppLinkDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.List>
        {pathItems.map((item) => (
          <Fragment key={item.href}>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link asChild>
                <AppLink href={item.href}>{item.label}</AppLink>
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
          </Fragment>
        ))}
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
//#endregion