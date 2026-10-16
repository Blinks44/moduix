import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/checkbox';
import {
  Field,
  useField,
  FieldErrorText,
  FieldHelperText,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
} from '@/components/field/Field';
import { Input } from '@/components/input';
import { NativeSelect } from '@/components/native-select';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from '@/components/radio-group';
import { Textarea } from '@/components/textarea';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputParity: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        'grid-template-columns': 'repeat(2, minmax(0, 1fr))',
        gap: '1rem',
        width: '36rem',
      }}
    >
      <Field>
        <FieldLabel>Input Default</FieldLabel>
        <Input placeholder="Enter your name" />
      </Field>
      <Field>
        <FieldLabel>Input Default</FieldLabel>
        <Input placeholder="Enter your name" />
      </Field>
      <Field invalid>
        <FieldLabel>Input Invalid</FieldLabel>
        <Input placeholder="name@example.com" />
      </Field>
      <Field invalid>
        <FieldLabel>Input Invalid</FieldLabel>
        <Input placeholder="name@example.com" />
      </Field>
      <Field readOnly>
        <FieldLabel>Input Read-only</FieldLabel>
        <Input placeholder="Workspace key" />
      </Field>
      <Field readOnly>
        <FieldLabel>Input Read-only</FieldLabel>
        <Input placeholder="Workspace key" />
      </Field>
      <Field disabled>
        <FieldLabel>Input Disabled</FieldLabel>
        <Input placeholder="Acme Inc." />
      </Field>
      <Field disabled>
        <FieldLabel>Input Disabled</FieldLabel>
        <Input placeholder="Acme Inc." />
      </Field>
      <Field>
        <FieldLabel>Input File</FieldLabel>
        <Input type="file" />
      </Field>
      <Field>
        <FieldLabel>Input File</FieldLabel>
        <Input type="file" />
      </Field>
      <Input aria-label="Input standalone disabled" disabled placeholder="Standalone disabled" />
      <Input aria-label="Input standalone disabled" disabled placeholder="Standalone disabled" />
    </div>
  ),
};

export const Basic: Story = {
  render: () => (
    <Field required>
      <FieldLabel>
        Name
        <FieldRequiredIndicator />
      </FieldLabel>
      <Input placeholder="Enter your name" />
      <FieldHelperText>Visible on your public profile.</FieldHelperText>
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required>
      <FieldLabel>Email</FieldLabel>
      <Input value="not-an-email" type="email" />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  ),
};

export const ControlledInvalid: Story = {
  render: () => {
    const [value, setValue] = createSignal('');

    return (
      <Field invalid={value().length > 0 && value().length < 3}>
        <FieldLabel>Username</FieldLabel>
        <Input value={value()} onInput={(event) => setValue(event.currentTarget.value)} />
        <FieldHelperText>Use at least 3 characters.</FieldHelperText>
        <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
      </Field>
    );
  },
};

export const WithTextarea: Story = {
  render: () => (
    <Field>
      <FieldLabel>Summary</FieldLabel>
      <Textarea autoresize placeholder="Describe the request" />
    </Field>
  ),
};

export const Select: Story = {
  render: () => (
    <Field required>
      <FieldLabel>Priority</FieldLabel>
      <NativeSelect>
        <option value="" disabled selected>
          Select priority
        </option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
      </NativeSelect>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <FieldLabel>Organization</FieldLabel>
      <Input placeholder="Acme Inc." />
    </Field>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Field readOnly>
      <FieldLabel>Workspace key</FieldLabel>
      <Input value="MAPS" />
    </Field>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Field required>
      <Checkbox>
        <CheckboxControl>
          <CheckboxIndicator />
        </CheckboxControl>
        <CheckboxLabel>Accept support access</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <FieldErrorText>Support access must be enabled.</FieldErrorText>
    </Field>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <Field>
      <FieldLabel>Account type</FieldLabel>
      <RadioGroup defaultValue="team" aria-label="Account type">
        <RadioGroupItem value="personal">
          <RadioGroupItemControl />
          <RadioGroupItemText>Personal account</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
        <RadioGroupItem value="team">
          <RadioGroupItemControl />
          <RadioGroupItemText>Team account</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      </RadioGroup>
    </Field>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>
        International tax residency and withholding election for non-resident account holders
      </FieldLabel>
      <Input />
      <FieldHelperText>
        Enter the tax identification number issued by your country of tax residence.
      </FieldHelperText>
      <FieldErrorText>
        A tax identification number is required before you can continue.
      </FieldErrorText>
    </Field>
  ),
};

export const ItemTarget: Story = {
  render: () => (
    <Field target="amount">
      <FieldLabel>Amount</FieldLabel>
      <FieldItem value="currency">
        <NativeSelect aria-label="Currency">
          <option value="USD" selected>
            USD
          </option>
          <option value="EUR">EUR</option>
        </NativeSelect>
      </FieldItem>
      <FieldItem value="amount">
        <Input inputmode="decimal" placeholder="0.00" />
      </FieldItem>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const field = useField({ id: 'provider-email', invalid: true, required: true });

    return (
      <FieldRootProvider value={field}>
        <FieldLabel>
          External state
          <FieldRequiredIndicator />
        </FieldLabel>
        <Input placeholder="Controlled by useField" />
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </FieldRootProvider>
    );
  },
};