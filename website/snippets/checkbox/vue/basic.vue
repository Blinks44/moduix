<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
</script>

<template>
  <Checkbox>
    <CheckboxControl />
    <CheckboxLabel>Enable notifications</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>