<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';

const defaultChecked = true;
</script>

<template>
  <Checkbox read-only :default-checked="defaultChecked">
    <CheckboxControl />
    <CheckboxLabel>Preserve existing setting</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>