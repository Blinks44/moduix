<script lang="ts">
  import { Breadcrumbs, BreadcrumbsPath } from '@moduix/svelte/breadcrumbs';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/vacancies', label: 'Vacancies' },
  ];
  const longCurrentLabel =
    'Go lang developer to production team with cross-functional ownership and platform support';
</script>

{#snippet page()}
  <span title={longCurrentLabel}>{longCurrentLabel}</span>
{/snippet}

<Breadcrumbs>
  <BreadcrumbsPath {links} {page} />
</Breadcrumbs>