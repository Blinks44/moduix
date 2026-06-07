import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field';
import { Textarea } from './Textarea';
import storyStyles from './Textarea.stories.module.css';

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

export const DefaultPath: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Comment</FieldLabel>
        <FieldDescription>
          Included in the issue summary visible to the whole team.
        </FieldDescription>
        <Textarea placeholder="Write a short comment" />
      </Field>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Field className={storyStyles.field}>
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
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Notes</FieldLabel>
        <Textarea
          name="notes"
          rows={6}
          maxLength={280}
          spellCheck={false}
          placeholder="Add enough context for the next person reading this."
        />
      </Field>
    );
  },
};

export const AutoResize: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Issue description</FieldLabel>
        <Textarea
          autoResize
          placeholder="Start typing a longer description. Height grows with content."
        />
      </Field>
    );
  },
};

export const DisabledAndReadOnly: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
        <Textarea aria-label="Read-only textarea" readOnly value="Read-only text value" />
      </div>
    );
  },
};

export const FieldValidation: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field} validationMode="onBlur">
        <FieldLabel>Details</FieldLabel>
        <Textarea required minLength={10} placeholder="Add at least 10 characters" />
        <FieldDescription>
          Include enough detail for the team to reproduce the issue.
        </FieldDescription>
        <FieldError match="valueMissing">Please provide details.</FieldError>
        <FieldError match="tooShort">Enter at least 10 characters.</FieldError>
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Notes</FieldLabel>
        <Textarea className={storyStyles.customTextarea} placeholder="Styled textarea" />
      </Field>
    );
  },
};