<script lang="ts">
  import { Breadcrumbs, BreadcrumbsPath } from '@moduix/svelte/breadcrumbs';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  ];
</script>

<Breadcrumbs>
  <BreadcrumbsPath {links} page="Go Developer" separator="·" />
</Breadcrumbs>