import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, FieldControl, FieldError, FieldItem, FieldLabel } from '../field';
import { Radio, RadioGroup, RadioLabel } from '../radio';
import { Fieldset, FieldsetLegend } from './Fieldset';
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
  render: () => {
    return (
      <Fieldset>
        <FieldsetLegend>Billing details</FieldsetLegend>

        <Field validationMode="onBlur">
          <FieldLabel>Company</FieldLabel>
          <FieldControl required placeholder="Enter company name" />
          <FieldError match="valueMissing">Please enter company name.</FieldError>
        </Field>

        <Field validationMode="onBlur">
          <FieldLabel>Tax ID</FieldLabel>
          <FieldControl required placeholder="Enter tax ID" />
          <FieldError match="valueMissing">Please enter tax ID.</FieldError>
        </Field>
      </Fieldset>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Fieldset disabled>
        <FieldsetLegend>Disabled account details</FieldsetLegend>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldControl defaultValue="team@example.com" />
        </Field>

        <Field>
          <FieldLabel>Phone</FieldLabel>
          <FieldControl defaultValue="+1 (555) 123-45-67" />
        </Field>
      </Fieldset>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    return (
      <Field name="storageType">
        <Fieldset render={<RadioGroup defaultValue="ssd" />}>
          <FieldsetLegend>Storage type</FieldsetLegend>

          <FieldItem>
            <FieldLabel>
              <Radio value="ssd" />
              <RadioLabel>SSD</RadioLabel>
            </FieldLabel>
          </FieldItem>

          <FieldItem>
            <FieldLabel>
              <Radio value="hdd" />
              <RadioLabel>HDD</RadioLabel>
            </FieldLabel>
          </FieldItem>
        </Fieldset>
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Fieldset className={styles.customFieldset}>
        <FieldsetLegend className={styles.customLegend}>Styled fieldset</FieldsetLegend>

        <Field validationMode="onBlur" className={styles.customField}>
          <FieldLabel className={styles.customLabel}>Project name</FieldLabel>
          <FieldControl required placeholder="Maps Platform" className={styles.customControl} />
          <FieldError className={styles.customError} match="valueMissing">
            Please enter a project name.
          </FieldError>
        </Field>
      </Fieldset>
    );
  },
};