<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-as-child.module.css';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Repository</FieldLabel>
    <Input as-child>
      <input name="repository" placeholder="owner/project" />
    </Input>
  </Field>
</template>