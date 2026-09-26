<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import { ref } from 'vue';
import styles from '@/components/examples/tags-input/tags-input-form.module.css';

const submittedValue = ref('');

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  submittedValue.value = new FormData(form).get('frameworks')?.toString() ?? '';
};
</script>

<template>
  <form :class="styles.root" @submit="handleSubmit">
    <TagsInput :default-value="['React', 'TypeScript']" name="frameworks">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
    <output>Submitted: {{ submittedValue || 'none' }}</output>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</template>