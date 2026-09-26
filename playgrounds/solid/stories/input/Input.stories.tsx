import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
import { Input } from '@/components/input/Input';
import storyStyles from './Input.stories.module.css';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <FieldLabel>Name</FieldLabel>
      <FieldHelperText>Used in your public workspace profile.</FieldHelperText>
      <Input placeholder="Enter your name" />
    </Field>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('');

    return (
      <Field class={storyStyles.field}>
        <FieldLabel>Username</FieldLabel>
        <Input
          value={value()}
          onChange={(event) => setValue(event.currentTarget.value)}
          placeholder="Type to control value"
        />
      </Field>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div class={storyStyles.stack}>
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
    <Field class={storyStyles.field}>
      <FieldLabel>Security code</FieldLabel>
      <Input
        htmlSize={8}
        inputMode="numeric"
        maxLength={6}
        name="security-code"
        placeholder="000000"
        type="text"
        autocomplete="one-time-code"
      />
    </Field>
  ),
};

export const File: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <FieldLabel>Attachment</FieldLabel>
      <Input accept=".pdf,.png" type="file" />
      <FieldHelperText>Choose a PDF or PNG file.</FieldHelperText>
    </Field>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <FieldLabel>Repository</FieldLabel>
      <Input
        asChild={(props) => <input {...props()} name="repository" placeholder="owner/project" />}
      />
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div class={storyStyles.stack}>
      <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
      <Input readOnly aria-label="Read-only workspace" value="Assigned workspace" />
    </div>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field class={storyStyles.field} invalid>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="name@example.com" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <FieldLabel>Project key</FieldLabel>
      <Input placeholder="MAPS" class={storyStyles.customInput} />
    </Field>
  ),
};