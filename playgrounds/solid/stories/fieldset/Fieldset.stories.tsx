import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
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
} from '@/components/fieldset/Fieldset';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from '@/components/radio-group';
import styles from './Fieldset.stories.module.css';

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
      <RadioGroup defaultValue="ssd">
        {['ssd', 'hdd'].map((value) => (
          <RadioGroupItem value={value}>
            <RadioGroupItemControl />
            <RadioGroupItemText>{value.toUpperCase()}</RadioGroupItemText>
            <RadioGroupItemHiddenInput />
          </RadioGroupItem>
        ))}
      </RadioGroup>
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
    <Fieldset class={styles.customFieldset}>
      <FieldsetLegend class={styles.customLegend}>Styled fieldset</FieldsetLegend>
      <Field class={styles.customField}>
        <FieldLabel class={styles.customLabel}>Project name</FieldLabel>
        <FieldInput placeholder="Maps Platform" class={styles.customControl} />
      </Field>
      <FieldsetHelperText class={styles.customHelper}>
        Visible to project members.
      </FieldsetHelperText>
    </Fieldset>
  ),
};
