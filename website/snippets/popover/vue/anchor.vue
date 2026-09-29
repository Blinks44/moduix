<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Input } from '@moduix/vue/input';
import {
  Popover,
  PopoverAnchor,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
import styles from '@/components/examples/popover/popover-anchor.module.css';
</script>

<template>
  <div :class="styles.root">
    <Popover :positioning="{ gutter: 8 }">
      <PopoverAnchor as-child><Input placeholder="Popover anchor" /></PopoverAnchor>
      <PopoverTrigger as-child><Button>Open below the input</Button></PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Custom anchor</PopoverTitle>
            <PopoverDescription>
              The popup is positioned relative to the input instead of the trigger.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  </div>
</template>