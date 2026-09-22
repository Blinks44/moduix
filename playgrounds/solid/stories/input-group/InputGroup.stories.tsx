import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldLabel } from '@/components/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/input-group/InputGroup';
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
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="maps" />
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
          <InputGroupInput
            value={value()}
            onInput={(event) => setValue(event.currentTarget.value)}
            type="email"
            placeholder="name@example.com"
          />
          <InputGroupButton disabled={!value()}>Send</InputGroupButton>
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
        <InputGroupAddon class={storyStyles.currency}>$</InputGroupAddon>
        <InputGroupInput inputMode="decimal" placeholder="2500" />
        <InputGroupText>USD</InputGroupText>
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
            <InputGroupAddon>@</InputGroupAddon>
            <InputGroupInput placeholder="maps" />
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
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Extra-small group" />
      </InputGroup>
      <InputGroup size="sm">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Small group" />
      </InputGroup>
      <InputGroup size="md">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Medium group" />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Large group" />
      </InputGroup>
      <InputGroup size="xl">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Extra-large group" />
      </InputGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field class={storyStyles.field} disabled>
      <FieldLabel>Workspace handle</FieldLabel>
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput value="maps" />
        <InputGroupButton disabled>Copy</InputGroupButton>
      </InputGroup>
    </Field>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Field class={storyStyles.field} readOnly>
      <FieldLabel>Workspace handle</FieldLabel>
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput value="maps" />
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroup>
    </Field>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field class={storyStyles.field} invalid>
      <FieldLabel>Domain</FieldLabel>
      <InputGroup>
        <InputGroupInput placeholder="company" />
        <InputGroupText>.test.com</InputGroupText>
      </InputGroup>
      <FieldErrorText>Please enter a domain.</FieldErrorText>
    </Field>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <InputGroup class={storyStyles.customGroup}>
      <InputGroupAddon class={storyStyles.customAddon}>@</InputGroupAddon>
      <InputGroupInput placeholder="custom-group" />
      <InputGroupButton class={storyStyles.customButton}>Check</InputGroupButton>
    </InputGroup>
  ),
};