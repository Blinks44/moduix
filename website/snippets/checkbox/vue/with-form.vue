<script setup lang="ts">
import { Button } from '@moduix/vue/button';
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
    <div data-preview-meta>
      <output>{{ submitted }}</output>
      <Button type="submit" size="sm">Submit</Button>
    </div>
  </form>
</template>