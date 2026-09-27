<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyTitle } from '@moduix/vue/empty';
import styles from '@/components/examples/empty/empty-without-icon.module.css';

const emptyState = {
  title: 'No results found',
  description: 'Try changing the search query or clearing one of the active filters.',
  action: 'Clear filters',
};
</script>

<template>
  <Empty :class="styles.root">
    <EmptyContent>
      <EmptyTitle>{{ emptyState.title }}</EmptyTitle>
      <EmptyDescription>{{ emptyState.description }}</EmptyDescription>
    </EmptyContent>
    <EmptyActions>
      <Button variant="outline">{{ emptyState.action }}</Button>
    </EmptyActions>
  </Empty>
</template>