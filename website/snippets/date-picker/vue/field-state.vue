<script setup lang="ts">
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthTable,
  DatePickerPositioner,
  DatePickerView,
  DatePickerYearTable,
} from '@moduix/vue/date-picker';
import { Field, FieldErrorText } from '@moduix/vue/field';
import styles from '@/components/examples/date-picker/date-picker-field-state.module.css';
</script>

<template>
  <div :class="styles.root">
    <Field invalid>
      <DatePicker required invalid>
        <DatePickerLabel>Deadline</DatePickerLabel><DatePickerField />
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day"><DatePickerDayTable /></DatePickerView
            ><DatePickerView view="month"><DatePickerMonthTable /></DatePickerView
            ><DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePicker>
      <FieldErrorText>Choose a valid deadline.</FieldErrorText>
    </Field>
  </div>
</template>