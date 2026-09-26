<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';

const checked = 'indeterminate' as const;
</script>

<template>
  <Checkbox :checked="checked">
    <CheckboxControl />
    <CheckboxLabel>Select all team members</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>