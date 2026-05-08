import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Field, FieldError, FieldLabel } from '../Field';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from './NumberField';
import storyStyles from './NumberField.stories.module.css';

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field>
        <FieldLabel htmlFor={id}>Amount</FieldLabel>
        <NumberField id={id} defaultValue={100}>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Decrease value" />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label="Increase value" />
          </NumberFieldGroup>
        </NumberField>
      </Field>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const id = React.useId();
    const [value, setValue] = React.useState<number | null>(24);

    return (
      <div className={storyStyles.stack}>
        <Field>
          <FieldLabel htmlFor={id}>Controlled Value</FieldLabel>
          <NumberField id={id} value={value} onValueChange={setValue}>
            <NumberFieldGroup>
              <NumberFieldDecrement aria-label="Decrease value" />
              <NumberFieldInput />
              <NumberFieldIncrement aria-label="Increase value" />
            </NumberFieldGroup>
          </NumberField>
        </Field>
        <span className={storyStyles.hint}>Current value: {value ?? 'empty'}</span>
      </div>
    );
  },
};

export const MinMaxAndStep: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field>
        <FieldLabel htmlFor={id}>Quantity (0-20, step 2)</FieldLabel>
        <NumberField id={id} defaultValue={10} min={0} max={20} step={2}>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Decrease value" />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label="Increase value" />
          </NumberFieldGroup>
        </NumberField>
      </Field>
    );
  },
};

export const Formatted: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field>
        <FieldLabel htmlFor={id}>Price</FieldLabel>
        <NumberField
          id={id}
          defaultValue={1250}
          min={0}
          step={50}
          format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
        >
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Decrease value" />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label="Increase value" />
          </NumberFieldGroup>
        </NumberField>
      </Field>
    );
  },
};

export const WithScrubArea: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field name="quantity">
        <NumberField defaultValue={250} id={id}>
          <NumberFieldScrubArea classNames={{ cursor: storyStyles.scrubCursor }}>
            <FieldLabel htmlFor={id}>Drag to scrub</FieldLabel>
          </NumberFieldScrubArea>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Decrease value" />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label="Increase value" />
          </NumberFieldGroup>
        </NumberField>
      </Field>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field name="quantity" validationMode="onBlur">
        <FieldLabel htmlFor={id}>Items</FieldLabel>
        <NumberField id={id} min={1} max={10} required>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Decrease value" />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label="Increase value" />
          </NumberFieldGroup>
        </NumberField>
        <FieldError match="valueMissing">Please provide a number.</FieldError>
        <FieldError match="rangeUnderflow">Value should be at least 1.</FieldError>
        <FieldError match="rangeOverflow">Value should be at most 10.</FieldError>
      </Field>
    );
  },
};