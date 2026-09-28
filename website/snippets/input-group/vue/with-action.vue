<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { InputGroup, InputGroupButton, InputGroupInput } from '@moduix/vue/input-group';
import { ref } from 'vue';
import styles from '@/components/examples/input-group/input-group-with-action.module.css';

const value = ref('');
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Invite by email</FieldLabel>
    <InputGroup>
      <InputGroupInput v-model="value" type="email" placeholder="name@example.com" />
      <InputGroupButton :disabled="!value">Send</InputGroupButton>
    </InputGroup>
  </Field>
</template>