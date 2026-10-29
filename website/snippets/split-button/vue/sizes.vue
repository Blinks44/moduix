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
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
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
  </Stack>
</template>