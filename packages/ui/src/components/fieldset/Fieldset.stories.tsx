import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../field';
import { RadioGroup } from '../radio-group';
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

        <Field>
          <Field.Label>Company</Field.Label>
          <Field.Input required placeholder="Enter company name" />
          <Field.ErrorText>Please enter company name.</Field.ErrorText>
        </Field>

        <Field>
          <Field.Label>Tax ID</Field.Label>
          <Field.Input required placeholder="Enter tax ID" />
          <Field.ErrorText>Please enter tax ID.</Field.ErrorText>
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
          <Field.Label>Email</Field.Label>
          <Field.Input defaultValue="team@example.com" />
        </Field>

        <Field>
          <Field.Label>Phone</Field.Label>
          <Field.Input defaultValue="+1 (555) 123-45-67" />
        </Field>
      </Fieldset>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    return (
      <Field>
        <Fieldset render={<RadioGroup defaultValue="ssd" />}>
          <FieldsetLegend>Storage type</FieldsetLegend>

          <Field.Item value="ssd">
            <RadioGroup.Item value="ssd">
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>SSD</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          </Field.Item>

          <Field.Item value="hdd">
            <RadioGroup.Item value="hdd">
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>HDD</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          </Field.Item>
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

        <Field className={styles.customField}>
          <Field.Label className={styles.customLabel}>Project name</Field.Label>
          <Field.Input required placeholder="Maps Platform" className={styles.customControl} />
          <Field.ErrorText className={styles.customError}>
            Please enter a project name.
          </Field.ErrorText>
        </Field>
      </Fieldset>
    );
  },
};