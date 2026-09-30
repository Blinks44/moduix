<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import styles from '@/components/examples/segment-group/segment-group-field.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];
</script>

<template>
  <Field :class="styles.root" invalid>
    <SegmentGroup aria-label="Framework" default-value="React" name="framework" required>
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworks" />
    </SegmentGroup>
    <FieldHelperText>Choose the framework used by this project.</FieldHelperText>
    <FieldErrorText>Choose a supported framework.</FieldErrorText>
  </Field>
</template>