<script setup lang="ts">
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/vue/card';
import styles from '@/components/examples/card/card-root-as-link.module.css';

const report = {
  href: '/reports/release-health',
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions',
};
</script>

<template>
  <Card as-child :class="styles.root">
    <a :href="report.href">
      <CardHeader>
        <CardTitle>{{ report.title }}</CardTitle>
        <CardDescription>{{ report.description }}</CardDescription>
      </CardHeader>
      <CardBody>{{ report.summary }}</CardBody>
    </a>
  </Card>
</template>