import { Breadcrumbs } from '@moduix/react';
//#region demo
import { Fragment } from 'react';

const pathItems = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
] as const;

const currentPage = 'Go Developer';

export function BreadcrumbsDemo() {
  return (
    <Breadcrumbs className="breadcrumbs-preview">
      <Breadcrumbs.List>
        {pathItems.map((item) => (
          <Fragment key={item.href}>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href={item.href}>{item.label}</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
          </Fragment>
        ))}
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>{currentPage}</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
//#endregion