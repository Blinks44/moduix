import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Checkbox, CheckboxField, CheckboxLabel } from './Checkbox';
import styles from './Checkbox.stories.module.css';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

function CustomPlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M5 1.5V8.5M1.5 5H8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <CheckboxField>
        <Checkbox defaultChecked />
        <CheckboxLabel>Enable notifications</CheckboxLabel>
      </CheckboxField>
    );
  },
};

export const IndicatorIcon: Story = {
  render: () => {
    return (
      <CheckboxField>
        <Checkbox defaultChecked checkedIcon={<CustomPlusIcon />} />
        <CheckboxLabel>Use custom indicator icon</CheckboxLabel>
      </CheckboxField>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <CheckboxField className={styles.customField}>
        <Checkbox
          className={styles.customCheckbox}
          classNames={{
            indicator: styles.customIndicator,
            indicatorIcon: styles.customIndicatorIcon,
            checkedIcon: styles.customCheckedIcon,
            indeterminateIcon: styles.customIndeterminateIcon,
          }}
          defaultChecked
        />
        <CheckboxLabel className={styles.customLabel}>Styled with className</CheckboxLabel>
      </CheckboxField>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    return (
      <CheckboxField>
        <Checkbox indeterminate />
        <CheckboxLabel>Select all team members</CheckboxLabel>
      </CheckboxField>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <CheckboxField>
          <Checkbox size="xs" defaultChecked />
          <CheckboxLabel>Extra-small</CheckboxLabel>
        </CheckboxField>
        <CheckboxField>
          <Checkbox size="sm" defaultChecked />
          <CheckboxLabel>Small</CheckboxLabel>
        </CheckboxField>
        <CheckboxField>
          <Checkbox size="md" defaultChecked />
          <CheckboxLabel>Medium</CheckboxLabel>
        </CheckboxField>
        <CheckboxField>
          <Checkbox size="lg" defaultChecked />
          <CheckboxLabel>Large</CheckboxLabel>
        </CheckboxField>
        <CheckboxField>
          <Checkbox size="xl" defaultChecked />
          <CheckboxLabel>Extra-large</CheckboxLabel>
        </CheckboxField>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <CheckboxField>
          <Checkbox disabled />
          <CheckboxLabel>Receive weekly summary</CheckboxLabel>
        </CheckboxField>
        <CheckboxField>
          <Checkbox defaultChecked disabled />
          <CheckboxLabel>Share anonymous usage data</CheckboxLabel>
        </CheckboxField>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <CheckboxField>
          <Checkbox readOnly />
          <CheckboxLabel>Keep current selection</CheckboxLabel>
        </CheckboxField>
        <CheckboxField>
          <Checkbox defaultChecked readOnly />
          <CheckboxLabel>Preserve existing setting</CheckboxLabel>
        </CheckboxField>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className={styles.stack}>
        <CheckboxField>
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <CheckboxLabel>{checked ? 'Enabled' : 'Disabled'}</CheckboxLabel>
        </CheckboxField>
        <span className={styles.hint}>Current value: {String(checked)}</span>
      </div>
    );
  },
};

export const SiblingLabelNativeButton: Story = {
  name: 'Sibling Label (Native Button)',
  render: () => {
    const id = React.useId();

    return (
      <div className={styles.siblingRow}>
        <Checkbox nativeButton render={<button />} id={id} defaultChecked />
        <label htmlFor={id} className={styles.siblingLabel}>
          Keep me signed in
        </label>
      </div>
    );
  },
};