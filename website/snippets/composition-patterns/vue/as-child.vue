<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Popover, PopoverContent, PopoverPositioner, PopoverTrigger } from '@moduix/vue/popover';
</script>
<template>
  <Popover :positioning="{ gutter: 8 }">
    <PopoverTrigger as-child><Button variant="outline">Filters</Button></PopoverTrigger>
    <PopoverPositioner
      ><PopoverContent>Choose one or more filters.</PopoverContent></PopoverPositioner
    >
  </Popover>
</template>