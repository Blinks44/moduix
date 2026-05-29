import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldDescription, FieldError, FieldLabel } from '../Field';
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
        <FieldLabel>Name</FieldLabel>
        <FieldDescription>Used in your public workspace profile.</FieldDescription>
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
        <FieldLabel>Username</FieldLabel>
        <Input value={value} onValueChange={setValue} placeholder="Type to control value" />
      </Field>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <Input size="xs" placeholder="Extra-small input" />
        <Input size="sm" placeholder="Small input" />
        <Input size="md" placeholder="Medium input" />
        <Input size="lg" placeholder="Large input" />
        <Input size="xl" placeholder="Extra-large input" />
      </div>
    );
  },
};

export const NativeAttributes: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Security code</FieldLabel>
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

export const DisabledAndReadOnly: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <Input disabled placeholder="Disabled input" />
        <Input readOnly value="Assigned workspace" />
      </div>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field} validationMode="onBlur">
        <FieldLabel>Email</FieldLabel>
        <Input required type="email" placeholder="name@example.com" />
        <FieldError match="valueMissing">Please enter your email.</FieldError>
        <FieldError match="typeMismatch">Enter a valid email address.</FieldError>
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Project key</FieldLabel>
        <Input placeholder="MAPS" className={storyStyles.customInput} />
      </Field>
    );
  },
};