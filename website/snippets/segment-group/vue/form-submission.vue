<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import { ref } from 'vue';
import styles from '@/components/examples/segment-group/segment-group-form-submission.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

const submitted = ref('none');

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = String(new FormData(form).get('framework') ?? 'none');
}
</script>

<template>
  <form :class="styles.root" @submit="handleSubmit">
    <SegmentGroup aria-label="Framework" name="framework" default-value="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworks" />
    </SegmentGroup>
    <output>Submitted: {{ submitted }}</output>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</template>