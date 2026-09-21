import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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

const fieldClass = 'w-80';
const stackClass = 'grid w-80 gap-3';

export const DefaultPath: Story = {
  render: () => (
    <Field class={fieldClass}>
      <FieldLabel>Comment</FieldLabel>
      <FieldHelperText>Included in the issue summary visible to the whole team.</FieldHelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('');

    return (
      <Field class={fieldClass}>
        <FieldLabel>Feedback</FieldLabel>
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
    <Field class={fieldClass}>
      <FieldLabel>Notes</FieldLabel>
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
    <Field class={fieldClass}>
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
    <div class={stackClass}>
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
      <Textarea aria-label="Read-only textarea" readOnly value="Read-only text value" />
    </div>
  ),
};

export const FieldValidation: Story = {
  render: () => (
    <Field class={fieldClass} invalid required>
      <FieldLabel>Details</FieldLabel>
      <Textarea minLength={10} placeholder="Add at least 10 characters" />
      <FieldHelperText>
        Include enough detail for the team to reproduce the issue.
      </FieldHelperText>
      <FieldErrorText>Please provide details.</FieldErrorText>
      <FieldErrorText>Enter at least 10 characters.</FieldErrorText>
    </Field>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Field class={fieldClass}>
      <FieldLabel>Notes</FieldLabel>
      <Textarea
        class="resize-none border-primary/45 bg-primary/5 text-primary"
        placeholder="Styled textarea"
      />
    </Field>
  ),
};
