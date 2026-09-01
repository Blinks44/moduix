import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field } from '@/components/field';
import { Textarea } from '@/components/textarea/Textarea';
import storyStyles from './Textarea.stories.module.css';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPath: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <Field.Label>Comment</Field.Label>
      <Field.HelperText>Included in the issue summary visible to the whole team.</Field.HelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('');

    return (
      <Field class={storyStyles.field}>
        <Field.Label>Feedback</Field.Label>
        <Textarea
          placeholder="Type to control value"
          value={value()}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Field>
    );
  },
};

export const NativeAttributes: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <Field.Label>Notes</Field.Label>
      <Textarea
        name="notes"
        rows={6}
        maxLength={280}
        spellcheck={false}
        placeholder="Add enough context for the next person reading this."
      />
    </Field>
  ),
};

export const AutoResize: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <Field.Label>Issue description</Field.Label>
      <Textarea
        autoresize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div class={storyStyles.stack}>
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
      <Textarea aria-label="Read-only textarea" readOnly value="Read-only text value" />
    </div>
  ),
};

export const FieldValidation: Story = {
  render: () => (
    <Field class={storyStyles.field} invalid required>
      <Field.Label>Details</Field.Label>
      <Textarea minLength={10} placeholder="Add at least 10 characters" />
      <Field.HelperText>
        Include enough detail for the team to reproduce the issue.
      </Field.HelperText>
      <Field.ErrorText>Please provide details.</Field.ErrorText>
      <Field.ErrorText>Enter at least 10 characters.</Field.ErrorText>
    </Field>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <Field.Label>Notes</Field.Label>
      <Textarea class={storyStyles.customTextarea} placeholder="Styled textarea" />
    </Field>
  ),
};