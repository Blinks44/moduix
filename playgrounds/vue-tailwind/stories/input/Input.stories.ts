import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
import { Input } from '@/components/input';

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

const stackClass = 'grid w-64 gap-3';
const fieldClass = 'w-64';
const customInputClass =
  'border-primary/40 bg-primary/5 tracking-normal text-primary uppercase placeholder:normal-case focus-visible:outline-primary';

const storyComponents = {
  FieldErrorText,
  FieldHelperText,
  FieldLabel,
  Field,
  Input,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { fieldClass, stackClass, customInputClass, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Field :class="fieldClass">
      <FieldLabel>Name</FieldLabel>
      <FieldHelperText>Used in your public workspace profile.</FieldHelperText>
      <Input placeholder="Enter your name" />
    </Field>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <Field :class="fieldClass">
        <FieldLabel>Username</FieldLabel>
        <Input v-model="value" placeholder="Type to control value" />
      </Field>
    `,
    () => ({ value: ref('') }),
  ),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="stackClass">
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
    <Field :class="fieldClass">
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
    </Field>
  `),
};

export const File: Story = {
  render: renderStory(`
    <Field :class="fieldClass">
      <FieldLabel>Attachment</FieldLabel>
      <Input accept=".pdf,.png" type="file" />
      <FieldHelperText>Choose a PDF or PNG file.</FieldHelperText>
    </Field>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <Field :class="fieldClass">
      <FieldLabel>Repository</FieldLabel>
      <Input as-child>
        <input name="repository" placeholder="owner/project" />
      </Input>
    </Field>
  `),
};

export const DisabledAndReadOnly: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
      <Input read-only aria-label="Read-only workspace" value="Assigned workspace" />
    </div>
  `),
};

export const WithFieldValidation: Story = {
  render: renderStory(`
    <Field :class="fieldClass" invalid>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="name@example.com" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  `),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <Field :class="fieldClass">
      <FieldLabel>Project key</FieldLabel>
      <Input placeholder="MAPS" :class="customInputClass" />
    </Field>
  `),
};