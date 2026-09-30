<script setup lang="ts">
import { MenuItem } from '@moduix/vue/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@moduix/vue/split-button';
import styles from '@/components/examples/split-button/split-button-variants.module.css';
const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
] as const;
</script>

<template>
  <div :class="styles.row">
    <SplitButton
      v-for="variant in variants"
      :key="variant"
      :aria-label="`${variant} actions`"
      :variant="variant"
    >
      <SplitButtonAction>{{ variant }}</SplitButtonAction
      ><SplitButtonTrigger />
      <SplitButtonPositioner
        ><SplitButtonContent>
          <MenuItem :value="`${variant}-edit`">Edit</MenuItem>
          <MenuItem :value="`${variant}-duplicate`">Duplicate</MenuItem>
        </SplitButtonContent></SplitButtonPositioner
      >
    </SplitButton>
  </div>
</template>