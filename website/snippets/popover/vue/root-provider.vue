<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
  usePopover,
} from '@moduix/vue/popover';
import { Stack } from '@moduix/vue/stack';

const popover = usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } });
</script>

<template>
  <Stack align="center" gap="3">
    <PopoverRootProvider :value="popover">
      <PopoverTrigger as-child><Button>Open from trigger</Button></PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>External state</PopoverTitle>
            <PopoverDescription>The usePopover hook owns this popover state.</PopoverDescription>
          </PopoverHeader>
          <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </PopoverRootProvider>
    <div data-preview-meta>
      <output>Open: {{ popover.open ? 'yes' : 'no' }}</output>
      <Button size="sm" @click="popover.setOpen(!popover.open)">Toggle externally</Button>
    </div>
  </Stack>
</template>