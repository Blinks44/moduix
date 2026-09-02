import { Breadcrumbs } from '@moduix/react/breadcrumbs';
const items = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  { label: 'Go Developer' },
] as const;

export default function BreadcrumbsDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Path items={items} />
    </Breadcrumbs>
  );
}