<script setup lang="ts">
import { FieldHelperText, FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-basic.module.css';
</script>

<template>
  <FieldRoot :class="styles.root">
    <FieldLabel>Name</FieldLabel>
    <FieldHelperText>Used in your public workspace profile.</FieldHelperText>
    <Input name="name" placeholder="Enter your name" />
  </FieldRoot>
</template>