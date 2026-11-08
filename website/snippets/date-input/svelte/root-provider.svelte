<script lang="ts">
  import { today } from '@internationalized/date';
  import { Button } from '@moduix/svelte/button';
  import {
    DateInputControl,
    DateInputLabel,
    DateInputRootProvider,
    DateInputSegments,
    useDateInput,
  } from '@moduix/svelte/date-input';
  import styles from '@/components/examples/date-input/date-input-root-provider.module.css';

  const id = $props.id();
  const dateInput = useDateInput({
    id,
    defaultValue: [today('UTC')],
    name: 'report-date',
  });
</script>

<div class={styles.stack}>
  <DateInputRootProvider value={dateInput}>
    <DateInputLabel>Report date</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInputRootProvider>
  <output>Selected: {dateInput().value[0]?.toString() ?? 'empty'}</output>
  <Button type="button" size="sm" variant="outline" onclick={() => dateInput().clearValue()}>
    Clear
  </Button>
  <Button type="button" size="sm" variant="outline" onclick={() => dateInput().focus()}>
    Focus
  </Button>
</div>