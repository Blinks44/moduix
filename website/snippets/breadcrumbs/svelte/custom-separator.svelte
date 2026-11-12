<script lang="ts">
  import { Minus as SeparatorMarkIcon } from '@lucide/svelte';
  import { Breadcrumbs, BreadcrumbsPath } from '@moduix/svelte/breadcrumbs';
  import styles from '@/components/examples/breadcrumbs/breadcrumbs-custom-separator.module.css';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  ];
</script>

{#snippet separator()}
  <SeparatorMarkIcon class={styles.separatorIcon} />
{/snippet}

<Breadcrumbs>
  <BreadcrumbsPath {links} page="Go Developer" {separator} />
</Breadcrumbs>