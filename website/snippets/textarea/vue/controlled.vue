<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { Textarea } from '@moduix/vue/textarea';
import { ref } from 'vue';
import styles from '@/components/examples/textarea/textarea-controlled.module.css';

const value = ref('');
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Feedback</FieldLabel>
    <Textarea v-model="value" placeholder="Type to control value" />
  </Field>
</template>