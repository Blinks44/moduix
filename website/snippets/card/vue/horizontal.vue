<script setup lang="ts">
import { Badge } from '@moduix/vue/badge';
import { Button } from '@moduix/vue/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/vue/card';
import styles from '@/components/examples/card/card-horizontal.module.css';

const item = {
  title: 'The perfect latte',
  description: 'Espresso balanced with steamed milk and a light foam.',
  badge: 'Hot',
  action: 'Buy latte',
  image:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1280&q=80',
  imageAlt: 'Caffè latte in a ceramic cup.',
};
</script>

<template>
  <Card :class="styles.root">
    <img :class="styles.image" :src="item.image" :alt="item.imageAlt" />
    <div :class="styles.content">
      <CardHeader>
        <CardTitle>{{ item.title }}</CardTitle>
        <CardDescription>{{ item.description }}</CardDescription>
      </CardHeader>
      <CardBody>
        <Badge variant="secondary">{{ item.badge }}</Badge>
      </CardBody>
      <CardFooter>
        <Button>{{ item.action }}</Button>
      </CardFooter>
    </div>
  </Card>
</template>