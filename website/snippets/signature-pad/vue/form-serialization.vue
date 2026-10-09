<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadContext,
  SignaturePadHiddenInput,
  SignaturePadLabel,
} from '@moduix/vue/signature-pad';
import { ref } from 'vue';
import styles from '@/components/examples/signature-pad/signature-pad-form-serialization.module.css';

const submitted = ref('Nothing submitted');

const handleSubmit = (event: Event) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = String(new FormData(form).get('signature') ?? '');
};
</script>

<template>
  <form :class="styles.root" @submit="handleSubmit">
    <SignaturePad name="signature">
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
      <SignaturePadContext v-slot="context">
        <SignaturePadHiddenInput :value="JSON.stringify(context.paths)" />
      </SignaturePadContext>
    </SignaturePad>
    <div>
      <output>Submitted: {{ submitted }}</output>
      <Button type="submit" size="sm">Submit</Button>
    </div>
  </form>
</template>