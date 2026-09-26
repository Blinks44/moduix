import { CalendarDate, CalendarDateTime, today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
  type DateInputDateValue,
  useDateInput,
} from '@/components/date-input/DateInput';
import { Field, FieldErrorText } from '@/components/field';
import storyStyles from './DateInput.stories.module.css';

const meta = {
  title: 'Components/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
      <DateInputHiddenInput />
    </DateInput>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([new CalendarDate(2026, 6, 22)] as DateInputDateValue[]);

    return (
      <div className={storyStyles.stack}>
        <DateInput value={value} onValueChange={(details) => setValue(details.value)}>
          <DateInputLabel>Controlled date</DateInputLabel>
          <DateInputControl>
            <DateInputSegments />
          </DateInputControl>
        </DateInput>
        <span className={storyStyles.hint}>Current value: {value[0]?.toString() ?? 'empty'}</span>
      </div>
    );
  },
};

export const Range: Story = {
  render: () => (
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
  ),
};

export const MinMaxAndUnavailable: Story = {
  render: () => (
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
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div className={storyStyles.stack}>
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
  ),
};

export const Granularity: Story = {
  render: () => (
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
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
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
  ),
};

export const RootProvider: Story = {
  render: () => {
    const dateInput = useDateInput({ defaultValue: [today('UTC')], name: 'report-date' });

    return (
      <div className={storyStyles.stack}>
        <DateInputRootProvider value={dateInput}>
          <DateInputLabel>Report date</DateInputLabel>
          <DateInputControl>
            <DateInputSegments />
          </DateInputControl>
        </DateInputRootProvider>
        <button type="button" onClick={() => dateInput.clearValue()}>
          Clear
        </button>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]}>
      <DateInputLabel>Styled date</DateInputLabel>
      <DateInputControl className={storyStyles.customControl}>
        <DateInputSegmentGroup>
          <DateInputSegmentContext>
            {(segment) => (
              <DateInputSegment segment={segment} className={storyStyles.customSegment} />
            )}
          </DateInputSegmentContext>
        </DateInputSegmentGroup>
      </DateInputControl>
    </DateInput>
  ),
};