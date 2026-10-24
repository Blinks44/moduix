<script setup lang="ts">
import { CircleCheck as CircleCheckIcon } from '@lucide/vue';
import { List, ListIndicator, ListItem } from '@moduix/vue/list';

const tasks = [
  'Tests pass in every adapter.',
  'The registry is rebuilt from the package sources.',
  'Long items wrap next to the indicator instead of under it.',
];
</script>

<template>
  <List marker="none">
    <ListItem v-for="task in tasks" :key="task">
      <ListIndicator><CircleCheckIcon /></ListIndicator>{{ task }}
    </ListItem>
  </List>
</template>