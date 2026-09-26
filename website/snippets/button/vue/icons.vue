<script setup lang="ts">
import { ArrowUpRight as ArrowUpRightIcon, Plus as PlusIcon, Star as StarIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import styles from '@/components/examples/button/button-icons.module.css';

const labels = {
  create: 'Create Item',
  docs: 'Open Button Docs',
  favorite: 'Favorites',
};
</script>

<template>
  <div :class="styles.root">
    <Button>
      <PlusIcon />
      {{ labels.create }}
    </Button>
    <Button size="icon-md" variant="outline" :aria-label="labels.favorite">
      <StarIcon />
    </Button>
    <Button variant="link">
      {{ labels.docs }}
      <ArrowUpRightIcon />
    </Button>
  </div>
</template>