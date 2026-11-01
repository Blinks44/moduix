<script setup lang="ts">
import { Checkbox, CheckboxControl, CheckboxLabel, CheckboxHiddenInput } from '@/index';
</script>

<template>
  <Checkbox :default-checked="true">
    <CheckboxControl />
    <CheckboxLabel>Hydrated checkbox</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>