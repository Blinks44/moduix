import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldLabel } from '@/components/field';
import { InputGroup } from '@/components/input-group/InputGroup';
import storyStyles from './InputGroup.stories.module.css';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup>
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="maps" />
      </InputGroup>
    </Field>
  ),
};

export const WithAction: Story = {
  render: () => {
    const [value, setValue] = createSignal('');

    return (
      <Field class={storyStyles.field}>
        <FieldLabel>Invite by email</FieldLabel>
        <InputGroup>
          <InputGroup.Input
            value={value()}
            onInput={(event) => setValue(event.currentTarget.value)}
            type="email"
            placeholder="name@example.com"
          />
          <InputGroup.Button disabled={!value()}>Send</InputGroup.Button>
        </InputGroup>
      </Field>
    );
  },
};

export const PrefixSuffix: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <FieldLabel>Monthly budget</FieldLabel>
      <InputGroup>
        <InputGroup.Addon class={storyStyles.currency}>$</InputGroup.Addon>
        <InputGroup.Input inputMode="decimal" placeholder="2500" />
        <InputGroup.Text>USD</InputGroup.Text>
      </InputGroup>
    </Field>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Field class={storyStyles.field}>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup
        asChild={(props) => (
          <div {...props()}>
            <InputGroup.Addon>@</InputGroup.Addon>
            <InputGroup.Input placeholder="maps" />
          </div>
        )}
      />
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={storyStyles.stack}>
      <InputGroup size="xs">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Extra-small group" />
      </InputGroup>
      <InputGroup size="sm">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Small group" />
      </InputGroup>
      <InputGroup size="md">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Medium group" />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Large group" />
      </InputGroup>
      <InputGroup size="xl">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="Extra-large group" />
      </InputGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field class={storyStyles.field} disabled>
      <FieldLabel>Workspace handle</FieldLabel>
      <InputGroup>
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input value="maps" />
        <InputGroup.Button disabled>Copy</InputGroup.Button>
      </InputGroup>
    </Field>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Field class={storyStyles.field} readOnly>
      <FieldLabel>Workspace handle</FieldLabel>
      <InputGroup>
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input value="maps" />
        <InputGroup.Button>Copy</InputGroup.Button>
      </InputGroup>
    </Field>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field class={storyStyles.field} invalid>
      <FieldLabel>Domain</FieldLabel>
      <InputGroup>
        <InputGroup.Input placeholder="company" />
        <InputGroup.Text>.test.com</InputGroup.Text>
      </InputGroup>
      <FieldErrorText>Please enter a domain.</FieldErrorText>
    </Field>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <InputGroup class={storyStyles.customGroup}>
      <InputGroup.Addon class={storyStyles.customAddon}>@</InputGroup.Addon>
      <InputGroup.Input placeholder="custom-group" />
      <InputGroup.Button class={storyStyles.customButton}>Check</InputGroup.Button>
    </InputGroup>
  ),
};
