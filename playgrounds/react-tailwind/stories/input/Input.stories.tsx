import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field } from '@/components/field/Field';
import { Input } from '@/components/input/Input';

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

const stackClassName = 'grid w-64 gap-3';
const fieldClassName = 'w-64';

export const Basic: Story = {
  render: () => (
    <Field className={fieldClassName}>
      <Field.Label>Name</Field.Label>
      <Field.HelperText>Used in your public workspace profile.</Field.HelperText>
      <Input placeholder="Enter your name" />
    </Field>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Field className={fieldClassName}>
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
  render: () => (
    <div className={stackClassName}>
      <Input size="xs" aria-label="Extra-small input" placeholder="Extra-small input" />
      <Input size="sm" aria-label="Small input" placeholder="Small input" />
      <Input size="md" aria-label="Medium input" placeholder="Medium input" />
      <Input size="lg" aria-label="Large input" placeholder="Large input" />
      <Input size="xl" aria-label="Extra-large input" placeholder="Extra-large input" />
    </div>
  ),
};

export const NativeAttributes: Story = {
  render: () => (
    <Field className={fieldClassName}>
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
  ),
};

export const File: Story = {
  render: () => (
    <Field className={fieldClassName}>
      <Field.Label>Attachment</Field.Label>
      <Input accept=".pdf,.png" type="file" />
      <Field.HelperText>Choose a PDF or PNG file.</Field.HelperText>
    </Field>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Field className={fieldClassName}>
      <Field.Label>Repository</Field.Label>
      <Input asChild>
        <input name="repository" placeholder="owner/project" />
      </Input>
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div className={stackClassName}>
      <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
      <Input readOnly aria-label="Read-only workspace" value="Assigned workspace" />
    </div>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field className={fieldClassName} invalid>
      <Field.Label>Email</Field.Label>
      <Input type="email" placeholder="name@example.com" />
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Field className={fieldClassName}>
      <Field.Label>Project key</Field.Label>
      <Input
        placeholder="MAPS"
        className="border-primary/40 bg-primary/5 tracking-normal text-primary uppercase placeholder:normal-case focus-visible:outline-primary"
      />
    </Field>
  ),
};