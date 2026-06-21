import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field } from '../field';
import { Input } from './Input';
import storyStyles from './Input.stories.module.css';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Name</Field.Label>
        <Field.HelperText>Used in your public workspace profile.</Field.HelperText>
        <Input placeholder="Enter your name" />
      </Field>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Field className={storyStyles.field}>
        <Field.Label>Username</Field.Label>
        <Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          placeholder="Type to control value"
        />
      </Field>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <Input size="xs" aria-label="Extra-small input" placeholder="Extra-small input" />
        <Input size="sm" aria-label="Small input" placeholder="Small input" />
        <Input size="md" aria-label="Medium input" placeholder="Medium input" />
        <Input size="lg" aria-label="Large input" placeholder="Large input" />
        <Input size="xl" aria-label="Extra-large input" placeholder="Extra-large input" />
      </div>
    );
  },
};

export const NativeAttributes: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Security code</Field.Label>
        <Input
          htmlSize={8}
          inputMode="numeric"
          maxLength={6}
          name="security-code"
          placeholder="000000"
          type="text"
          autoComplete="one-time-code"
        />
      </Field>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Repository</Field.Label>
        <Input asChild>
          <input name="repository" placeholder="owner/project" />
        </Input>
      </Field>
    );
  },
};

export const DisabledAndReadOnly: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
        <Input readOnly aria-label="Read-only workspace" value="Assigned workspace" />
      </div>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field} invalid>
        <Field.Label>Email</Field.Label>
        <Input type="email" placeholder="name@example.com" />
        <Field.ErrorText>Please enter your email.</Field.ErrorText>
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Project key</Field.Label>
        <Input placeholder="MAPS" className={storyStyles.customInput} />
      </Field>
    );
  },
};