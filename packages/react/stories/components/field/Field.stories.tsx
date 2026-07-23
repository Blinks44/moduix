import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '../../../src/components/checkbox';
import { Field, useField } from '../../../src/components/field/Field';
import { RadioGroup } from '../../../src/components/radio-group';

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
  render: () => {
    return (
      <Field required>
        <Field.Label>
          Name
          <Field.RequiredIndicator />
        </Field.Label>
        <Field.Input placeholder="Enter your name" />
        <Field.HelperText>Visible on your public profile.</Field.HelperText>
      </Field>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <Field invalid required>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" placeholder="name@example.com" />
        <Field.HelperText>Use your work email.</Field.HelperText>
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field>
    );
  },
};

export const ControlledInvalid: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const invalid = value.length > 0 && value.length < 3;

    return (
      <Field invalid={invalid}>
        <Field.Label>Username</Field.Label>
        <Field.Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          placeholder="e.g. vinny"
        />
        <Field.HelperText>Use at least 3 characters.</Field.HelperText>
        <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
      </Field>
    );
  },
};

export const Textarea: Story = {
  render: () => {
    return (
      <Field>
        <Field.Label>Summary</Field.Label>
        <Field.Textarea placeholder="Describe the request" autoresize />
        <Field.HelperText>The textarea can autoresize as the user types.</Field.HelperText>
      </Field>
    );
  },
};

export const Select: Story = {
  render: () => {
    return (
      <Field required>
        <Field.Label>Priority</Field.Label>
        <Field.Select defaultValue="">
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </Field.Select>
        <Field.HelperText>Used for triage queues.</Field.HelperText>
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Field disabled>
        <Field.Label>Organization</Field.Label>
        <Field.Input placeholder="Acme Inc." />
        <Field.HelperText>This field is currently managed by your workspace.</Field.HelperText>
      </Field>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <Field readOnly>
        <Field.Label>Workspace key</Field.Label>
        <Field.Input defaultValue="MAPS" />
        <Field.HelperText>Read-only state is propagated to the input.</Field.HelperText>
      </Field>
    );
  },
};

export const WithCheckbox: Story = {
  render: () => {
    return (
      <Field required>
        <Checkbox.Root>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Accept support access</Checkbox.Label>
        </Checkbox.Root>
        <Field.HelperText>Required before the team can inspect workspace data.</Field.HelperText>
        <Field.ErrorText>Support access must be enabled.</Field.ErrorText>
      </Field>
    );
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    return (
      <Field>
        <Field.Label>Account type</Field.Label>
        <RadioGroup defaultValue="team" aria-label="Account type">
          <RadioGroup.Item value="personal">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Personal account</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="team">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Team account</RadioGroup.ItemText>
          </RadioGroup.Item>
        </RadioGroup>
        <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
      </Field>
    );
  },
};

export const ItemTarget: Story = {
  render: () => {
    return (
      <Field target="amount">
        <Field.Label>Amount</Field.Label>
        <Field.Item value="currency">
          <Field.Select aria-label="Currency" defaultValue="USD">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </Field.Select>
        </Field.Item>
        <Field.Item value="amount">
          <Field.Input inputMode="decimal" placeholder="0.00" />
        </Field.Item>
        <Field.HelperText>The root label targets the amount input.</Field.HelperText>
      </Field>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const field = useField({ id: 'root-provider-field', required: true });

    return (
      <Field.RootProvider value={field}>
        <Field.Label>Project key</Field.Label>
        <Field.Input placeholder="MAPS" />
        <Field.HelperText>The field state is created outside the rendered tree.</Field.HelperText>
      </Field.RootProvider>
    );
  },
};