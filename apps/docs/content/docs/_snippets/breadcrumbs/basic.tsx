import { Breadcrumbs } from '@moduix/react';
//#region demo
const items = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  { label: 'Go Developer' },
] as const;

export function BreadcrumbsDemo() {
  return (
    <Breadcrumbs className="breadcrumbs-preview">
      <Breadcrumbs.Path items={items} />
    </Breadcrumbs>
  );
}
//#endregion