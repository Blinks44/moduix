import { FieldErrorText, FieldHelperText, FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Input } from '@/components/input';
import styles from './Input.stories.module.css';

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

const storyComponents = {
  FieldErrorText,
  FieldHelperText,
  FieldLabel,
  FieldRoot,
  Input,
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

export const Basic: Story = {
  render: renderStory(`
    <FieldRoot :class="styles.field">
      <FieldLabel>Name</FieldLabel>
      <FieldHelperText>Used in your public workspace profile.</FieldHelperText>
      <Input placeholder="Enter your name" />
    </FieldRoot>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <FieldRoot :class="styles.field">
        <FieldLabel>Username</FieldLabel>
        <Input v-model="value" placeholder="Type to control value" />
      </FieldRoot>
    `,
    () => ({ value: ref('') }),
  ),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Input size="xs" aria-label="Extra-small input" placeholder="Extra-small input" />
      <Input size="sm" aria-label="Small input" placeholder="Small input" />
      <Input size="md" aria-label="Medium input" placeholder="Medium input" />
      <Input size="lg" aria-label="Large input" placeholder="Large input" />
      <Input size="xl" aria-label="Extra-large input" placeholder="Extra-large input" />
    </div>
  `),
};

export const NativeAttributes: Story = {
  render: renderStory(`
    <FieldRoot :class="styles.field">
      <FieldLabel>Security code</FieldLabel>
      <Input
        :html-size="8"
        input-mode="numeric"
        :max-length="6"
        name="security-code"
        placeholder="000000"
        type="text"
        autocomplete="one-time-code"
      />
    </FieldRoot>
  `),
};

export const File: Story = {
  render: renderStory(`
    <FieldRoot :class="styles.field">
      <FieldLabel>Attachment</FieldLabel>
      <Input accept=".pdf,.png" type="file" />
      <FieldHelperText>Choose a PDF or PNG file.</FieldHelperText>
    </FieldRoot>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <FieldRoot :class="styles.field">
      <FieldLabel>Repository</FieldLabel>
      <Input as-child>
        <input name="repository" placeholder="owner/project" />
      </Input>
    </FieldRoot>
  `),
};

export const DisabledAndReadOnly: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
      <Input read-only aria-label="Read-only workspace" value="Assigned workspace" />
    </div>
  `),
};

export const WithFieldValidation: Story = {
  render: renderStory(`
    <FieldRoot :class="styles.field" invalid>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="name@example.com" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </FieldRoot>
  `),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <FieldRoot :class="styles.field">
      <FieldLabel>Project key</FieldLabel>
      <Input placeholder="MAPS" :class="styles.customInput" />
    </FieldRoot>
  `),
};