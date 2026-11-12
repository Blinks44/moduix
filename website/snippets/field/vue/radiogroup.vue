<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { RadioGroup, RadioGroupOption } from '@moduix/vue/radio-group';
import styles from '@/components/examples/field/field-radiogroup.module.css';
</script>

<template>
  <Field :class="styles.root" invalid>
    <FieldLabel>Account type</FieldLabel>
    <RadioGroup invalid required default-value="team" name="account-type">
      <RadioGroupOption value="personal">Personal account</RadioGroupOption>
      <RadioGroupOption value="team">Team account</RadioGroupOption>
    </RadioGroup>
    <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
    <FieldErrorText>Choose an account type.</FieldErrorText>
  </Field>
</template>