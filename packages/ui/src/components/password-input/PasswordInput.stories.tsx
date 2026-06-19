import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field } from '../field';
import { PasswordInput } from './PasswordInput';
import storyStyles from './PasswordInput.stories.module.css';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Password</Field.Label>
        <PasswordInput autoComplete="current-password" placeholder="Enter your password" />
      </Field>
    );
  },
};

export const ControlledValue: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Field className={storyStyles.field}>
        <Field.Label>Team password</Field.Label>
        <PasswordInput
          autoComplete="new-password"
          onValueChange={setValue}
          placeholder="Type to control value"
          value={value}
        />
      </Field>
    );
  },
};

export const DefaultVisible: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Temporary password</Field.Label>
        <PasswordInput defaultVisible defaultValue="S3cur3!" />
      </Field>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <PasswordInput
          size="xs"
          aria-label="Extra-small password input"
          placeholder="Extra-small"
        />
        <PasswordInput size="sm" aria-label="Small password input" placeholder="Small" />
        <PasswordInput size="md" aria-label="Medium password input" placeholder="Medium" />
        <PasswordInput size="lg" aria-label="Large password input" placeholder="Large" />
        <PasswordInput
          size="xl"
          aria-label="Extra-large password input"
          placeholder="Extra-large"
        />
      </div>
    );
  },
};

export const DisabledAndReadOnly: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <PasswordInput disabled aria-label="Disabled password input" defaultValue="secret-value" />
        <PasswordInput
          readOnly
          aria-label="Read-only password input"
          defaultValue="readonly-secret"
        />
      </div>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Password</Field.Label>
        <PasswordInput required autoComplete="new-password" placeholder="Create a password" />
        <Field.ErrorText>Please enter a password.</Field.ErrorText>
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Workspace password</Field.Label>
        <PasswordInput
          className={storyStyles.customPasswordInput}
          placeholder="Custom password input"
        />
      </Field>
    );
  },
};