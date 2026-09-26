<script setup lang="ts">
import { Badge } from '@moduix/vue/badge';
import {
  Card,
  CardAction,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@moduix/vue/card';
import styles from '@/components/examples/card/card-header-action.module.css';

const incident = {
  title: 'Incident response',
  description: 'Owner rotation and escalation readiness.',
  status: 'Stable',
  summary: '18 min median response · 99.97% service uptime',
};
</script>

<template>
  <Card :class="styles.root">
    <CardHeader>
      <CardTitle>{{ incident.title }}</CardTitle>
      <CardDescription>{{ incident.description }}</CardDescription>
      <CardAction :class="styles.action">
        <Badge variant="secondary">{{ incident.status }}</Badge>
      </CardAction>
    </CardHeader>
    <CardBody>{{ incident.summary }}</CardBody>
  </Card>
</template>