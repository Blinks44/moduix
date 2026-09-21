import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldErrorText, FieldLabel } from '@/components/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/input-group/InputGroup';

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
    <Field className="w-full max-w-96">
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
    const [value, setValue] = useState('');

    return (
      <Field className="w-full max-w-96">
        <FieldLabel>Invite by email</FieldLabel>
        <InputGroup>
          <InputGroupInput
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            type="email"
            placeholder="name@example.com"
          />
          <InputGroupButton disabled={!value}>Send</InputGroupButton>
        </InputGroup>
      </Field>
    );
  },
};

export const PrefixSuffix: Story = {
  render: () => (
    <Field className="w-full max-w-96">
      <FieldLabel>Monthly budget</FieldLabel>
      <InputGroup>
        <InputGroupAddon className="font-medium text-foreground">$</InputGroupAddon>
        <InputGroupInput inputMode="decimal" placeholder="2500" />
        <InputGroupText>USD</InputGroupText>
      </InputGroup>
    </Field>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Field className="w-full max-w-96">
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup asChild>
        <div>
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="maps" />
        </div>
      </InputGroup>
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-full max-w-96 gap-3">
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
    <Field className="w-full max-w-96" disabled>
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
    <Field className="w-full max-w-96" readOnly>
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
    <Field className="w-full max-w-96" invalid>
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
    <InputGroup className="rounded-lg border-primary/35 bg-background focus-within:outline-primary/50">
      <InputGroupAddon className="bg-primary/14 font-semibold text-primary">@</InputGroupAddon>
      <InputGroupInput placeholder="custom-group" />
      <InputGroupButton className="m-1 rounded-sm border border-primary/28 bg-primary/10 px-2 text-primary hover:bg-primary/18">
        Check
      </InputGroupButton>
    </InputGroup>
  ),
};
