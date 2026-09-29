<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Popover,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
</script>

<template>
  <Popover lazy-mount unmount-on-exit :positioning="{ gutter: 8 }">
    <PopoverTrigger as-child><Button>Open lazy popover</Button></PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Lazy mounted</PopoverTitle>
          <PopoverDescription
            >This content mounts on open and unmounts after exit.</PopoverDescription
          >
        </PopoverHeader>
        <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>