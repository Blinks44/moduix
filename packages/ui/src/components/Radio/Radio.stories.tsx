import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState, type ComponentProps } from 'react';
import { Field, FieldItem, FieldLabel } from '../Field';
import { Fieldset, FieldsetLegend } from '../Fieldset';
import {
  Radio,
  RadioField,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupList,
  RadioIndicator,
  RadioLabel,
} from './Radio';
import styles from './Radio.stories.module.css';

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { value: 'personal', label: 'Personal account' },
  { value: 'team', label: 'Team account' },
  { value: 'enterprise', label: 'Enterprise account' },
] as const;

function CustomRadioIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 1.5L10.5 6L6 10.5L1.5 6L6 1.5Z" fill="currentColor" />
    </svg>
  );
}

export const Basic: Story = {
  render: () => {
    const labelId = useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="team">
        <RadioGroupLabel id={labelId}>Account Type</RadioGroupLabel>
        <RadioGroupList>
          {options.map((option) => (
            <RadioField key={option.value}>
              <Radio value={option.value} />
              <RadioLabel>{option.label}</RadioLabel>
            </RadioField>
          ))}
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const labelId = useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="md">
        <RadioGroupLabel id={labelId}>Control Size</RadioGroupLabel>
        <RadioGroupList>
          <RadioField>
            <Radio value="xs" size="xs" />
            <RadioLabel>Extra-small</RadioLabel>
          </RadioField>
          <RadioField>
            <Radio value="sm" size="sm" />
            <RadioLabel>Small</RadioLabel>
          </RadioField>
          <RadioField>
            <Radio value="md" size="md" />
            <RadioLabel>Medium</RadioLabel>
          </RadioField>
          <RadioField>
            <Radio value="lg" size="lg" />
            <RadioLabel>Large</RadioLabel>
          </RadioField>
          <RadioField>
            <Radio value="xl" size="xl" />
            <RadioLabel>Extra-large</RadioLabel>
          </RadioField>
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const labelId = useId();
    const [value, setValue] = useState('personal');

    return (
      <div className={styles.stack}>
        <RadioGroup aria-labelledby={labelId} value={value} onValueChange={setValue}>
          <RadioGroupLabel id={labelId}>Workspace Visibility</RadioGroupLabel>
          <RadioGroupList>
            <RadioField>
              <Radio value="personal" />
              <RadioLabel>Only me</RadioLabel>
            </RadioField>
            <RadioField>
              <Radio value="team" />
              <RadioLabel>Team</RadioLabel>
            </RadioField>
          </RadioGroupList>
        </RadioGroup>
        <span className={styles.hint}>Current value: {value}</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const labelId = useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="enterprise" disabled>
        <RadioGroupLabel id={labelId}>Plan</RadioGroupLabel>
        <RadioGroupList>
          {options.map((option) => (
            <RadioField key={option.value}>
              <Radio value={option.value} />
              <RadioLabel>{option.label}</RadioLabel>
            </RadioField>
          ))}
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    const labelId = useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="team" readOnly>
        <RadioGroupLabel id={labelId}>Workspace Visibility</RadioGroupLabel>
        <RadioGroupList>
          <RadioField>
            <Radio value="personal" />
            <RadioLabel>Only me</RadioLabel>
          </RadioField>
          <RadioField>
            <Radio value="team" />
            <RadioLabel>Team</RadioLabel>
          </RadioField>
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const SiblingLabelNativeButton: Story = {
  name: 'Sibling Label (Native Button)',
  render: () => {
    const id = useId();
    const labelId = useId();

    return (
      <div className={styles.siblingRow}>
        <div id={labelId} className={styles.hint}>
          Delivery method
        </div>
        <RadioGroup defaultValue="email" aria-labelledby={labelId}>
          <Radio nativeButton render={<button />} id={id} value="email" />
        </RadioGroup>
        <label htmlFor={id} className={styles.siblingLabel}>
          Email
        </label>
      </div>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    const labelId = useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="team" className={styles.customGroup}>
        <RadioGroupLabel id={labelId} className={styles.customLabel}>
          Styled Account Type
        </RadioGroupLabel>
        <RadioGroupList className={styles.customList}>
          {options.map((option) => (
            <RadioField key={option.value} className={styles.customField}>
              <Radio value={option.value} className={styles.customRadio} />
              <RadioLabel className={styles.customLabel}>{option.label}</RadioLabel>
            </RadioField>
          ))}
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    const labelId = useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="team">
        <RadioGroupLabel id={labelId}>Account Type</RadioGroupLabel>
        <RadioGroupList>
          {options.map((option) => (
            <RadioField key={option.value}>
              <Radio value={option.value}>
                <RadioIndicator>
                  <CustomRadioIcon className={styles.customIndicator} />
                </RadioIndicator>
              </Radio>
              <RadioLabel>{option.label}</RadioLabel>
            </RadioField>
          ))}
        </RadioGroupList>
      </RadioGroup>
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