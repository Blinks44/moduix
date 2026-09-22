import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  NumberInput,
  NumberInputContext,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputField,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputRootProvider,
  NumberInputScrubber,
  NumberInputValueText,
  useNumberInput,
} from '@/components/number-input/NumberInput';
import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui/Icons';

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
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('24');

    return (
      <div class="grid items-start gap-3">
        <NumberInput value={value()} onValueChange={(details) => setValue(details.value)}>
          <NumberInputLabel>Controlled value</NumberInputLabel>
          <NumberInputField />
        </NumberInput>
        <span class="text-xs leading-4 text-muted-foreground">
          Current value: {value() || 'empty'}
        </span>
      </div>
    );
  },
};

export const MinMaxAndStep: Story = {
  render: () => (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInputLabel>Quantity (0-20, step 2)</NumberInputLabel>
      <NumberInputField />
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
      <NumberInputLabel>Hours</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  ),
};

export const Scrubber: Story = {
  render: () => (
    <NumberInput defaultValue="250">
      <NumberInputLabel>Adjust value</NumberInputLabel>
      <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
      <NumberInputField />
    </NumberInput>
  ),
};

export const MouseWheel: Story = {
  render: () => (
    <NumberInput defaultValue="5" allowMouseWheel>
      <NumberInputLabel>Mouse wheel enabled</NumberInputLabel>
      <NumberInputField />
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
      <NumberInputLabel>Price</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid>
      <NumberInput min={1} max={10} required>
        <NumberInputLabel>Items</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <FieldHelperText>Choose between 1 and 10 items.</FieldHelperText>
      <FieldErrorText>Value should be between 1 and 10.</FieldErrorText>
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div class="grid items-start gap-3">
      <NumberInput defaultValue="4" disabled>
        <NumberInputLabel>Disabled quantity</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <NumberInput defaultValue="8" readOnly>
        <NumberInputLabel>Read-only quantity</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
    </div>
  ),
};

export const ValueText: Story = {
  render: () => (
    <NumberInput defaultValue="42">
      <NumberInputLabel>Value preview</NumberInputLabel>
      <NumberInputField />
      <NumberInputValueText />
    </NumberInput>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const numberInput = useNumberInput({ defaultValue: '3', min: 1, max: 10 });

    return (
      <div class="grid items-start gap-3">
        <NumberInputRootProvider value={numberInput}>
          <NumberInputLabel>Guests</NumberInputLabel>
          <NumberInputField />
        </NumberInputRootProvider>
        <button type="button" onClick={() => numberInput().setToMax()}>
          Set to max
        </button>
      </div>
    );
  },
};

export const CustomIcons: Story = {
  render: () => (
    <NumberInput
      defaultValue="8"
      translations={{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }}
    >
      <NumberInputLabel>Floors</NumberInputLabel>
      <NumberInputControl>
        <NumberInputDecrementTrigger class="bg-muted [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent">
          <ChevronDownIcon />
        </NumberInputDecrementTrigger>
        <NumberInputInput class="w-28 text-lg" />
        <NumberInputIncrementTrigger class="bg-muted [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent">
          <ChevronUpIcon />
        </NumberInputIncrementTrigger>
      </NumberInputControl>
    </NumberInput>
  ),
};

export const Context: Story = {
  render: () => (
    <NumberInput defaultValue="42">
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputField />
      <NumberInputContext>
        {(context) => <output>Numeric value: {context().valueAsNumber}</output>}
      </NumberInputContext>
    </NumberInput>
  ),
};
