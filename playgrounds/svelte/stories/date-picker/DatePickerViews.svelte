<script lang="ts">
  import {
    DatePickerDayTable,
    DatePickerMonthTable,
    DatePickerView,
    DatePickerYearTable,
  } from '@/components/date-picker';
</script>

<DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
<DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
<DatePickerView view="year"><DatePickerYearTable /></DatePickerView>