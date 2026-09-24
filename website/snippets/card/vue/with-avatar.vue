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
import styles from '@/components/examples/card/card-with-avatar.module.css';

const person = {
  initials: 'NF',
  name: 'Nate Foss',
  handle: '@natefoss',
  message: 'Nate has requested to join your team.',
};
</script>

<template>
  <Card :class="styles.root">
    <CardHeader>
      <div :class="styles.profile">
        <span aria-hidden="true" :class="styles.avatar">{{ person.initials }}</span>
        <div>
          <CardTitle>{{ person.name }}</CardTitle>
          <CardDescription>{{ person.handle }}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardBody>{{ person.message }}</CardBody>
    <CardFooter>
      <Button variant="outline">Decline</Button>
      <Button>Approve</Button>
    </CardFooter>
  </Card>
</template>