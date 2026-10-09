<script setup lang="ts">
import { FieldLabel, FieldRoot as Field } from '@ark-ui/vue/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/vue/fieldset';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/fieldset/fieldset-disabled.module.css';
</script>

<template>
  <Fieldset :class="styles.root" disabled>
    <FieldsetLegend>Shipping address</FieldsetLegend>
    <FieldsetHelperText
      >Your address cannot be changed after order confirmation.</FieldsetHelperText
    >
    <Field>
      <FieldLabel>Street</FieldLabel>
      <Input value="123 Main St" />
    </Field>
    <Field>
      <FieldLabel>City</FieldLabel>
      <Input value="San Francisco" />
    </Field>
  </Fieldset>
</template>