<script setup lang="ts">
import { FieldHelperText, FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-file-input.module.css';
</script>

<template>
  <FieldRoot :class="styles.root">
    <FieldLabel>Attachment</FieldLabel>
    <Input accept=".pdf,.png" type="file" />
    <FieldHelperText>Choose a PDF or PNG file.</FieldHelperText>
  </FieldRoot>
</template>