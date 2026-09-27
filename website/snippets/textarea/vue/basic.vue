<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { Textarea } from '@moduix/vue/textarea';
import styles from '@/components/examples/textarea/textarea-basic.module.css';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Comment</FieldLabel>
    <FieldHelperText>Included in the issue summary visible to the whole team.</FieldHelperText>
    <Textarea placeholder="Write a short comment" />
  </Field>
</template>