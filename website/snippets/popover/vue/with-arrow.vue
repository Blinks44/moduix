<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Popover,
  PopoverArrow,
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
  <Popover :positioning="{ gutter: 8 }">
    <PopoverTrigger as-child><Button>Open with arrow</Button></PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <PopoverTitle>With arrow</PopoverTitle>
          <PopoverDescription>Arrow and ArrowTip use Ark positioning variables.</PopoverDescription>
        </PopoverHeader>
        <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>