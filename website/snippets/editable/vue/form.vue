<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/vue/editable';
import { ref } from 'vue';
import styles from '@/components/examples/editable/editable-form.module.css';

const submitted = ref('Nothing submitted');
const handleSubmit = (event: Event) => {
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = String(new FormData(form).get('title') ?? '');
};
</script>

<template>
  <form :class="styles.root" @submit.prevent="handleSubmit">
    <Editable default-value="Layer name" name="title">
      <EditableLabel>Layer name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
    <div data-preview-meta>
      <output>Submitted: {{ submitted }}</output>
      <Button type="submit" size="sm">Submit</Button>
    </div>
  </form>
</template>