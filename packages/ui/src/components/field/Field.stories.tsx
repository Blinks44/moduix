import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, useField } from './Field';
import storyStyles from './Field.stories.module.css';

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

export const WithItems: Story = {
  render: () => {
    return (
      <Field target="team">
        <Field.Label>Account type</Field.Label>
        <Field.Item value="personal">
          <Field.Input type="radio" value="personal" />
          <Field.Label>Personal account</Field.Label>
        </Field.Item>
        <Field.Item value="team">
          <Field.Input type="radio" value="team" defaultChecked />
          <Field.Label>Team account</Field.Label>
        </Field.Item>
        <Field.HelperText>The root label points to the targeted item.</Field.HelperText>
      </Field>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Field invalid required>
        <Field.Label>Status</Field.Label>
        <Field.Input placeholder="Status" />
        <Field.Context>
          {(field) => (
            <p className={storyStyles.helper}>
              {field.invalid ? 'The field is invalid.' : 'The field is valid.'}
            </p>
          )}
        </Field.Context>
        <Field.ErrorText>Status is required.</Field.ErrorText>
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