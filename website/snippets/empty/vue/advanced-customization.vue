<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyTitle } from '@moduix/vue/empty';
import styles from '@/components/examples/empty/empty-advanced-customization.module.css';

const emptyState = {
  title: 'Create your first project',
  action: 'Create project',
};
</script>

<template>
  <Empty as-child :class="styles.root">
    <section aria-labelledby="projects-empty-title">
      <EmptyContent>
        <EmptyTitle as-child>
          <h2 id="projects-empty-title">{{ emptyState.title }}</h2>
        </EmptyTitle>
        <EmptyDescription>
          <p>
            Start from a template or <strong>build a workspace from scratch</strong> for your team.
          </p>
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>{{ emptyState.action }}</Button>
      </EmptyActions>
    </section>
  </Empty>
</template>