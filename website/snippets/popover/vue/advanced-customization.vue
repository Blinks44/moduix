<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Popover,
  PopoverCloseIcon,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
import styles from '@/components/examples/popover/popover-advanced-customization.module.css';
</script>

<template>
  <Popover :positioning="{ gutter: 8 }">
    <PopoverTrigger as-child><Button>Open custom popover</Button></PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <div :class="styles.header">
          <PopoverTitle>Custom layout</PopoverTitle>
          <PopoverCloseIcon />
        </div>
        <PopoverDescription>
          Compose Ark parts directly and replace the standard arrow when the layout calls for a
          clean anchored panel.
        </PopoverDescription>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>