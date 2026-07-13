import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDate, CalendarDateTime, today } from '@internationalized/date';
import { useState } from 'react';
import { Field } from '../field';
import { DateInput, type DateInputDateValue, useDateInput } from './DateInput';
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
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([new CalendarDate(2026, 6, 22)] as DateInputDateValue[]);

    return (
      <div className={storyStyles.stack}>
        <DateInput value={value} onValueChange={(details) => setValue(details.value)}>
          <DateInput.Label>Controlled date</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
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
      names={['check-in', 'check-out']}
      defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
    >
      <DateInput.Label>Travel dates</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments index={0} />
        <DateInput.Separator>to</DateInput.Separator>
        <DateInput.Segments index={1} />
      </DateInput.Control>
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
      <DateInput.Label>Booking date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <DateInput disabled name="disabled-date" defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInput.Label>Disabled date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>

      <DateInput readOnly name="read-only-date" defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInput.Label>Read-only date</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
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
      <DateInput.Label>Date and time</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
    </DateInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid>
      <DateInput required invalid name="deadline">
        <DateInput.Label>Deadline</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
      </DateInput>
      <Field.ErrorText>Enter a valid deadline.</Field.ErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const dateInput = useDateInput({ defaultValue: [today('UTC')], name: 'report-date' });

    return (
      <div className={storyStyles.stack}>
        <DateInput.RootProvider value={dateInput}>
          <DateInput.Label>Report date</DateInput.Label>
          <DateInput.Control>
            <DateInput.Segments />
          </DateInput.Control>
        </DateInput.RootProvider>
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
      <DateInput.Label>Styled date</DateInput.Label>
      <DateInput.Control className={storyStyles.customControl}>
        <DateInput.SegmentGroup>
          <DateInput.SegmentContext>
            {(segment) => (
              <DateInput.Segment segment={segment} className={storyStyles.customSegment} />
            )}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
    </DateInput>
  ),
};