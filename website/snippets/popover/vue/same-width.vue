<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
import styles from '@/components/examples/popover/popover-same-width.module.css';
</script>

<template>
  <Popover :positioning="{ sameWidth: true, gutter: 8 }">
    <PopoverTrigger as-child
      ><Button :class="styles.trigger">Match this trigger width</Button></PopoverTrigger
    >
    <PopoverPositioner>
      <PopoverContent :class="styles.content">
        <PopoverTitle>Matched width</PopoverTitle>
        <PopoverDescription>The content uses Ark's reference width measurement.</PopoverDescription>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>