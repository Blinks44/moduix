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
const status = ref('Ready to save.');
import styles from '@/components/examples/split-button/split-button-basic.module.css';
</script>

<template>
  <div :class="styles.stack">
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
  </div>
</template>