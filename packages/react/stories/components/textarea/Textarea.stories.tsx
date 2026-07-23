import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Field } from '../../../src/components/field';
import { Textarea } from '../../../src/components/textarea/Textarea';
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
        <Field.Label>Comment</Field.Label>
        <Field.HelperText>
          Included in the issue summary visible to the whole team.
        </Field.HelperText>
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
        <Field.Label>Feedback</Field.Label>
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
        <Field.Label>Notes</Field.Label>
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
        <Field.Label>Issue description</Field.Label>
        <Textarea
          autoresize
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
      <Field className={storyStyles.field} invalid required>
        <Field.Label>Details</Field.Label>
        <Textarea minLength={10} placeholder="Add at least 10 characters" />
        <Field.HelperText>
          Include enough detail for the team to reproduce the issue.
        </Field.HelperText>
        <Field.ErrorText>Please provide details.</Field.ErrorText>
        <Field.ErrorText>Enter at least 10 characters.</Field.ErrorText>
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Notes</Field.Label>
        <Textarea className={storyStyles.customTextarea} placeholder="Styled textarea" />
      </Field>
    );
  },
};