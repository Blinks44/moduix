<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const actions = [
  { id: 'share', label: 'Share', detail: 'Share this item by link or email.' },
  { id: 'export', label: 'Export', detail: 'Export this item as PDF, CSV, or JSON.' },
  { id: 'archive', label: 'Archive', detail: 'Move this item to the archive.' },
];
const activeItem = ref<(typeof actions)[number] | null>(null);
const handleTriggerValueChange = (details: { value?: string | null }) => {
  activeItem.value = actions.find((item) => item.id === details.value) ?? null;
};
</script>

<template>
  <Popover @trigger-value-change="handleTriggerValueChange">
    <Stack direction="row" justify="center" wrap="wrap" gap="2">
      <PopoverTrigger v-for="item in actions" :key="item.id" :value="item.id">{{
        item.label
      }}</PopoverTrigger>
    </Stack>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverTitle>{{ activeItem?.label ?? 'Select an action' }}</PopoverTitle>
        <PopoverDescription>{{
          activeItem?.detail ?? 'Choose one of the actions.'
        }}</PopoverDescription>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>