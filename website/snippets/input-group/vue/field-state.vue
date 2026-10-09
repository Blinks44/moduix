<script setup lang="ts">
import { Field, FieldErrorText, FieldLabel } from '@moduix/vue/field';
import { InputGroup, InputGroupInput, InputGroupText } from '@moduix/vue/input-group';
import styles from '@/components/examples/input-group/input-group-field-state.module.css';

const domainSuffix = '.test.com';
const domainErrorMessage = 'Please enter a valid domain.';
</script>

<template>
  <Field :class="styles.root" invalid>
    <FieldLabel>Domain</FieldLabel>
    <InputGroup>
      <InputGroupInput placeholder="company" />
      <InputGroupText>{{ domainSuffix }}</InputGroupText>
    </InputGroup>
    <FieldErrorText>{{ domainErrorMessage }}</FieldErrorText>
  </Field>
</template>