<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/vue/pin-input';
import styles from '@/components/examples/pin-input/pin-input-field.module.css';
</script>

<template>
  <Field :class="styles.root" invalid required>
    <PinInput :count="6">
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <FieldHelperText>Additional info</FieldHelperText>
    <FieldErrorText>Please enter the verification code.</FieldErrorText>
  </Field>
</template>