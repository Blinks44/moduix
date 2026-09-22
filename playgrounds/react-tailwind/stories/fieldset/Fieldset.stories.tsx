import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/checkbox/Checkbox';
import { Field, FieldInput, FieldLabel } from '@/components/field/Field';
import {
  Fieldset,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
} from '@/components/fieldset/Fieldset';

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

const optionClassName = 'flex items-center gap-2 text-sm text-foreground';

export const Default: Story = {
  render: () => (
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
  ),
};

export const Invalid: Story = {
  render: () => (
    <Fieldset invalid>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <FieldInput type="email" defaultValue="invalid-address" />
      </Field>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </Fieldset>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Fieldset disabled>
      <FieldsetLegend>Disabled account details</FieldsetLegend>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldInput defaultValue="team@example.com" />
      </Field>
      <Field>
        <FieldLabel>Phone</FieldLabel>
        <FieldInput defaultValue="+1 (555) 123-45-67" />
      </Field>
    </Fieldset>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Email preferences</FieldsetLegend>
      <Checkbox defaultChecked>
        <CheckboxControl>
          <CheckboxIndicator />
        </CheckboxControl>
        <CheckboxLabel>Product updates</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <Checkbox>
        <CheckboxControl>
          <CheckboxIndicator />
        </CheckboxControl>
        <CheckboxLabel>Marketing emails</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </Fieldset>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Storage type</FieldsetLegend>
      {['ssd', 'hdd'].map((value) => (
        <label className={optionClassName} key={value}>
          <input defaultChecked={value === 'ssd'} name="storage-type" type="radio" />
          {value.toUpperCase()}
        </label>
      ))}
      <FieldsetHelperText>Choose the primary storage medium.</FieldsetHelperText>
    </Fieldset>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Fieldset invalid>
      <FieldsetLegend>
        International tax residency and withholding election for non-resident account holders
      </FieldsetLegend>
      <Field invalid>
        <FieldLabel>Tax identification number</FieldLabel>
        <FieldInput />
      </Field>
      <FieldsetHelperText>
        Enter the tax identification number issued by your country of tax residence.
      </FieldsetHelperText>
      <FieldsetErrorText>
        A tax identification number is required before you can continue.
      </FieldsetErrorText>
    </Fieldset>
  ),
};

function RootProviderDemo() {
  const fieldset = useFieldset({ invalid: true });

  return (
    <FieldsetRootProvider value={fieldset}>
      <FieldsetLegend>External state</FieldsetLegend>
      <Field invalid>
        <FieldLabel>Project name</FieldLabel>
        <FieldInput defaultValue="" />
      </Field>
      <FieldsetErrorText>A project name is required.</FieldsetErrorText>
    </FieldsetRootProvider>
  );
}

export const RootProvider: Story = {
  render: () => <RootProviderDemo />,
};

export const CustomStyles: Story = {
  render: () => (
    <Fieldset className="max-w-64 gap-3 rounded-lg border border-primary/30 p-4">
      <FieldsetLegend className="ms-2 px-2 text-primary">Styled fieldset</FieldsetLegend>
      <Field className="gap-2">
        <FieldLabel className="text-primary">Project name</FieldLabel>
        <FieldInput
          className="border-primary/40 focus-visible:outline-primary"
          placeholder="Maps Platform"
        />
      </Field>
      <FieldsetHelperText className="text-primary">Visible to project members.</FieldsetHelperText>
    </Fieldset>
  ),
};