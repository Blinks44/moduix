<script setup lang="ts">
import { MenuItem } from '@moduix/vue/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@moduix/vue/split-button';
import styles from '@/components/examples/split-button/split-button-sizes.module.css';
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <div :class="styles.row">
    <SplitButton
      v-for="size in sizes"
      :key="size"
      :aria-label="`${size} create actions`"
      :size="size"
      variant="outline"
    >
      <SplitButtonAction>{{ size }}</SplitButtonAction
      ><SplitButtonTrigger />
      <SplitButtonPositioner
        ><SplitButtonContent>
          <MenuItem :value="`${size}-create`">Create</MenuItem>
          <MenuItem :value="`${size}-create-open`">Create and Open</MenuItem>
        </SplitButtonContent></SplitButtonPositioner
      >
    </SplitButton>
  </div>
</template>