<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@moduix/vue/input-group';
import styles from '@/components/examples/input-group/input-group-prefix-and-suffix.module.css';

const currency = {
  symbol: '$',
  code: 'USD',
};
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Monthly budget</FieldLabel>
    <InputGroup>
      <InputGroupAddon>{{ currency.symbol }}</InputGroupAddon>
      <InputGroupInput inputmode="decimal" placeholder="2500" />
      <InputGroupText>{{ currency.code }}</InputGroupText>
    </InputGroup>
  </Field>
</template>