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
import styles from '@/components/examples/popover/popover-root-provider.module.css';

const popover = usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } });
</script>

<template>
  <div :class="styles.root">
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
    <output>Open: {{ popover.open ? 'yes' : 'no' }}</output>
    <Button size="sm" @click="popover.setOpen(!popover.open)">Toggle externally</Button>
  </div>
</template>