import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Field, FieldDescription, FieldError, FieldLabel } from '../Field';
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

export const Basic: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Comment</FieldLabel>
        <Textarea placeholder="Write a short comment" />
      </Field>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

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

export const NativeProps: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Notes</FieldLabel>
        <Textarea
          rows={6}
          maxLength={280}
          placeholder="Add enough context for the next person reading this."
          style={{ resize: 'vertical' }}
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
        <Textarea disabled placeholder="Disabled textarea" />
        <Textarea readOnly value="Read-only text value" />
      </div>
    );
  },
};

export const WithFieldValidation: Story = {
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

export const CustomComposition: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Notes</FieldLabel>
        <Textarea className={storyStyles.customTextarea} placeholder="Styled textarea" />
      </Field>
    );
  },
};