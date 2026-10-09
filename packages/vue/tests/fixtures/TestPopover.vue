<script setup lang="ts">
import {
  Popover,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverCloseIcon,
} from '../../src';
</script>

<template>
  <Popover default-open :portalled="false">
    <PopoverTrigger>Open popover</PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription>Latest updates</PopoverDescription>
        <PopoverCloseIcon />
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>