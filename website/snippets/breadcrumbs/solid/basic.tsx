import { Breadcrumbs } from '@moduix/solid/breadcrumbs';

const links = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
] as const;

export default function BreadcrumbsDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Path links={links} page="Go Developer" />
    </Breadcrumbs>
  );
}