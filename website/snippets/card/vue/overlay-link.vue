<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Card,
  CardAction,
  CardBody,
  CardDescription,
  CardHeader,
  CardLink,
  CardTitle,
} from '@moduix/vue/card';
import styles from '@/components/examples/card/card-overlay-link.module.css';

const incident = {
  href: '/incidents/response',
  title: 'Incident response',
  description: 'Owner rotation and escalation readiness.',
  summary: '18 min median response',
};
</script>

<template>
  <Card :class="styles.root">
    <CardHeader>
      <CardTitle>
        <CardLink :href="incident.href">{{ incident.title }}</CardLink>
      </CardTitle>
      <CardDescription>{{ incident.description }}</CardDescription>
      <CardAction>
        <Button variant="outline" size="sm">Acknowledge</Button>
      </CardAction>
    </CardHeader>
    <CardBody>{{ incident.summary }}</CardBody>
  </Card>
</template>