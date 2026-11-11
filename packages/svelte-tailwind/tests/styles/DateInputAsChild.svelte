<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputHiddenInput,
    DateInputLabel,
    DateInputSegments,
  } from '@/components/date-input';

  let rootRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef });
</script>

<form>
  <DateInput bind:ref={rootRef} defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
    {#snippet asChild(props)}
      <fieldset {...props()}>
        <DateInputLabel>Release date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputHiddenInput name="release-date" />
      </fieldset>
    {/snippet}
  </DateInput>
</form>