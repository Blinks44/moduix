<script setup lang="ts">
import { FieldsetLegend, FieldsetRoot } from '@ark-ui/vue/fieldset';
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import styles from '@/components/examples/checkbox/checkbox-group-with-fieldset.module.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

const defaultValue = ['react'];
</script>

<template>
  <FieldsetRoot :class="styles.root">
    <FieldsetLegend>Frameworks</FieldsetLegend>
    <CheckboxGroup :default-value="defaultValue" name="frameworks">
      <Checkbox v-for="option in options" :key="option.value" :value="option.value">
        <CheckboxControl />
        <CheckboxLabel>{{ option.label }}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </CheckboxGroup>
  </FieldsetRoot>
</template>