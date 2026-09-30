<script setup lang="ts">
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/vue/card';
import { SimpleGrid } from '@moduix/vue/simple-grid';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/simple-grid/simple-grid-basic.module.css';

const plans = [
  { name: 'Starter', description: 'For personal projects and early prototypes.', price: 'Free' },
  { name: 'Team', description: 'Shared workflows for growing product teams.', price: '$24' },
  { name: 'Scale', description: 'Advanced controls for larger organizations.', price: '$64' },
  { name: 'Enterprise', description: 'Custom security, support, and deployment.', price: 'Custom' },
];
</script>

<template>
  <SimpleGrid min-child-width="18rem" gap="var(--moduix-spacing-4)" :class="styles.root">
    <Card v-for="plan in plans" :key="plan.name" size="sm">
      <CardHeader>
        <CardTitle>{{ plan.name }}</CardTitle>
        <CardDescription>{{ plan.description }}</CardDescription>
      </CardHeader>
      <CardBody>
        <Text size="xl" weight="semibold">{{ plan.price }}</Text>
      </CardBody>
    </Card>
  </SimpleGrid>
</template>