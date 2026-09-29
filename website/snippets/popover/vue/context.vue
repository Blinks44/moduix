<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Popover,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
</script>

<template>
  <Popover :positioning="{ gutter: 8 }">
    <PopoverContext v-slot="popover">
      <output>Open: {{ popover.open ? 'yes' : 'no' }}</output>
    </PopoverContext>
    <PopoverTrigger as-child><Button>Open context example</Button></PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Context state</PopoverTitle>
          <PopoverDescription>
            Read state from a descendant without passing props through the popup tree.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>