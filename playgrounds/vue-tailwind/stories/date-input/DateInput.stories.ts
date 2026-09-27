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

const stackClass = 'grid gap-3';
const hintClass = 'text-sm leading-5 text-muted-foreground';
const customControlClass =
  'border-primary bg-muted focus-within:outline-primary data-focus:outline-primary';
const customSegmentClass = 'focus-visible:bg-primary focus-visible:text-primary-foreground';

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
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: dateInputComponents,
      setup() {
        return { stackClass, hintClass, customControlClass, customSegmentClass, ...setup?.() };
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
      <div :class="stackClass">
        <DateInput :value="value" @value-change="handleValueChange">
          <DateInputLabel>Controlled date</DateInputLabel>
          <DateInputControl>
            <DateInputSegments />
          </DateInputControl>
        </DateInput>
        <span :class="hintClass">Current value: {{ value[0]?.toString() ?? 'empty' }}</span>
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
    <div :class="stackClass">
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
    <div class="grid gap-2">
      <DateInput required invalid name="deadline" :default-value="[new CalendarDate(2026, 6, 22)]">
        <DateInputLabel>Deadline</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputHiddenInput />
      </DateInput>
      <span class="text-sm leading-5 text-destructive">Enter a valid deadline.</span>
    </div>
  `,
    () => ({ CalendarDate }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
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
      <DateInputControl :class="customControlClass">
        <DateInputSegmentGroup>
          <DateInputSegmentContext v-slot="segment">
            <DateInputSegment :segment="segment" :class="customSegmentClass" />
          </DateInputSegmentContext>
        </DateInputSegmentGroup>
      </DateInputControl>
    </DateInput>
  `,
    () => ({ CalendarDate }),
  ),
};