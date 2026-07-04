import {
  DateInputSegmentContext,
  type DateInputDateValue,
  useDateInput,
} from '@ark-ui/react/date-input';
import { CalendarDate, CalendarDateTime, today } from '@internationalized/date';
import { DateInput, Field } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssProperty } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const centeredExampleStyle = {
  width: 'fit-content',
} as const;

export const dateInputExampleCss = `
  .date-input-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .date-input-state-grid {
    display: grid;
    gap: var(--spacing-3);
  }

  .date-input-range-control {
    gap: var(--spacing-2);
  }

  .date-input-root-provider-actions {
    display: flex;
    gap: var(--spacing-2);
    margin-top: var(--spacing-3);
  }

  .date-input-root-provider-actions button {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-background);
    color: var(--color-foreground);
  }

  .date-input-custom-control {
    --date-input-bg: var(--color-muted);
    --date-input-border-color: var(--color-primary);
    --date-input-focus-ring-color: var(--color-primary);
  }

  .date-input-custom-segment {
    --date-input-segment-bg-focus: color-mix(in oklab, var(--color-primary) 14%, transparent);
    --date-input-segment-color-focus: var(--color-foreground);
  }

  .date-input-field-preview {
    width: fit-content;
    margin-inline: auto;
  }
`;

export const dateInputNoData = `const data = null;`;

export const dateInputRangeData = `
  const defaultRange = [
    new CalendarDate(2026, 6, 22),
    new CalendarDate(2026, 6, 26),
  ];
`;

export const dateInputValidationData = `
  const minDate = new CalendarDate(2026, 6, 22);
  const maxDate = new CalendarDate(2026, 6, 30);
  const unavailableDay = 25;
`;

export const dateInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--date-input-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls the control background.',
  },
  {
    name: '--date-input-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls the default control border color.',
  },
  {
    name: '--date-input-border-color-invalid',
    defaultValue: 'var(--color-destructive)',
    description: 'Controls invalid border and focus ring color.',
  },
  {
    name: '--date-input-border-style',
    defaultValue: 'solid',
    description: 'Controls the control border style.',
  },
  {
    name: '--date-input-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls the control border width.',
  },
  {
    name: '--date-input-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls the control text color.',
  },
  {
    name: '--date-input-control-height',
    defaultValue: 'var(--size-lg)',
    description: 'Controls the minimum control height.',
  },
  {
    name: '--date-input-disabled-opacity',
    defaultValue: 'var(--opacity-disabled)',
    description: 'Controls disabled root opacity.',
  },
  {
    name: '--date-input-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls the focused control outline color.',
  },
  {
    name: '--date-input-focus-ring-offset',
    defaultValue: '-1px',
    description: 'Controls the focused control outline offset.',
  },
  {
    name: '--date-input-focus-ring-width',
    defaultValue: 'var(--date-input-border-width, var(--border-width-sm))',
    description: 'Controls the focused control outline width.',
  },
  {
    name: '--date-input-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls spacing between root children.',
  },
  {
    name: '--date-input-label-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls label text color.',
  },
  {
    name: '--date-input-label-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls label font size.',
  },
  {
    name: '--date-input-label-font-weight',
    defaultValue: 'var(--weight-medium)',
    description: 'Controls label font weight.',
  },
  {
    name: '--date-input-label-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls label line height.',
  },
  {
    name: '--date-input-max-width',
    defaultValue: 'none',
    description: 'Controls root maximum width.',
  },
  {
    name: '--date-input-padding-x',
    defaultValue: '0.75rem',
    description: 'Controls horizontal control padding.',
  },
  {
    name: '--date-input-padding-y',
    defaultValue: '0.5rem',
    description: 'Controls vertical control padding.',
  },
  {
    name: '--date-input-placeholder-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls placeholder segment color.',
  },
  {
    name: '--date-input-radius',
    defaultValue: 'var(--radius-md)',
    description: 'Controls the control corner radius.',
  },
  {
    name: '--date-input-segment-bg-focus',
    defaultValue: 'color-mix(in oklab, var(--color-ring) 18%, transparent)',
    description: 'Controls focused segment background.',
  },
  {
    name: '--date-input-segment-color',
    defaultValue: 'currentColor',
    description: 'Controls segment text color.',
  },
  {
    name: '--date-input-segment-color-focus',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls focused segment text color.',
  },
  {
    name: '--date-input-segment-gap',
    defaultValue: 'var(--border-width-md)',
    description: 'Controls spacing between date segments.',
  },
  {
    name: '--date-input-segment-line-height',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls segment line height.',
  },
  {
    name: '--date-input-segment-min-width',
    defaultValue: '2ch',
    description: 'Controls segment minimum width.',
  },
  {
    name: '--date-input-segment-padding-x',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls segment horizontal padding.',
  },
  {
    name: '--date-input-segment-padding-y',
    defaultValue: '0',
    description: 'Controls segment vertical padding.',
  },
  {
    name: '--date-input-segment-radius',
    defaultValue: 'var(--radius-sm)',
    description: 'Controls segment corner radius.',
  },
  {
    name: '--date-input-separator-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls literal and separator text color.',
  },
  {
    name: '--date-input-transition',
    defaultValue: 'var(--transition-default)',
    description: 'Controls date input transition timing.',
  },
  {
    name: '--date-input-width',
    defaultValue: 'auto',
    description: 'Controls root width.',
  },
];

