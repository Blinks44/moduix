<script setup lang="ts">
import { MenuItem } from '@moduix/vue/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@moduix/vue/split-button';
import { Stack } from '@moduix/vue/stack';
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
  <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
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
  </Stack>
</template>