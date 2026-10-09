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
  <Checkbox :default-checked="defaultChecked">
    <CheckboxControl />
    <CheckboxLabel>Enable notifications</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>