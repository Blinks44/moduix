import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field } from '@/components/field';
import { InputGroup } from '@/components/input-group/InputGroup';

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
      <Field.Label>Workspace</Field.Label>
      <InputGroup>
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input placeholder="maps" />
      </InputGroup>
    </Field>
  ),
};

export const WithAction: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Field className="w-full max-w-96">
        <Field.Label>Invite by email</Field.Label>
        <InputGroup>
          <InputGroup.Input
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            type="email"
            placeholder="name@example.com"
          />
          <InputGroup.Button disabled={!value}>Send</InputGroup.Button>
        </InputGroup>
      </Field>
    );
  },
};

export const PrefixSuffix: Story = {
  render: () => (
    <Field className="w-full max-w-96">
      <Field.Label>Monthly budget</Field.Label>
      <InputGroup>
        <InputGroup.Addon className="font-medium text-foreground">$</InputGroup.Addon>
        <InputGroup.Input inputMode="decimal" placeholder="2500" />
        <InputGroup.Text>USD</InputGroup.Text>
      </InputGroup>
    </Field>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Field className="w-full max-w-96">
      <Field.Label>Workspace</Field.Label>
      <InputGroup asChild>
        <div>
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input placeholder="maps" />
        </div>
      </InputGroup>
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-full max-w-96 gap-3">
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
    <Field className="w-full max-w-96" disabled>
      <Field.Label>Workspace handle</Field.Label>
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
    <Field className="w-full max-w-96" readOnly>
      <Field.Label>Workspace handle</Field.Label>
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
    <Field className="w-full max-w-96" invalid>
      <Field.Label>Domain</Field.Label>
      <InputGroup>
        <InputGroup.Input placeholder="company" />
        <InputGroup.Text>.test.com</InputGroup.Text>
      </InputGroup>
      <Field.ErrorText>Please enter a domain.</Field.ErrorText>
    </Field>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <InputGroup className="rounded-lg border-primary/35 bg-background focus-within:outline-primary/50">
      <InputGroup.Addon className="bg-primary/14 font-semibold text-primary">@</InputGroup.Addon>
      <InputGroup.Input placeholder="custom-group" />
      <InputGroup.Button className="m-1 rounded-sm border border-primary/28 bg-primary/10 px-2 text-primary hover:bg-primary/18">
        Check
      </InputGroup.Button>
    </InputGroup>
  ),
};