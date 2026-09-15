import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Checkbox } from '@/components/checkbox';
import { Field, useField } from '@/components/field/Field';
import { RadioGroup } from '@/components/radio-group';

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

export const Basic: Story = {
  render: () => (
    <Field required>
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input placeholder="Enter your name" />
      <Field.HelperText>Visible on your public profile.</Field.HelperText>
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required>
      <Field.Label>Email</Field.Label>
      <Field.Input defaultValue="not-an-email" type="email" />
      <Field.HelperText>Use your work email.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  ),
};

export const ControlledInvalid: Story = {
  render: () => {
    const [value, setValue] = createSignal('');

    return (
      <Field invalid={value().length > 0 && value().length < 3}>
        <Field.Label>Username</Field.Label>
        <Field.Input value={value()} onInput={(event) => setValue(event.currentTarget.value)} />
        <Field.HelperText>Use at least 3 characters.</Field.HelperText>
        <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
      </Field>
    );
  },
};

export const Textarea: Story = {
  render: () => (
    <Field>
      <Field.Label>Summary</Field.Label>
      <Field.Textarea autoresize placeholder="Describe the request" />
    </Field>
  ),
};

export const Select: Story = {
  render: () => (
    <Field required>
      <Field.Label>Priority</Field.Label>
      <Field.Select defaultValue="">
        <option value="" disabled>
          Select priority
        </option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
      </Field.Select>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <Field.Label>Organization</Field.Label>
      <Field.Input placeholder="Acme Inc." />
    </Field>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Field readOnly>
      <Field.Label>Workspace key</Field.Label>
      <Field.Input defaultValue="MAPS" />
    </Field>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Field required>
      <Checkbox.Root>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Accept support access</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
      <Field.ErrorText>Support access must be enabled.</Field.ErrorText>
    </Field>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <Field>
      <Field.Label>Account type</Field.Label>
      <RadioGroup defaultValue="team" aria-label="Account type">
        <RadioGroup.Item value="personal">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Personal account</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
        <RadioGroup.Item value="team">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Team account</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      </RadioGroup>
    </Field>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Field invalid>
      <Field.Label>
        International tax residency and withholding election for non-resident account holders
      </Field.Label>
      <Field.Input />
      <Field.HelperText>
        Enter the tax identification number issued by your country of tax residence.
      </Field.HelperText>
      <Field.ErrorText>
        A tax identification number is required before you can continue.
      </Field.ErrorText>
    </Field>
  ),
};

export const ItemTarget: Story = {
  render: () => (
    <Field target="amount">
      <Field.Label>Amount</Field.Label>
      <Field.Item value="currency">
        <Field.Select aria-label="Currency" defaultValue="USD">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </Field.Select>
      </Field.Item>
      <Field.Item value="amount">
        <Field.Input inputmode="decimal" placeholder="0.00" />
      </Field.Item>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const field = useField({ id: 'provider-email', invalid: true, required: true });

    return (
      <Field.RootProvider value={field}>
        <Field.Label>
          External state
          <Field.RequiredIndicator />
        </Field.Label>
        <Field.Input placeholder="Controlled by useField" />
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field.RootProvider>
    );
  },
};