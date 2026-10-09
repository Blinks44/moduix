<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import { ref } from 'vue';
import styles from '@/components/examples/input/input-controlled.module.css';

const value = ref('');
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Username</FieldLabel>
    <Input v-model="value" placeholder="Type to control value" />
  </Field>
</template>