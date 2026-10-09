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
  <SplitButton
    aria-label="Export actions"
    :positioning="{ placement: 'bottom-start', gutter: 8 }"
    variant="outline"
  >
    <SplitButtonAction>Export</SplitButtonAction>
    <SplitButtonTrigger aria-label="More export actions" />
    <SplitButtonPositioner
      ><SplitButtonContent>
        <MenuItem value="export-pdf">Export PDF</MenuItem
        ><MenuItem value="export-csv">Export CSV</MenuItem>
      </SplitButtonContent></SplitButtonPositioner
    >
  </SplitButton>
</template>