<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import { ref } from 'vue';
import styles from '@/components/examples/checkbox/checkbox-with-form.module.css';

const submitted = ref('terms: none');

const handleSubmit = (event: SubmitEvent) => {
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = `terms: ${new FormData(form).get('terms') ?? 'none'}`;
};
</script>

<template>
  <form :class="styles.root" @submit.prevent="handleSubmit">
    <Checkbox name="terms" value="accepted">
      <CheckboxControl />
      <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
    <div>
      <output>{{ submitted }}</output>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>