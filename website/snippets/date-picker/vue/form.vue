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
</script>

<template>
  <form @submit.prevent>
    <DatePicker :default-value="[parseDate('2026-06-22')]" name="delivery-date">
      <DatePickerLabel>Delivery date</DatePickerLabel><DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
    <Button type="submit">Submit</Button>
  </form>
</template>