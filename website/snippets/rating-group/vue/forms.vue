<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
import { ref } from 'vue';
import styles from '@/components/examples/rating-group/component-forms.module.css';

const submitted = ref('Nothing submitted');

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = String(new FormData(form).get('review') ?? '');
};
</script>

<template>
  <form :class="styles.stack" @submit="handleSubmit">
    <RatingGroup name="review" :default-value="4" required>
      <RatingGroupLabel>Review score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
    <div data-preview-meta>
      <output :class="styles.hint">Submitted: {{ submitted }}</output>
      <Button type="submit">Submit</Button>
    </div>
  </form>
</template>