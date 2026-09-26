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
  <Checkbox size="lg" :default-checked="defaultChecked">
    <CheckboxControl />
    <CheckboxLabel>Large</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>