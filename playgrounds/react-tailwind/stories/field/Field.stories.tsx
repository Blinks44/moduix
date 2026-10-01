import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldTextarea,
} from '@/components/field/Field';
import { Input } from '@/components/input';
import { NativeSelect } from '@/components/native-select/NativeSelect';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from '@/components/radio-group';

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
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '1rem',
        width: '36rem',
      }}
    >
      <Field>
        <FieldLabel>FieldInput Default</FieldLabel>
        <FieldInput placeholder="Enter your name" />
      </Field>
      <Field>
        <FieldLabel>Input Default</FieldLabel>
        <Input placeholder="Enter your name" />
      </Field>
      <Field invalid>
        <FieldLabel>FieldInput Invalid</FieldLabel>
        <FieldInput placeholder="name@example.com" />
      </Field>
      <Field invalid>
        <FieldLabel>Input Invalid</FieldLabel>
        <Input placeholder="name@example.com" />
      </Field>
      <Field readOnly>
        <FieldLabel>FieldInput Read-only</FieldLabel>
        <FieldInput placeholder="Workspace key" />
      </Field>
      <Field readOnly>
        <FieldLabel>Input Read-only</FieldLabel>
        <Input placeholder="Workspace key" />
      </Field>
      <Field disabled>
        <FieldLabel>FieldInput Disabled</FieldLabel>
        <FieldInput placeholder="Acme Inc." />
      </Field>
      <Field disabled>
        <FieldLabel>Input Disabled</FieldLabel>
        <Input placeholder="Acme Inc." />
      </Field>
      <Field>
        <FieldLabel>FieldInput File</FieldLabel>
        <FieldInput type="file" />
      </Field>
      <Field>
        <FieldLabel>Input File</FieldLabel>
        <Input type="file" />
      </Field>
      <FieldInput
        aria-label="FieldInput standalone disabled"
        disabled
        placeholder="Standalone disabled"
      />
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
      <FieldInput placeholder="Enter your name" />
      <FieldHelperText>Visible on your public profile.</FieldHelperText>
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required>
      <FieldLabel>Email</FieldLabel>
      <FieldInput defaultValue="not-an-email" type="email" />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  ),
};

export const ControlledInvalid: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const invalid = value.length > 0 && value.length < 3;

    return (
      <Field invalid={invalid}>
        <FieldLabel>Username</FieldLabel>
        <FieldInput
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          placeholder="e.g. vinny"
        />
        <FieldHelperText>Use at least 3 characters.</FieldHelperText>
        <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
      </Field>
    );
  },
};

export const Textarea: Story = {
  render: () => (
    <Field>
      <FieldLabel>Summary</FieldLabel>
      <FieldTextarea autoresize placeholder="Describe the request" />
      <FieldHelperText>The textarea can autoresize as the user types.</FieldHelperText>
    </Field>
  ),
};

export const Select: Story = {
  render: () => (
    <Field required>
      <FieldLabel>Priority</FieldLabel>
      <NativeSelect defaultValue="">
        <option value="" disabled>
          Select priority
        </option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </NativeSelect>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <FieldLabel>Organization</FieldLabel>
      <FieldInput placeholder="Acme Inc." />
    </Field>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Field readOnly>
      <FieldLabel>Workspace key</FieldLabel>
      <FieldInput defaultValue="MAPS" />
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
      <FieldInput />
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
        <NativeSelect aria-label="Currency" defaultValue="USD">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </NativeSelect>
      </FieldItem>
      <FieldItem value="amount">
        <FieldInput inputMode="decimal" placeholder="0.00" />
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
        <FieldInput placeholder="Controlled by useField" />
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </FieldRootProvider>
    );
  },
};