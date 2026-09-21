import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/checkbox/Checkbox';
import { Field } from '@/components/field/Field';
import { Fieldset, useFieldset } from '@/components/fieldset/Fieldset';

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
      <Fieldset.Legend>Billing details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Company</Field.Label>
        <Field.Input placeholder="Enter company name" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Tax ID</Field.Label>
        <Field.Input placeholder="Enter tax ID" />
      </Field.Root>
      <Fieldset.HelperText>Use the legal details shown on your invoice.</Fieldset.HelperText>
    </Fieldset>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Fieldset invalid>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" defaultValue="invalid-address" />
      </Field.Root>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Fieldset disabled>
      <Fieldset.Legend>Disabled account details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Input defaultValue="team@example.com" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Phone</Field.Label>
        <Field.Input defaultValue="+1 (555) 123-45-67" />
      </Field.Root>
    </Fieldset>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Email preferences</Fieldset.Legend>
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
      <Fieldset.Legend>Storage type</Fieldset.Legend>
      {['ssd', 'hdd'].map((value) => (
        <label className={optionClassName} key={value}>
          <input defaultChecked={value === 'ssd'} name="storage-type" type="radio" />
          {value.toUpperCase()}
        </label>
      ))}
      <Fieldset.HelperText>Choose the primary storage medium.</Fieldset.HelperText>
    </Fieldset>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Fieldset invalid>
      <Fieldset.Legend>
        International tax residency and withholding election for non-resident account holders
      </Fieldset.Legend>
      <Field.Root invalid>
        <Field.Label>Tax identification number</Field.Label>
        <Field.Input />
      </Field.Root>
      <Fieldset.HelperText>
        Enter the tax identification number issued by your country of tax residence.
      </Fieldset.HelperText>
      <Fieldset.ErrorText>
        A tax identification number is required before you can continue.
      </Fieldset.ErrorText>
    </Fieldset>
  ),
};

function RootProviderDemo() {
  const fieldset = useFieldset({ invalid: true });

  return (
    <Fieldset.RootProvider value={fieldset}>
      <Fieldset.Legend>External state</Fieldset.Legend>
      <Field.Root invalid>
        <Field.Label>Project name</Field.Label>
        <Field.Input defaultValue="" />
      </Field.Root>
      <Fieldset.ErrorText>A project name is required.</Fieldset.ErrorText>
    </Fieldset.RootProvider>
  );
}

export const RootProvider: Story = {
  render: () => <RootProviderDemo />,
};

export const CustomStyles: Story = {
  render: () => (
    <Fieldset className="max-w-64 gap-3 rounded-lg border border-primary/30 p-4">
      <Fieldset.Legend className="ms-2 px-2 text-primary">Styled fieldset</Fieldset.Legend>
      <Field.Root className="gap-2">
        <Field.Label className="text-primary">Project name</Field.Label>
        <Field.Input
          className="border-primary/40 focus-visible:outline-primary"
          placeholder="Maps Platform"
        />
      </Field.Root>
      <Fieldset.HelperText className="text-primary">
        Visible to project members.
      </Fieldset.HelperText>
    </Fieldset>
  ),
};