import {
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupItem as ArkRadioGroupItem,
  RadioGroupRoot as ArkRadioGroup,
} from '@ark-ui/vue/radio-group';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@/components/checkbox';
import { Field, FieldInput, FieldLabel } from '@/components/field';
import {
  Fieldset,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
} from '@/components/fieldset';

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

const fieldsetComponents = {
  ArkRadioGroup,
  ArkRadioGroupItem,
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
  Field,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: fieldsetComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    });
}

export const Default: Story = {
  render: renderStory(`
    <Fieldset>
      <FieldsetLegend>Billing details</FieldsetLegend>
      <Field>
        <FieldLabel>Company</FieldLabel>
        <FieldInput placeholder="Enter company name" />
      </Field>
      <Field>
        <FieldLabel>Tax ID</FieldLabel>
        <FieldInput placeholder="Enter tax ID" />
      </Field>
      <FieldsetHelperText>Use the legal details shown on your invoice.</FieldsetHelperText>
    </Fieldset>
  `),
};

export const Invalid: Story = {
  render: renderStory(`
    <Fieldset invalid>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <FieldInput type="email" value="invalid-address" />
      </Field>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </Fieldset>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <Fieldset disabled>
      <FieldsetLegend>Disabled account details</FieldsetLegend>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldInput value="team@example.com" />
      </Field>
      <Field>
        <FieldLabel>Phone</FieldLabel>
        <FieldInput value="+1 (555) 123-45-67" />
      </Field>
    </Fieldset>
  `),
};

export const WithCheckbox: Story = {
  render: renderStory(`
    <Fieldset>
      <FieldsetLegend>Email preferences</FieldsetLegend>
      <Checkbox :default-checked="true">
        <CheckboxControl />
        <CheckboxLabel>Product updates</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <Checkbox>
        <CheckboxControl />
        <CheckboxLabel>Marketing emails</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </Fieldset>
  `),
};

export const WithRadioGroup: Story = {
  render: renderStory(`
    <Fieldset>
      <FieldsetLegend>Storage type</FieldsetLegend>
      <ArkRadioGroup default-value="ssd">
        <ArkRadioGroupItem v-for="value in ['ssd', 'hdd']" :key="value" :value="value">
          <RadioGroupItemControl />
          <RadioGroupItemText>{{ value.toUpperCase() }}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </ArkRadioGroupItem>
      </ArkRadioGroup>
      <FieldsetHelperText>Choose the primary storage medium.</FieldsetHelperText>
    </Fieldset>
  `),
};

export const LongContent: Story = {
  render: renderStory(`
    <Fieldset invalid>
      <FieldsetLegend>
        International tax residency and withholding election for non-resident account holders
      </FieldsetLegend>
      <Field invalid>
        <FieldLabel>Tax identification number</FieldLabel>
        <FieldInput />
      </Field>
      <FieldsetHelperText>Enter the tax identification number issued by your country of tax residence.</FieldsetHelperText>
      <FieldsetErrorText>A tax identification number is required before you can continue.</FieldsetErrorText>
    </Fieldset>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <FieldsetRootProvider :value="fieldset">
        <FieldsetLegend>External state</FieldsetLegend>
        <Field invalid>
          <FieldLabel>Project name</FieldLabel>
          <FieldInput value="" />
        </Field>
        <FieldsetErrorText>A project name is required.</FieldsetErrorText>
      </FieldsetRootProvider>
    `,
    () => ({ fieldset: useFieldset({ invalid: true }) }),
  ),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <Fieldset class="max-w-64 gap-3 rounded-lg border border-primary/30 p-4">
      <FieldsetLegend class="ms-2 px-2 text-primary">Styled fieldset</FieldsetLegend>
      <Field class="gap-2">
        <FieldLabel class="text-primary">Project name</FieldLabel>
        <FieldInput class="border-primary/40 focus-visible:outline-primary" placeholder="Maps Platform" />
      </Field>
      <FieldsetHelperText class="text-primary">Visible to project members.</FieldsetHelperText>
    </Fieldset>
  `),
};