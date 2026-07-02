import type { Meta, StoryObj } from '@storybook/react-vite';
import { useFieldset } from '@ark-ui/react/fieldset';
import { Checkbox } from '../checkbox';
import { Field } from '../field';
import { RadioGroup } from '../radio-group';
import { Fieldset } from './Fieldset';
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
      <Field.Root>
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
      <Checkbox.Root defaultChecked>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Product updates</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
      <Checkbox.Root>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Marketing emails</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Fieldset>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Storage type</Fieldset.Legend>
      <RadioGroup defaultValue="ssd">
        {['ssd', 'hdd'].map((value) => (
          <RadioGroup.Item key={value} value={value}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{value.toUpperCase()}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup>
      <Fieldset.HelperText>Choose the primary storage medium.</Fieldset.HelperText>
    </Fieldset>
  ),
};

function RootProviderDemo() {
  const fieldset = useFieldset({ invalid: true });

  return (
    <Fieldset.RootProvider value={fieldset}>
      <Fieldset.Legend>External state</Fieldset.Legend>
      <Field.Root>
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
    <Fieldset className={styles.customFieldset}>
      <Fieldset.Legend className={styles.customLegend}>Styled fieldset</Fieldset.Legend>
      <Field.Root className={styles.customField}>
        <Field.Label className={styles.customLabel}>Project name</Field.Label>
        <Field.Input placeholder="Maps Platform" className={styles.customControl} />
      </Field.Root>
      <Fieldset.HelperText className={styles.customHelper}>
        Visible to project members.
      </Fieldset.HelperText>
    </Fieldset>
  ),
};