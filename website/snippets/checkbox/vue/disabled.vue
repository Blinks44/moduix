<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
</script>

<template>
  <Checkbox disabled>
    <CheckboxControl />
    <CheckboxLabel>Receive weekly summary</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>