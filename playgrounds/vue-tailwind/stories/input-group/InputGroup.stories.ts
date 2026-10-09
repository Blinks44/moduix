import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Field, FieldErrorText, FieldLabel } from '@/components/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupClearTrigger,
  InputGroupInput,
  InputGroupText,
} from '@/components/input-group';

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

const storyComponents = {
  Field,
  FieldErrorText,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupClearTrigger,
  InputGroupInput,
  InputGroupText,
} as unknown as Record<string, Component>;

const fieldClass = 'w-full max-w-96';
const stackClass = 'grid w-full max-w-96 gap-3';

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { fieldClass, stackClass, ...setup?.() };
      },
      template,
    });
}

export const Default: Story = {
  render: renderStory(`
    <Field :class="fieldClass">
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="maps" />
      </InputGroup>
    </Field>
  `),
};

export const WithAction: Story = {
  render: renderStory(
    `
      <Field :class="fieldClass">
        <FieldLabel>Invite by email</FieldLabel>
        <InputGroup>
          <InputGroupInput v-model="value" type="email" placeholder="name@example.com" />
          <InputGroupButton :disabled="!value">Send</InputGroupButton>
        </InputGroup>
      </Field>
    `,
    () => ({ value: ref('') }),
  ),
};

export const PrefixSuffix: Story = {
  render: renderStory(`
    <Field :class="fieldClass">
      <FieldLabel>Monthly budget</FieldLabel>
      <InputGroup>
        <InputGroupAddon class="font-medium text-foreground">$</InputGroupAddon>
        <InputGroupInput inputmode="decimal" placeholder="2500" />
        <InputGroupText>USD</InputGroupText>
      </InputGroup>
    </Field>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <Field :class="fieldClass">
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup as-child>
        <div>
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="maps" />
        </div>
      </InputGroup>
    </Field>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <InputGroup size="xs"><InputGroupAddon>@</InputGroupAddon><InputGroupInput placeholder="Extra-small group" /></InputGroup>
      <InputGroup size="sm"><InputGroupAddon>@</InputGroupAddon><InputGroupInput placeholder="Small group" /></InputGroup>
      <InputGroup size="md"><InputGroupAddon>@</InputGroupAddon><InputGroupInput placeholder="Medium group" /></InputGroup>
      <InputGroup size="lg"><InputGroupAddon>@</InputGroupAddon><InputGroupInput placeholder="Large group" /></InputGroup>
      <InputGroup size="xl"><InputGroupAddon>@</InputGroupAddon><InputGroupInput placeholder="Extra-large group" /></InputGroup>
    </div>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <Field :class="fieldClass" disabled>
      <FieldLabel>Workspace handle</FieldLabel>
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput value="maps" />
        <InputGroupButton disabled>Copy</InputGroupButton>
      </InputGroup>
    </Field>
  `),
};

export const ReadOnly: Story = {
  render: renderStory(`
    <Field :class="fieldClass" read-only>
      <FieldLabel>Workspace handle</FieldLabel>
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput value="maps" />
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroup>
    </Field>
  `),
};

export const WithFieldValidation: Story = {
  render: renderStory(`
    <Field :class="fieldClass" invalid>
      <FieldLabel>Domain</FieldLabel>
      <InputGroup>
        <InputGroupInput placeholder="company" />
        <InputGroupText>.test.com</InputGroupText>
      </InputGroup>
      <FieldErrorText>Please enter a domain.</FieldErrorText>
    </Field>
  `),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <InputGroup class="rounded-lg border-primary/35 bg-background focus-within:outline-primary/50">
      <InputGroupAddon class="bg-primary/14 font-semibold text-primary">@</InputGroupAddon>
      <InputGroupInput placeholder="custom-group" />
      <InputGroupButton class="m-1 rounded-sm border border-primary/28 bg-primary/10 px-2 text-primary hover:bg-primary/18">
        Check
      </InputGroupButton>
    </InputGroup>
  `),
};

export const ClearTrigger: Story = {
  render: renderStory(
    `
    <Field :class="fieldClass">
      <FieldLabel>Search</FieldLabel>
      <InputGroup>
        <InputGroupInput v-model="value" placeholder="Search…" />
        <InputGroupClearTrigger v-if="value" aria-label="Clear search"
          @click="value = ''; $el.querySelector('input').focus()" />
      </InputGroup>
    </Field>
    `,
    () => ({ value: ref('moduix') }),
  ),
};