<script setup lang="ts">
import { Bell as BellIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import {
  Popover,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/popover/popover-build-from-parts.module.css';
</script>

<template>
  <Popover :positioning="{ gutter: 8 }">
    <PopoverTrigger as-child>
      <Button><BellIcon aria-hidden :size="16" /> Notifications</Button>
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <Stack gap="1">
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
        </Stack>
        <div :class="styles.footer"><PopoverCloseTrigger>Close</PopoverCloseTrigger></div>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>