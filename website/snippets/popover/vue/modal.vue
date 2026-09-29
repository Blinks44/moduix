<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Popover,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
import { ref } from 'vue';
import styles from '@/components/examples/popover/popover-modal.module.css';

const inputRef = ref<HTMLInputElement | null>(null);
</script>

<template>
  <Popover modal :initial-focus-el="() => inputRef">
    <PopoverTrigger as-child><Button>Invite teammates</Button></PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Invite teammates</PopoverTitle>
          <PopoverDescription
            >Focus is trapped inside this modal popover until dismissed.</PopoverDescription
          >
        </PopoverHeader>
        <PopoverBody>
          <label :class="styles.label"
            ><span>Email</span><input ref="inputRef" :class="styles.input"
          /></label>
        </PopoverBody>
        <PopoverFooter><PopoverCloseTrigger>Done</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>