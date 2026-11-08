<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegments,
    type DateInputDateValue,
  } from '@moduix/svelte/date-input';
  import styles from '@/components/examples/date-input/date-input-controlled.module.css';

  let value = $state<DateInputDateValue[]>([new CalendarDate(2026, 6, 22)]);
</script>

<div class={styles.stack}>
  <DateInput bind:value>
    <DateInputLabel>Controlled date</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
  <output>Selected: {value[0]?.toString() ?? 'empty'}</output>
</div>