import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui';
import { Field } from '../field';
import { NumberInput, useNumberInput } from './NumberInput';
import storyStyles from './NumberInput.stories.module.css';

const meta = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <NumberInput defaultValue="100">
      <NumberInput.Label>Amount</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('24');

    return (
      <div className={storyStyles.stack}>
        <NumberInput value={value} onValueChange={(details) => setValue(details.value)}>
          <NumberInput.Label>Controlled value</NumberInput.Label>
          <NumberInput.Control>
            <NumberInput.DecrementTrigger />
            <NumberInput.Input />
            <NumberInput.IncrementTrigger />
          </NumberInput.Control>
        </NumberInput>
        <span className={storyStyles.hint}>Current value: {value || 'empty'}</span>
      </div>
    );
  },
};

export const MinMaxAndStep: Story = {
  render: () => (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInput.Label>Quantity (0-20, step 2)</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  ),
};

export const FractionDigits: Story = {
  render: () => (
    <NumberInput
      defaultValue="12.5"
      step={0.25}
      formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    >
      <NumberInput.Label>Hours</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  ),
};

export const Scrubber: Story = {
  render: () => (
    <NumberInput defaultValue="250">
      <NumberInput.Scrubber>
        <NumberInput.Label>Drag to scrub</NumberInput.Label>
      </NumberInput.Scrubber>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  ),
};

export const MouseWheel: Story = {
  render: () => (
    <NumberInput defaultValue="5" allowMouseWheel>
      <NumberInput.Label>Mouse wheel enabled</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  ),
};

export const Formatted: Story = {
  render: () => (
    <NumberInput
      defaultValue="1250"
      min={0}
      step={50}
      formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
    >
      <NumberInput.Label>Price</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid>
      <NumberInput min={1} max={10} required>
        <NumberInput.Label>Items</NumberInput.Label>
        <NumberInput.Control>
          <NumberInput.DecrementTrigger />
          <NumberInput.Input />
          <NumberInput.IncrementTrigger />
        </NumberInput.Control>
      </NumberInput>
      <Field.ErrorText>Value should be between 1 and 10.</Field.ErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const numberInput = useNumberInput({ defaultValue: '3', min: 1, max: 10 });

    return (
      <div className={storyStyles.stack}>
        <NumberInput.RootProvider value={numberInput}>
          <NumberInput.Label>Guests</NumberInput.Label>
          <NumberInput.Control>
            <NumberInput.DecrementTrigger />
            <NumberInput.Input />
            <NumberInput.IncrementTrigger />
          </NumberInput.Control>
        </NumberInput.RootProvider>
        <button type="button" onClick={() => numberInput.setToMax()}>
          Set to max
        </button>
      </div>
    );
  },
};

export const CustomIcons: Story = {
  render: () => (
    <NumberInput defaultValue="8">
      <NumberInput.Label>Floors</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger className={storyStyles.customButton}>
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
        <NumberInput.Input className={storyStyles.customInput} />
        <NumberInput.IncrementTrigger className={storyStyles.customButton}>
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput>
  ),
};