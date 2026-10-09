<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/vue/card';
import styles from '@/components/examples/card/card-basic.module.css';

const content = {
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions · 12 checks passed',
};
</script>

<template>
  <Card :class="styles.root">
    <CardHeader>
      <CardTitle>{{ content.title }}</CardTitle>
      <CardDescription>{{ content.description }}</CardDescription>
    </CardHeader>
    <CardBody>{{ content.summary }}</CardBody>
    <CardFooter>
      <Button variant="outline">View log</Button>
      <Button>Promote release</Button>
    </CardFooter>
  </Card>
</template>