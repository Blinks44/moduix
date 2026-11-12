<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import {
  FieldsetErrorText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
} from '@moduix/vue/fieldset';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/fieldset/fieldset-root-provider.module.css';

const fieldset = useFieldset({ invalid: true });
</script>

<template>
  <FieldsetRootProvider :value="fieldset" :class="styles.root">
    <FieldsetLegend>Contact details</FieldsetLegend>
    <Field invalid>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" value="invalid-address" />
    </Field>
    <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
  </FieldsetRootProvider>
</template>