<script setup lang="ts">
import { useField, FieldHelperText, FieldLabel, FieldRootProvider } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/field/field-root-provider.module.css';

const field = useField({ id: 'root-provider-field', required: true });
</script>

<template>
  <FieldRootProvider :class="styles.root" :value="field">
    <FieldLabel>Project key</FieldLabel>
    <Input placeholder="MAPS" />
    <FieldHelperText>The field state is created outside the rendered tree.</FieldHelperText>
  </FieldRootProvider>
</template>