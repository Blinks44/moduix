<script lang="ts">
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerPositioner,
    DatePickerView,
  } from '@/components/date-picker';
</script>

{#snippet ignored(props: () => Record<string, unknown>)}
  <span {...props()}>Ignored table content</span>
{/snippet}

<DatePicker defaultOpen portalled={false} showWeekNumbers>
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day">
        <!-- The day table owns its tree, so a JavaScript-only asChild is ignored. -->
        <DatePickerDayTable
          {...{ asChild: ignored }}
          showHeader={false}
          data-testid="fixed-table"
        />
      </DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>