<script setup lang="ts">
import { ArrowUpRight as ArrowUpRightIcon, Plus as PlusIcon, Star as StarIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';

const labels = {
  create: 'Create Item',
  docs: 'Open Button Docs',
  favorite: 'Favorites',
};
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="3">
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
  </Stack>
</template>