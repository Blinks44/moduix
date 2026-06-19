import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui';
import { Field } from '../field';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
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
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Amount</Field.Label>
        <NumberField id={id} defaultValue={100} />
      </Field>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const id = useId();
    const [value, setValue] = useState<number | null>(24);

    return (
      <div className={storyStyles.stack}>
        <Field>
          <Field.Label htmlFor={id}>Controlled Value</Field.Label>
          <NumberField id={id} value={value} onValueChange={setValue} />
        </Field>
        <span className={storyStyles.hint}>Current value: {value ?? 'empty'}</span>
      </div>
    );
  },
};

export const MinMaxAndStep: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Quantity (0-20, step 2)</Field.Label>
        <NumberField id={id} defaultValue={10} min={0} max={20} step={2} />
      </Field>
    );
  },
};

export const Formatted: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Price</Field.Label>
        <NumberField
          id={id}
          defaultValue={1250}
          min={0}
          step={50}
          format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
        />
      </Field>
    );
  },
};

export const WithScrubArea: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <NumberField defaultValue={250} id={id}>
          <NumberFieldScrubArea>
            <Field.Label htmlFor={id}>Drag to scrub</Field.Label>
            <NumberFieldScrubAreaCursor />
          </NumberFieldScrubArea>
        </NumberField>
      </Field>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Items</Field.Label>
        <NumberField id={id} min={1} max={10} required />
        <Field.ErrorText>Please provide a number.</Field.ErrorText>
        <Field.ErrorText>Value should be at least 1.</Field.ErrorText>
        <Field.ErrorText>Value should be at most 10.</Field.ErrorText>
      </Field>
    );
  },
};

export const CustomIcons: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Floors</Field.Label>
        <NumberFieldRoot id={id} defaultValue={8}>
          <NumberFieldGroup>
            <NumberFieldDecrement className={storyStyles.customButton}>
              <ChevronDownIcon />
            </NumberFieldDecrement>
            <NumberFieldInput className={storyStyles.customInput} />
            <NumberFieldIncrement className={storyStyles.customButton}>
              <ChevronUpIcon />
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberFieldRoot>
      </Field>
    );
  },
};

export const CustomButtonLabels: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Seats</Field.Label>
        <NumberField
          id={id}
          defaultValue={2}
          decrementLabel="Decrease seat count"
          incrementLabel="Increase seat count"
        />
      </Field>
    );
  },
};