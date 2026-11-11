<script lang="ts">
  import {
    DatePickerContent,
    DatePickerDayTable,
    DatePickerNextTrigger,
    DatePickerPrevTrigger,
    DatePickerRangeText,
    DatePickerViewControl,
  } from '@/components/date-picker';
  import { styles } from './styles';
</script>

<DatePickerContent class={styles.multipleMonthsContent}>
  <DatePickerViewControl>
    <DatePickerPrevTrigger /><DatePickerRangeText /><DatePickerNextTrigger />
  </DatePickerViewControl>
  <div class={styles.multipleMonths}>
    <DatePickerDayTable class={styles.multipleMonthsTable} showHeader={false} />
    <DatePickerDayTable class={styles.multipleMonthsTable} showHeader={false} offset={1} />
  </div>
</DatePickerContent>