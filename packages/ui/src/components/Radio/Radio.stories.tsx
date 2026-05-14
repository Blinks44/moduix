import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Field, FieldItem, FieldLabel } from '../Field';
import { Fieldset, FieldsetLegend } from '../Fieldset';
import {
  Radio,
  RadioField,
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel,
  RadioGroupLabel,
  RadioGroupList,
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
];

function CustomRadioIcon(props: React.ComponentProps<'svg'>) {
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
    const labelId = React.useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="team">
        <RadioGroupLabel id={labelId}>Account Type</RadioGroupLabel>
        <RadioGroupList>
          {options.map((option) => (
            <RadioGroupItem key={option.value}>
              <RadioGroupItemControl value={option.value} />
              <RadioGroupItemLabel>{option.label}</RadioGroupItemLabel>
            </RadioGroupItem>
          ))}
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const labelId = React.useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="md">
        <RadioGroupLabel id={labelId}>Control Size</RadioGroupLabel>
        <RadioGroupList>
          <RadioGroupItem>
            <RadioGroupItemControl value="xs" size="xs" />
            <RadioGroupItemLabel>Extra-small</RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem>
            <RadioGroupItemControl value="sm" size="sm" />
            <RadioGroupItemLabel>Small</RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem>
            <RadioGroupItemControl value="md" size="md" />
            <RadioGroupItemLabel>Medium</RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem>
            <RadioGroupItemControl value="lg" size="lg" />
            <RadioGroupItemLabel>Large</RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem>
            <RadioGroupItemControl value="xl" size="xl" />
            <RadioGroupItemLabel>Extra-large</RadioGroupItemLabel>
          </RadioGroupItem>
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const labelId = React.useId();
    const [value, setValue] = React.useState('personal');

    return (
      <div className={styles.stack}>
        <RadioGroup aria-labelledby={labelId} value={value} onValueChange={setValue}>
          <RadioGroupLabel id={labelId}>Workspace Visibility</RadioGroupLabel>
          <RadioGroupList>
            <RadioGroupItem>
              <RadioGroupItemControl value="personal" />
              <RadioGroupItemLabel>Only me</RadioGroupItemLabel>
            </RadioGroupItem>
            <RadioGroupItem>
              <RadioGroupItemControl value="team" />
              <RadioGroupItemLabel>Team</RadioGroupItemLabel>
            </RadioGroupItem>
          </RadioGroupList>
        </RadioGroup>
        <span className={styles.hint}>Current value: {value}</span>
      </div>
    );
  },
};

export const CustomIndicator: Story = {
  render: () => {
    const labelId = React.useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="team">
        <RadioGroupLabel id={labelId}>Account Type</RadioGroupLabel>
        <RadioGroupList>
          {options.map((option) => (
            <RadioGroupItem key={option.value}>
              <RadioGroupItemControl
                value={option.value}
                indicator={<CustomRadioIcon className={styles.customIndicator} />}
              />
              <RadioGroupItemLabel>{option.label}</RadioGroupItemLabel>
            </RadioGroupItem>
          ))}
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const labelId = React.useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="enterprise" disabled>
        <RadioGroupLabel id={labelId}>Plan</RadioGroupLabel>
        <RadioGroupList>
          {options.map((option) => (
            <RadioGroupItem key={option.value}>
              <RadioGroupItemControl value={option.value} />
              <RadioGroupItemLabel>{option.label}</RadioGroupItemLabel>
            </RadioGroupItem>
          ))}
        </RadioGroupList>
      </RadioGroup>
    );
  },
};

export const FieldComposition: Story = {
  render: () => {
    const labelId = React.useId();

    return (
      <RadioGroup aria-labelledby={labelId} defaultValue="personal">
        <RadioGroupLabel id={labelId}>Members</RadioGroupLabel>
        <div className={styles.stack}>
          {options.map((option) => (
            <RadioField key={option.value}>
              <Radio value={option.value} />
              <RadioLabel>{option.label}</RadioLabel>
            </RadioField>
          ))}
        </div>
      </RadioGroup>
    );
  },
};

export const SiblingLabelNativeButton: Story = {
  name: 'Sibling Label (Native Button)',
  render: () => {
    const id = React.useId();
    const labelId = React.useId();

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

export const NativeButtonRenderCallback: Story = {
  name: 'Native Button (Render Callback)',
  render: () => {
    const labelId = React.useId();

    return (
      <RadioGroup defaultValue="ssd" aria-labelledby={labelId}>
        <div id={labelId} className={styles.hint}>
          Storage type
        </div>
        <Radio
          value="ssd"
          nativeButton
          render={(buttonProps) => (
            <label className={styles.siblingRow}>
              <button {...buttonProps} />
              <span className={styles.siblingLabel}>SSD</span>
            </label>
          )}
        />
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