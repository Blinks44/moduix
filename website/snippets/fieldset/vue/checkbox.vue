<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import { Fieldset, FieldsetLegend } from '@moduix/vue/fieldset';
import styles from '@/components/examples/fieldset/fieldset-checkbox.module.css';

const preferences = [
  { label: 'Product updates', value: 'product' },
  { label: 'Marketing emails', value: 'marketing' },
];
</script>

<template>
  <Fieldset :class="styles.root">
    <FieldsetLegend>Email preferences</FieldsetLegend>
    <CheckboxGroup>
      <Checkbox v-for="preference in preferences" :key="preference.value" :value="preference.value">
        <CheckboxControl />
        <CheckboxLabel>{{ preference.label }}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </CheckboxGroup>
  </Fieldset>
</template>