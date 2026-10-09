import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
import { Textarea } from '@/components/textarea';
import styles from './Textarea.stories.module.css';

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

const storyComponents = {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldLabel,
  Textarea,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles, ...setup?.() };
      },
      template,
    });
}

export const DefaultPath: Story = {
  render: renderStory(`
    <Field :class="styles.field">
      <FieldLabel>Comment</FieldLabel>
      <FieldHelperText>Included in the issue summary visible to the whole team.</FieldHelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <Field :class="styles.field">
        <FieldLabel>Feedback</FieldLabel>
        <Textarea v-model="value" placeholder="Type to control value" />
      </Field>
    `,
    () => ({ value: ref('') }),
  ),
};

export const NativeAttributes: Story = {
  render: renderStory(`
    <Field :class="styles.field">
      <FieldLabel>Notes</FieldLabel>
      <Textarea
        name="notes"
        :rows="6"
        :max-length="280"
        :spellcheck="false"
        placeholder="Add enough context for the next person reading this."
      />
    </Field>
  `),
};

export const AutoResize: Story = {
  render: renderStory(`
    <Field :class="styles.field">
      <FieldLabel>Issue description</FieldLabel>
      <Textarea
        autoresize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  `),
};

export const DisabledAndReadOnly: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
      <Textarea aria-label="Read-only textarea" read-only value="Read-only text value" />
    </div>
  `),
};

export const FieldValidation: Story = {
  render: renderStory(`
    <Field :class="styles.field" invalid required>
      <FieldLabel>Details</FieldLabel>
      <Textarea :min-length="10" placeholder="Add at least 10 characters" />
      <FieldHelperText>Include enough detail for the team to reproduce the issue.</FieldHelperText>
      <FieldErrorText>Please provide details.</FieldErrorText>
      <FieldErrorText>Enter at least 10 characters.</FieldErrorText>
    </Field>
  `),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <Field :class="styles.field">
      <FieldLabel>Notes</FieldLabel>
      <Textarea :class="styles.customTextarea" placeholder="Styled textarea" />
    </Field>
  `),
};