<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadContext,
  SignaturePadHiddenInput,
  SignaturePadLabel,
} from '@moduix/vue/signature-pad';
import styles from '@/components/examples/signature-pad/signature-pad-field.module.css';

const signatureName = 'signature';
</script>

<template>
  <Field :class="styles.root" invalid required>
    <SignaturePad :name="signatureName">
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
      <SignaturePadContext v-slot="context">
        <SignaturePadHiddenInput :value="JSON.stringify(context.paths)" />
      </SignaturePadContext>
    </SignaturePad>
    <FieldHelperText>Use pointer or touch input to add a signature.</FieldHelperText>
    <FieldErrorText>Signature is required.</FieldErrorText>
  </Field>
</template>