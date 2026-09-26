<script setup lang="ts">
import { FieldLabel, FieldRoot as Field } from '@ark-ui/vue/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/vue/fieldset';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/fieldset/fieldset-basic.module.css';
</script>

<template>
  <Fieldset :class="styles.root">
    <FieldsetLegend>Contact details</FieldsetLegend>
    <Field>
      <FieldLabel>Name</FieldLabel>
      <Input name="name" />
    </Field>
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input name="email" type="email" />
    </Field>
    <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
  </Fieldset>
</template>