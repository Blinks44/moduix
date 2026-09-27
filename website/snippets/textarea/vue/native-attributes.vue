<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Field, FieldLabel } from '@moduix/vue/field';
import { Textarea } from '@moduix/vue/textarea';
import { ref } from 'vue';
import styles from '@/components/examples/textarea/textarea-native-attributes.module.css';

const submitted = ref('Not submitted');

const handleSubmit = (event: Event) => {
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = String(new FormData(form).get('notes') ?? '');
};
</script>

<template>
  <form :class="styles.root" @submit.prevent="handleSubmit">
    <Field>
      <FieldLabel>Notes</FieldLabel>
      <Textarea
        name="notes"
        :rows="6"
        :max-length="280"
        :spellcheck="false"
        placeholder="Add enough context for the next person reading this."
      />
    </Field>
    <output>Submitted: {{ submitted }}</output>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</template>