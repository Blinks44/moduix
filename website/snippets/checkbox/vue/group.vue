<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];
const defaultValue = ['email'];
</script>

<template>
  <CheckboxGroup :default-value="defaultValue" name="notifications">
    <Checkbox v-for="option in options" :key="option.value" :value="option.value">
      <CheckboxControl />
      <CheckboxLabel>{{ option.label }}</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  </CheckboxGroup>
</template>