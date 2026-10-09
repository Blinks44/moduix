<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { Textarea } from '@moduix/vue/textarea';
import styles from '@/components/examples/textarea/textarea-auto-resize.module.css';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Issue description</FieldLabel>
    <Textarea
      autoresize
      placeholder="Start typing a longer description. Height grows with content."
    />
  </Field>
</template>