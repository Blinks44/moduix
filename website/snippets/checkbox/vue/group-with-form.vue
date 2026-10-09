<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import { ref } from 'vue';
import styles from '@/components/examples/checkbox/checkbox-group-with-form.module.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];
const defaultValue = ['react'];
const submitted = ref('framework: []');

const handleSubmit = (event: SubmitEvent) => {
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = `framework: ${JSON.stringify(new FormData(form).getAll('framework'))}`;
};
</script>

<template>
  <form :class="styles.root" @submit.prevent="handleSubmit">
    <CheckboxGroup :default-value="defaultValue" name="framework">
      <Checkbox v-for="option in options" :key="option.value" :value="option.value">
        <CheckboxControl />
        <CheckboxLabel>{{ option.label }}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </CheckboxGroup>
    <div>
      <output>{{ submitted }}</output>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>