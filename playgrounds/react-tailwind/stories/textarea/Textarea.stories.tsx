import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field/Field';
import { Textarea } from '@/components/textarea/Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

const fieldClassName = 'w-80';
const stackClassName = 'grid w-80 gap-3';

export const DefaultPath: Story = {
  render: () => (
    <Field className={fieldClassName}>
      <FieldLabel>Comment</FieldLabel>
      <FieldHelperText>Included in the issue summary visible to the whole team.</FieldHelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={stackClassName}>
      <Textarea size="xs" aria-label="Extra-small textarea" placeholder="Extra-small textarea" />
      <Textarea size="sm" aria-label="Small textarea" placeholder="Small textarea" />
      <Textarea size="md" aria-label="Medium textarea" placeholder="Medium textarea" />
      <Textarea size="lg" aria-label="Large textarea" placeholder="Large textarea" />
      <Textarea size="xl" aria-label="Extra-large textarea" placeholder="Extra-large textarea" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Field className={fieldClassName}>
        <FieldLabel>Feedback</FieldLabel>
        <Textarea
          placeholder="Type to control value"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Field>
    );
  },
};

export const NativeAttributes: Story = {
  render: () => (
    <Field className={fieldClassName}>
      <FieldLabel>Notes</FieldLabel>
      <Textarea
        name="notes"
        rows={6}
        maxLength={280}
        spellCheck={false}
        placeholder="Add enough context for the next person reading this."
      />
    </Field>
  ),
};

export const AutoResize: Story = {
  render: () => (
    <Field className={fieldClassName}>
      <FieldLabel>Issue description</FieldLabel>
      <Textarea
        autoresize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div className={stackClassName}>
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
      <Textarea aria-label="Read-only textarea" readOnly value="Read-only text value" />
    </div>
  ),
};

export const FieldValidation: Story = {
  render: () => (
    <Field className={fieldClassName} invalid required>
      <FieldLabel>Details</FieldLabel>
      <Textarea minLength={10} placeholder="Add at least 10 characters" />
      <FieldHelperText>Include enough detail for the team to reproduce the issue.</FieldHelperText>
      <FieldErrorText>Please provide details.</FieldErrorText>
      <FieldErrorText>Enter at least 10 characters.</FieldErrorText>
    </Field>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Field className={fieldClassName}>
      <FieldLabel>Notes</FieldLabel>
      <Textarea
        className="resize-none border-primary/45 bg-primary/5 text-primary"
        placeholder="Styled textarea"
      />
    </Field>
  ),
};