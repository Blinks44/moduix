<script setup lang="ts">
import { ArrowUpRight as ArrowUpRightIcon } from '@lucide/vue';
import { MenuItem } from '@moduix/vue/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@moduix/vue/split-button';
</script>

<template>
  <SplitButton aria-label="Documentation actions" variant="outline">
    <SplitButtonAction as-child
      ><a href="#split-button">Open Docs<ArrowUpRightIcon aria-hidden="true" focusable="false" /></a
    ></SplitButtonAction>
    <SplitButtonTrigger aria-label="More docs actions" />
    <SplitButtonPositioner
      ><SplitButtonContent>
        <MenuItem value="copy-link">Copy Link</MenuItem>
        <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
      </SplitButtonContent></SplitButtonPositioner
    >
  </SplitButton>
</template>