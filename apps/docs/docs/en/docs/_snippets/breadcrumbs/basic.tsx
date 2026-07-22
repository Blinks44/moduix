import { Breadcrumbs } from '@moduix/react';
const items = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  { label: 'Go Developer' },
] as const;

export default function BreadcrumbsDemo() {
  return (
    <Breadcrumbs className="breadcrumbs-preview">
      <Breadcrumbs.Path items={items} />
    </Breadcrumbs>
  );
}