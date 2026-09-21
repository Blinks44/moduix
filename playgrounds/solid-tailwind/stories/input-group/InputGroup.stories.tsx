import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldLabel } from '@/components/field';
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
    <Field class="w-full max-w-96">
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
      <Field class="w-full max-w-96">
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
    <Field class="w-full max-w-96">
      <FieldLabel>Monthly budget</FieldLabel>
      <InputGroup>
        <InputGroup.Addon class="font-medium text-foreground">$</InputGroup.Addon>
        <InputGroup.Input inputMode="decimal" placeholder="2500" />
        <InputGroup.Text>USD</InputGroup.Text>
      </InputGroup>
    </Field>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Field class="w-full max-w-96">
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
    <div class="grid w-full max-w-96 gap-3">
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
    <Field class="w-full max-w-96" disabled>
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
    <Field class="w-full max-w-96" readOnly>
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
    <Field class="w-full max-w-96" invalid>
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
    <InputGroup class="rounded-lg border-primary/35 bg-background focus-within:outline-primary/50">
      <InputGroup.Addon class="bg-primary/14 font-semibold text-primary">@</InputGroup.Addon>
      <InputGroup.Input placeholder="custom-group" />
      <InputGroup.Button class="m-1 rounded-sm border border-primary/28 bg-primary/10 px-2 text-primary hover:bg-primary/18">
        Check
      </InputGroup.Button>
    </InputGroup>
  ),
};
