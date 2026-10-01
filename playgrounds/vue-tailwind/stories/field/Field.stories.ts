import { CheckboxHiddenInput } from '@ark-ui/vue/checkbox';
import {
  RadioGroupItem as ArkRadioGroupItem,
  RadioGroupItemControl as ArkRadioGroupItemControl,
  RadioGroupItemHiddenInput as ArkRadioGroupItemHiddenInput,
  RadioGroupItemText as ArkRadioGroupItemText,
  RadioGroupRoot as ArkRadioGroup,
} from '@ark-ui/vue/radio-group';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Checkbox, CheckboxControl, CheckboxIndicator, CheckboxLabel } from '@/components/checkbox';
import {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldTextarea,
  useField,
} from '@/components/field';
import { Input } from '@/components/input';
import { NativeSelect } from '@/components/native-select';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputParity: Story = {
  render: renderStory(`
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; width: 36rem">
      <Field ><FieldLabel>FieldInput Default</FieldLabel><FieldInput placeholder="Enter your name" /></Field>
      <Field ><FieldLabel>Input Default</FieldLabel><Input placeholder="Enter your name" /></Field>
      <Field invalid><FieldLabel>FieldInput Invalid</FieldLabel><FieldInput placeholder="name@example.com" /></Field>
      <Field invalid><FieldLabel>Input Invalid</FieldLabel><Input placeholder="name@example.com" /></Field>
      <Field read-only><FieldLabel>FieldInput Read-only</FieldLabel><FieldInput placeholder="Workspace key" /></Field>
      <Field read-only><FieldLabel>Input Read-only</FieldLabel><Input placeholder="Workspace key" /></Field>
      <Field disabled><FieldLabel>FieldInput Disabled</FieldLabel><FieldInput placeholder="Acme Inc." /></Field>
      <Field disabled><FieldLabel>Input Disabled</FieldLabel><Input placeholder="Acme Inc." /></Field>
      <Field ><FieldLabel>FieldInput File</FieldLabel><FieldInput type="file" /></Field>
      <Field ><FieldLabel>Input File</FieldLabel><Input type="file" /></Field>
      <FieldInput aria-label="FieldInput standalone disabled" disabled placeholder="Standalone disabled" />
      <Input aria-label="Input standalone disabled" disabled placeholder="Standalone disabled" />
    </div>
  `),
};

const storyComponents = {
  ArkRadioGroup,
  ArkRadioGroupItem,
  ArkRadioGroupItemControl,
  ArkRadioGroupItemHiddenInput,
  ArkRadioGroupItemText,
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldInput: FieldInput as Component,
  Input,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldTextarea,
  NativeSelect,
} as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Field required>
      <FieldLabel>Name <FieldRequiredIndicator /></FieldLabel>
      <FieldInput placeholder="Enter your name" />
      <FieldHelperText>Visible on your public profile.</FieldHelperText>
    </Field>
  `),
};

export const Invalid: Story = {
  render: renderStory(`
    <Field invalid required>
      <FieldLabel>Email</FieldLabel>
      <FieldInput type="email" placeholder="name@example.com" />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  `),
};

export const ControlledInvalid: Story = {
  render: renderStory(
    `
      <Field :invalid="value.length > 0 && value.length < 3">
        <FieldLabel>Username</FieldLabel>
        <FieldInput v-model="value" placeholder="e.g. vinny" />
        <FieldHelperText>Use at least 3 characters.</FieldHelperText>
        <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
      </Field>
    `,
    () => ({ value: ref('') }),
  ),
};

export const Textarea: Story = {
  render: renderStory(`
    <Field>
      <FieldLabel>Summary</FieldLabel>
      <FieldTextarea placeholder="Describe the request" autoresize />
      <FieldHelperText>The textarea can autoresize as the user types.</FieldHelperText>
    </Field>
  `),
};

export const Select: Story = {
  render: renderStory(`
    <Field required>
      <FieldLabel>Priority</FieldLabel>
      <NativeSelect name="priority" default-value="">
        <option value="" disabled>Select priority</option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </NativeSelect>
    </Field>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <Field disabled>
      <FieldLabel>Organization</FieldLabel>
      <FieldInput placeholder="Acme Inc." />
    </Field>
  `),
};

export const ReadOnly: Story = {
  render: renderStory(`
    <Field read-only>
      <FieldLabel>Workspace key</FieldLabel>
      <FieldInput default-value="MAPS" />
    </Field>
  `),
};

export const WithCheckbox: Story = {
  render: renderStory(`
    <Field required>
      <Checkbox name="support-access" value="enabled">
        <CheckboxControl><CheckboxIndicator /></CheckboxControl>
        <CheckboxLabel>Accept support access</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <FieldErrorText>Support access must be enabled.</FieldErrorText>
    </Field>
  `),
};

export const WithRadioGroup: Story = {
  render: renderStory(`
    <Field>
      <FieldLabel>Account type</FieldLabel>
      <ArkRadioGroup default-value="team" aria-label="Account type">
        <ArkRadioGroupItem value="personal">
          <ArkRadioGroupItemControl />
          <ArkRadioGroupItemText>Personal account</ArkRadioGroupItemText>
          <ArkRadioGroupItemHiddenInput />
        </ArkRadioGroupItem>
        <ArkRadioGroupItem value="team">
          <ArkRadioGroupItemControl />
          <ArkRadioGroupItemText>Team account</ArkRadioGroupItemText>
          <ArkRadioGroupItemHiddenInput />
        </ArkRadioGroupItem>
      </ArkRadioGroup>
    </Field>
  `),
};

export const LongContent: Story = {
  render: renderStory(`
    <Field invalid>
      <FieldLabel>International tax residency and withholding election for non-resident account holders</FieldLabel>
      <FieldInput />
      <FieldHelperText>Enter the tax identification number issued by your country of tax residence.</FieldHelperText>
      <FieldErrorText>A tax identification number is required before you can continue.</FieldErrorText>
    </Field>
  `),
};

export const ItemTarget: Story = {
  render: renderStory(`
    <Field target="amount">
      <FieldLabel>Amount</FieldLabel>
      <FieldItem value="currency">
        <NativeSelect aria-label="Currency" default-value="USD">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </NativeSelect>
      </FieldItem>
      <FieldItem value="amount"><FieldInput input-mode="decimal" placeholder="0.00" /></FieldItem>
    </Field>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <FieldRootProvider :value="field">
        <FieldLabel>External state <FieldRequiredIndicator /></FieldLabel>
        <FieldInput placeholder="Controlled by useField" />
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </FieldRootProvider>
    `,
    () => ({ field: useField({ id: 'root-provider-field', invalid: true, required: true }) }),
  ),
};