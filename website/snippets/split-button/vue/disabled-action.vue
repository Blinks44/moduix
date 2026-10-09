<script setup lang="ts">
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
  <SplitButton aria-label="Save actions">
    <SplitButtonAction disabled>Save Changes</SplitButtonAction>
    <SplitButtonTrigger aria-label="More save actions" />
    <SplitButtonPositioner
      ><SplitButtonContent>
        <MenuItem value="save-draft">Save as Draft</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
      </SplitButtonContent></SplitButtonPositioner
    >
  </SplitButton>
</template>