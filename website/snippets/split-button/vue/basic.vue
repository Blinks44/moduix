<script setup lang="ts">
import { MenuItem, MenuSeparator } from '@moduix/vue/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@moduix/vue/split-button';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';
const status = ref('Ready to save.');
</script>

<template>
  <Stack align="center" gap="4">
    <SplitButton aria-label="Save actions">
      <SplitButtonAction @click="status = 'Changes saved.'">Save Changes</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonPositioner
        ><SplitButtonContent>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem value="publish">Publish Now</MenuItem>
        </SplitButtonContent></SplitButtonPositioner
      >
    </SplitButton>
    <output aria-live="polite">{{ status }}</output>
  </Stack>
</template>