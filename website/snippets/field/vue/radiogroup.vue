<script setup lang="ts">
import {
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupRoot,
} from '@ark-ui/vue/radio-group';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import styles from '@/components/examples/field/field-radiogroup.module.css';
</script>

<template>
  <Field :class="styles.root" invalid>
    <FieldLabel>Account type</FieldLabel>
    <RadioGroupRoot invalid required default-value="team" name="account-type">
      <RadioGroupItem value="personal">
        <RadioGroupItemControl />
        <RadioGroupItemText>Personal account</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
      <RadioGroupItem value="team">
        <RadioGroupItemControl />
        <RadioGroupItemText>Team account</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    </RadioGroupRoot>
    <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
    <FieldErrorText>Choose an account type.</FieldErrorText>
  </Field>
</template>