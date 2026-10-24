<script setup lang="ts">
import { CloseButton } from '@moduix/vue/close-button';
import {
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/vue/popover';
import styles from '@/components/examples/popover/popover-advanced-customization.module.css';
</script>

<template>
  <Popover :positioning="{ gutter: 8 }">
    <PopoverTrigger>Open custom popover</PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverArrow>
          <PopoverArrowTip />
        </PopoverArrow>
        <div :class="styles.header">
          <PopoverTitle>Custom layout</PopoverTitle>
          <PopoverCloseTrigger as-child>
            <CloseButton aria-label="Close popover" />
          </PopoverCloseTrigger>
        </div>
        <PopoverDescription>
          Build the popup from the low-level parts when the header, body, and footer helpers do not
          fit the layout.
        </PopoverDescription>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>