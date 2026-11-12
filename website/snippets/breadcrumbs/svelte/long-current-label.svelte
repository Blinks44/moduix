<script lang="ts">
  import { Breadcrumbs, BreadcrumbsPath } from '@moduix/svelte/breadcrumbs';
  import styles from '@/components/examples/breadcrumbs/breadcrumbs-long-current-label.module.css';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  ];
  const currentPage =
    'Go lang developer to production team with cross-functional ownership and platform support';
</script>

{#snippet page()}
  <span title={currentPage}>{currentPage}</span>
{/snippet}

<Breadcrumbs class={styles.root}>
  <BreadcrumbsPath {links} {page} />
</Breadcrumbs>