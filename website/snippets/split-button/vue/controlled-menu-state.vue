<script setup lang="ts">
import { MenuItem, MenuSeparator } from '@moduix/vue/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@moduix/vue/split-button';
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
  <SplitButton
    aria-label="Share actions"
    :open="open"
    @open-change="open = $event.open"
    variant="outline"
  >
    <SplitButtonAction>Share</SplitButtonAction>
    <SplitButtonTrigger aria-label="More share actions" />
    <SplitButtonPositioner
      ><SplitButtonContent>
        <MenuItem value="copy-link">Copy Link</MenuItem>
        <MenuItem value="invite-email">Invite by Email</MenuItem>
        <MenuSeparator />
        <MenuItem value="close-menu" @select="open = false">Close Menu</MenuItem>
      </SplitButtonContent></SplitButtonPositioner
    >
  </SplitButton>
</template>