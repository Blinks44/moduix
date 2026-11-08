<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputHiddenInput,
    DateInputLabel,
    DateInputSegments,
  } from '@moduix/svelte/date-input';
  import styles from '@/components/examples/date-input/date-input-disabled-and-read-only.module.css';

  const value = [new CalendarDate(2026, 6, 22)];
</script>

<div class={styles.stack}>
  <DateInput disabled name="disabled-date" defaultValue={value}>
    <DateInputLabel>Disabled date</DateInputLabel>
    <DateInputHiddenInput name="disabled-date" />
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>

  <DateInput readOnly name="read-only-date" defaultValue={value}>
    <DateInputLabel>Read-only date</DateInputLabel>
    <DateInputHiddenInput name="read-only-date" />
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</div>