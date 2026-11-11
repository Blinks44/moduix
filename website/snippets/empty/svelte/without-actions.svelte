<script lang="ts">
  import { Map as MapIcon } from '@lucide/svelte';
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyIcon,
    EmptyTitle,
  } from '@moduix/svelte/empty';
  import styles from '@/components/examples/empty/empty-without-actions.module.css';

  const emptyState = {
    title: 'No saved places',
    description: 'Save frequently used destinations to keep them close to your workspace.',
  };
</script>

<Empty class={styles.root}>
  <EmptyIcon><MapIcon aria-hidden="true" /></EmptyIcon>
  <EmptyContent>
    <EmptyTitle>{emptyState.title}</EmptyTitle>
    <EmptyDescription>{emptyState.description}</EmptyDescription>
  </EmptyContent>
</Empty>