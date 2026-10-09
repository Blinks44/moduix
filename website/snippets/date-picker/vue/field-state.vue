<script setup lang="ts">
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerView,
} from '@moduix/vue/date-picker';
import { Field, FieldErrorText } from '@moduix/vue/field';
</script>

<template>
  <Field invalid>
    <DatePicker required invalid>
      <DatePickerLabel>Deadline</DatePickerLabel><DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
    <FieldErrorText>Choose a valid deadline.</FieldErrorText>
  </Field>
</template>