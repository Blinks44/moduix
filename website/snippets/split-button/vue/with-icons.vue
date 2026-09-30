<script setup lang="ts">
import { Plus as PlusIcon } from '@lucide/vue';
import { MenuItem, MenuSeparator } from '@moduix/vue/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@moduix/vue/split-button';
</script>

<template>
  <SplitButton aria-label="Create actions">
    <SplitButtonAction
      ><PlusIcon aria-hidden="true" focusable="false" />Create Item</SplitButtonAction
    >
    <SplitButtonTrigger aria-label="More create actions" />
    <SplitButtonPositioner
      ><SplitButtonContent>
        <MenuItem value="create-blank">Create Blank</MenuItem
        ><MenuItem value="create-template">Create From Template</MenuItem>
        <MenuSeparator /><MenuItem value="import-existing">Import Existing</MenuItem>
      </SplitButtonContent></SplitButtonPositioner
    >
  </SplitButton>
</template>