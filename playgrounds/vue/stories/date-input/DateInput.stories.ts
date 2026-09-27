import { CalendarDate, CalendarDateTime, today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
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
} from '@/components/date-input';
import { Field, FieldErrorText } from '@/components/field';
import styles from './DateInput.stories.module.css';

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

const dateInputComponents = {
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
  Field,
  FieldErrorText,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: dateInputComponents,
      setup() {
        return { styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(
    `
    <DateInput :default-value="[new CalendarDate(2026, 6, 22)]" name="release-date">
      <DateInputLabel>Release date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
      <DateInputHiddenInput />
    </DateInput>
  `,
    () => ({ CalendarDate }),
  ),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <DateInput :value="value" @value-change="handleValueChange">
          <DateInputLabel>Controlled date</DateInputLabel>
          <DateInputControl>
            <DateInputSegments />
          </DateInputControl>
        </DateInput>
        <span :class="styles.hint">Current value: {{ value[0]?.toString() ?? 'empty' }}</span>
      </div>
    `,
    () => {
      const value = ref<DateInputDateValue[]>([new CalendarDate(2026, 6, 22)]);
      const handleValueChange = (details: { value: DateInputDateValue[] }) => {
        value.value = details.value;
      };
      return { handleValueChange, value };
    },
  ),
};

export const Range: Story = {
  render: renderStory(
    `
    <DateInput
      selection-mode="range"
      :default-value="[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]"
    >
      <DateInputLabel>Travel dates</DateInputLabel>
      <DateInputControl>
        <DateInputSegments :index="0" />
        <DateInputSeparator>to</DateInputSeparator>
        <DateInputSegments :index="1" />
      </DateInputControl>
      <DateInputHiddenInput :index="0" name="check-in" />
      <DateInputHiddenInput :index="1" name="check-out" />
    </DateInput>
  `,
    () => ({ CalendarDate }),
  ),
};

export const MinMaxAndUnavailable: Story = {
  render: renderStory(
    `
    <DateInput
      :default-value="[new CalendarDate(2026, 6, 24)]"
      :min="new CalendarDate(2026, 6, 22)"
      :max="new CalendarDate(2026, 6, 30)"
      :is-date-unavailable="(date) => date.day === 25"
    >
      <DateInputLabel>Booking date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  `,
    () => ({ CalendarDate }),
  ),
};

export const DisabledAndReadOnly: Story = {
  render: renderStory(
    `
    <div :class="styles.stack">
      <DateInput disabled name="disabled-date" :default-value="[new CalendarDate(2026, 6, 22)]">
        <DateInputLabel>Disabled date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputHiddenInput />
      </DateInput>

      <DateInput read-only name="read-only-date" :default-value="[new CalendarDate(2026, 6, 22)]">
        <DateInputLabel>Read-only date</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputHiddenInput />
      </DateInput>
    </div>
  `,
    () => ({ CalendarDate }),
  ),
};

export const Granularity: Story = {
  render: renderStory(
    `
    <DateInput
      granularity="minute"
      :hour-cycle="24"
      name="scheduled-at"
      :default-value="[new CalendarDateTime(2026, 12, 5, 14, 30)]"
    >
      <DateInputLabel>Date and time</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
      <DateInputHiddenInput />
    </DateInput>
  `,
    () => ({ CalendarDateTime }),
  ),
};

export const WithFieldValidation: Story = {
  render: renderStory(
    `
    <Field invalid>
      <DateInput required invalid name="deadline" :default-value="[new CalendarDate(2026, 6, 22)]">
        <DateInputLabel>Deadline</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputHiddenInput />
      </DateInput>
      <FieldErrorText>Enter a valid deadline.</FieldErrorText>
    </Field>
  `,
    () => ({ CalendarDate }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <DateInputRootProvider :value="dateInput">
          <DateInputLabel>Report date</DateInputLabel>
          <DateInputControl>
            <DateInputSegments />
          </DateInputControl>
        </DateInputRootProvider>
        <button type="button" @click="dateInput.clearValue()">Clear</button>
      </div>
    `,
    () => ({ dateInput: useDateInput({ defaultValue: [today('UTC')], name: 'report-date' }) }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(
    `
    <DateInput :default-value="[new CalendarDate(2026, 6, 22)]">
      <DateInputLabel>Styled date</DateInputLabel>
      <DateInputControl :class="styles.customControl">
        <DateInputSegmentGroup>
          <DateInputSegmentContext v-slot="segment">
            <DateInputSegment :segment="segment" :class="styles.customSegment" />
          </DateInputSegmentContext>
        </DateInputSegmentGroup>
      </DateInputControl>
    </DateInput>
  `,
    () => ({ CalendarDate }),
  ),
};