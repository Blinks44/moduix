<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerView,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker>
    <DatePickerLabel>Today shortcut</DatePickerLabel><DatePickerField />
    <DatePickerPositioner
      ><DatePickerContent
        ><DatePickerView view="day"
          ><DatePickerDayTable />
          <DatePickerContext v-slot="context"
            ><Button size="sm" variant="secondary" @click="context.selectToday()"
              >Today</Button
            ></DatePickerContext
          >
        </DatePickerView></DatePickerContent
      ></DatePickerPositioner
    >
  </DatePicker>
</template>