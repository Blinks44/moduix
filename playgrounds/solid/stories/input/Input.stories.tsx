import { Field } from '@ark-ui/solid/field';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
    <Field.Root class={storyStyles.field}>
      <Field.Label>Name</Field.Label>
      <Field.HelperText>Used in your public workspace profile.</Field.HelperText>
      <Input placeholder="Enter your name" />
    </Field.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('');

    return (
      <Field.Root class={storyStyles.field}>
        <Field.Label>Username</Field.Label>
        <Input
          value={value()}
          onChange={(event) => setValue(event.currentTarget.value)}
          placeholder="Type to control value"
        />
      </Field.Root>
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
    <Field.Root class={storyStyles.field}>
      <Field.Label>Security code</Field.Label>
      <Input
        htmlSize={8}
        inputMode="numeric"
        maxLength={6}
        name="security-code"
        placeholder="000000"
        type="text"
        autocomplete="one-time-code"
      />
    </Field.Root>
  ),
};

export const File: Story = {
  render: () => (
    <Field.Root class={storyStyles.field}>
      <Field.Label>Attachment</Field.Label>
      <Input accept=".pdf,.png" type="file" />
      <Field.HelperText>Choose a PDF or PNG file.</Field.HelperText>
    </Field.Root>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Field.Root class={storyStyles.field}>
      <Field.Label>Repository</Field.Label>
      <Input
        asChild={(props) => <input {...props()} name="repository" placeholder="owner/project" />}
      />
    </Field.Root>
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
    <Field.Root class={storyStyles.field} invalid>
      <Field.Label>Email</Field.Label>
      <Input type="email" placeholder="name@example.com" />
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field.Root>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Field.Root class={storyStyles.field}>
      <Field.Label>Project key</Field.Label>
      <Input placeholder="MAPS" class={storyStyles.customInput} />
    </Field.Root>
  ),
};