<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import { Button } from '@moduix/vue/button';
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerView,
} from '@moduix/vue/date-picker';
import { ref } from 'vue';
import styles from '@/components/examples/date-picker/date-picker-form.module.css';

const submitted = ref('Nothing submitted');

const handleSubmit = (event: Event) => {
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = String(new FormData(form).get('delivery-date') ?? '');
};
</script>

<template>
  <form :class="styles.root" @submit.prevent="handleSubmit">
    <DatePicker
      :default-value="[parseDate('2026-06-22')]"
      min-view="day"
      max-view="day"
      name="delivery-date"
    >
      <DatePickerLabel>Delivery date</DatePickerLabel><DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
    <div data-preview-meta>
      <output>Submitted: {{ submitted }}</output>
      <Button type="submit" size="sm">Submit</Button>
    </div>
  </form>
</template>