export function DateInputCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={dateInputOverrideCssProperties} />;
}

function DateInputSegments({ index }: { index?: number }) {
  return (
    <DateInput.SegmentGroup index={index}>
      <DateInputSegmentContext>
        {(segment) => <DateInput.Segment segment={segment} />}
      </DateInputSegmentContext>
    </DateInput.SegmentGroup>
  );
}

export function DateInputExample(props: ComponentProps<typeof DateInput>) {
  return (
    <div style={centeredExampleStyle}>
      <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date" {...props}>
        <DateInput.Label>Release date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput>
    </div>
  );
}

export function ControlledDateInputExample() {
  const [value, setValue] = useState([new CalendarDate(2026, 6, 22)] as DateInputDateValue[]);

  return (
    <div>
      <DateInput value={value} onValueChange={(details) => setValue(details.value)}>
        <DateInput.Label>Controlled date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput>
      <div className="date-input-state">Current value: {value[0]?.toString() ?? 'empty'}</div>
    </div>
  );
}

export function RangeDateInputExample() {
  return (
    <div style={centeredExampleStyle}>
      <DateInput
        selectionMode="range"
        defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
      >
        <DateInput.Label>Travel dates</DateInput.Label>
        <DateInput.Control className="date-input-range-control">
          <DateInputSegments index={0} />
          <DateInput.Separator>to</DateInput.Separator>
          <DateInputSegments index={1} />
        </DateInput.Control>
        <DateInput.HiddenInput index={0} name="check-in" />
        <DateInput.HiddenInput index={1} name="check-out" />
      </DateInput>
    </div>
  );
}

export function MinMaxDateInputExample() {
  return (
    <div style={centeredExampleStyle}>
      <DateInput
        defaultValue={[new CalendarDate(2026, 6, 24)]}
        min={new CalendarDate(2026, 6, 22)}
        max={new CalendarDate(2026, 6, 30)}
        isDateUnavailable={(date) => date.day === 25}
      >
        <DateInput.Label>Booking date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput>
    </div>
  );
}

export function DisabledReadOnlyDateInputExample() {
  return (
    <div className="date-input-state-grid">
      <DateInput disabled defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInput.Label>Disabled date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput name="disabled-date" />
      </DateInput>

      <DateInput readOnly defaultValue={[new CalendarDate(2026, 6, 22)]}>
        <DateInput.Label>Read-only date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput name="read-only-date" />
      </DateInput>
    </div>
  );
}

export function LocaleDateInputExample() {
  return (
    <div style={centeredExampleStyle}>
      <DateInput locale="de-DE" defaultValue={[new CalendarDate(2026, 12, 5)]}>
        <DateInput.Label>German locale</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput>
    </div>
  );
}

export function GranularityDateInputExample() {
  return (
    <div style={centeredExampleStyle}>
      <DateInput
        granularity="minute"
        hourCycle={24}
        defaultValue={[new CalendarDateTime(2026, 12, 5, 14, 30)]}
      >
        <DateInput.Label>Date and time</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput name="scheduled-at" />
      </DateInput>
    </div>
  );
}

export function DateInputFieldExample() {
  return (
    <div className="date-input-field-preview">
      <Field invalid>
        <DateInput required invalid>
          <DateInput.Label>Deadline</DateInput.Label>
          <DateInput.Control>
            <DateInputSegments />
          </DateInput.Control>
          <DateInput.HiddenInput name="deadline" />
        </DateInput>
        <Field.ErrorText>Enter a valid deadline.</Field.ErrorText>
      </Field>
    </div>
  );
}

export function RootProviderDateInputExample() {
  const dateInput = useDateInput({ defaultValue: [today('UTC')] });

  return (
    <div>
      <DateInput.RootProvider value={dateInput}>
        <DateInput.Label>Report date</DateInput.Label>
        <DateInput.Control>
          <DateInputSegments />
        </DateInput.Control>
        <DateInput.HiddenInput name="report-date" />
      </DateInput.RootProvider>
      <div className="date-input-root-provider-actions">
        <button type="button" onClick={() => dateInput.clearValue()}>
          Clear
        </button>
        <button type="button" onClick={() => dateInput.focus()}>
          Focus
        </button>
      </div>
    </div>
  );
}