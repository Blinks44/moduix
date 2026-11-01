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
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <Stack align="center" gap="3">
    <Popover v-model:open="open">
      <PopoverTrigger as-child><Button>Open controlled popover</Button></PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Publish changes?</PopoverTitle>
            <PopoverDescription>
              This action will make your latest updates visible to all users.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
    <output>Open: {{ open ? 'yes' : 'no' }}</output>
  </Stack>
</template>