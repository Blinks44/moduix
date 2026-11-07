<script module lang="ts">
  import { CalendarDate, CalendarDateTime, today } from '@internationalized/date';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    DateInput,
    DateInputControl,
    DateInputHiddenInput,
    DateInputLabel,
    DateInputRootProvider,
    DateInputSegment,
    DateInputSegmentContext,
    DateInputSegmentGroup,
    DateInputSegments,
    DateInputSeparator,
    useDateInput,
    type DateInputDateValue,
  } from '@/components/date-input';
  import { Field, FieldErrorText } from '@/components/field';
  import styles from './DateInput.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/DateInput',
    component: DateInput,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state<DateInputDateValue[]>([new CalendarDate(2026, 6, 22)]);
  const dateInput = useDateInput({
    id: 'date-input-root-provider',
    defaultValue: [today('UTC')],
    name: 'report-date',
  });
</script>

<Story name="Basic" asChild>
  <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
    <DateInputLabel>Release date</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
    <DateInputHiddenInput />
  </DateInput>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <DateInput
      {value}
      onValueChange={(details) => {
        value = details.value;
      }}
    >
      <DateInputLabel>Controlled date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
    <span class={styles.hint}>Current value: {value[0]?.toString() ?? 'empty'}</span>
  </div>
</Story>

<Story name="Range" asChild>
  <DateInput
    selectionMode="range"
    defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
  >
    <DateInputLabel>Travel dates</DateInputLabel>
    <DateInputControl>
      <DateInputSegments index={0} />
      <DateInputSeparator>to</DateInputSeparator>
      <DateInputSegments index={1} />
    </DateInputControl>
    <DateInputHiddenInput index={0} name="check-in" />
    <DateInputHiddenInput index={1} name="check-out" />
  </DateInput>
</Story>

<Story name="Min Max And Unavailable" exportName="MinMaxAndUnavailable" asChild>
  <DateInput
    defaultValue={[new CalendarDate(2026, 6, 24)]}
    min={new CalendarDate(2026, 6, 22)}
    max={new CalendarDate(2026, 6, 30)}
    isDateUnavailable={(date) => date.day === 25}
  >
    <DateInputLabel>Booking date</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</Story>

<Story name="Disabled And Read Only" exportName="DisabledAndReadOnly" asChild>
  <div class={styles.stack}>
    <DateInput disabled name="disabled-date" defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DateInputLabel>Disabled date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
      <DateInputHiddenInput />
    </DateInput>

    <DateInput readOnly name="read-only-date" defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DateInputLabel>Read-only date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
      <DateInputHiddenInput />
    </DateInput>
  </div>
</Story>

<Story name="Granularity" asChild>
  <DateInput
    granularity="minute"
    hourCycle={24}
    name="scheduled-at"
    defaultValue={[new CalendarDateTime(2026, 12, 5, 14, 30)]}
  >
    <DateInputLabel>Date and time</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
    <DateInputHiddenInput />
  </DateInput>
</Story>

<Story name="With Field Validation" exportName="WithFieldValidation" asChild>
  <Field invalid>
    <DateInput required invalid name="deadline">
      <DateInputLabel>Deadline</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
      <DateInputHiddenInput />
    </DateInput>
    <FieldErrorText>Enter a valid deadline.</FieldErrorText>
  </Field>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.stack}>
    <DateInputRootProvider value={dateInput}>
      <DateInputLabel>Report date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInputRootProvider>
    <button type="button" onclick={() => dateInput().clearValue()}>Clear</button>
  </div>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]}>
    <DateInputLabel>Styled date</DateInputLabel>
    <DateInputControl class={styles.customControl}>
      <DateInputSegmentGroup>
        <DateInputSegmentContext>
          {#snippet render(segment)}
            <DateInputSegment {segment} class={styles.customSegment} />
          {/snippet}
        </DateInputSegmentContext>
      </DateInputSegmentGroup>
    </DateInputControl>
  </DateInput>
</Story>