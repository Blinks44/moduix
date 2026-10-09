<script setup lang="ts">
import { Computer as ComputerIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@moduix/vue/empty';
import styles from '@/components/examples/empty/empty-basic.module.css';

const emptyState = {
  title: 'No deployments yet',
  description: 'Connect a repository to start tracking release status and deployment history.',
  primaryAction: 'Connect repository',
  secondaryAction: 'Read setup guide',
};
</script>

<template>
  <Empty :class="styles.root">
    <EmptyIcon><ComputerIcon aria-hidden="true" /></EmptyIcon>
    <EmptyContent>
      <EmptyTitle>{{ emptyState.title }}</EmptyTitle>
      <EmptyDescription>{{ emptyState.description }}</EmptyDescription>
    </EmptyContent>
    <EmptyActions>
      <Button>{{ emptyState.primaryAction }}</Button>
      <Button variant="outline">{{ emptyState.secondaryAction }}</Button>
    </EmptyActions>
  </Empty>
</template>