<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/vue/radio-group';
import { ref } from 'vue';
import styles from '@/components/examples/radio-group/radio-group-form.module.css';

const frameworks = ['React', 'Solid', 'Vue'];
const submitted = ref('Not submitted');

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = `Submitted: ${String(new FormData(form).get('framework') ?? '')}`;
};
</script>

<template>
  <form :class="styles.stack" @reset="submitted = 'Not submitted'" @submit="handleSubmit">
    <RadioGroup default-value="React" name="framework">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </RadioGroup>
    <output>{{ submitted }}</output>
    <Button size="sm" type="submit">Submit</Button>
    <Button size="sm" type="reset" variant="outline">Reset</Button>
  </form>
</template>