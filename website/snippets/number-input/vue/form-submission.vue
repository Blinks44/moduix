<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
import { ref } from 'vue';
import styles from '@/components/examples/number-input/number-input-form-submission.module.css';

const submittedValue = ref('Not submitted');

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();

  if (event.currentTarget instanceof HTMLFormElement) {
    submittedValue.value = String(new FormData(event.currentTarget).get('quantity'));
  }
};
</script>

<template>
  <form :class="styles.root" @submit="handleSubmit">
    <NumberInput default-value="42" name="quantity">
      <NumberInputLabel>Quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <output>Submitted: {{ submittedValue }}</output>
    <Button type="submit" size="sm">Submit quantity</Button>
  </form>
</template>