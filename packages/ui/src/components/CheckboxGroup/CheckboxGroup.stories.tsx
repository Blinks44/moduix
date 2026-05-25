import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Checkbox, CheckboxField, CheckboxIndicator, CheckboxLabel } from '../Checkbox';
import { Field, FieldItem, FieldLabel } from '../Field';
import { Fieldset, FieldsetLegend } from '../Fieldset';
import {
  CheckboxGroup,
  CheckboxGroupItem,
  CheckboxGroupItemControl,
  CheckboxGroupItemLabel,
  CheckboxGroupLabel,
  CheckboxGroupList,
} from './CheckboxGroup';
import styles from './CheckboxGroup.stories.module.css';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

const fruitValues = ['apple', 'orange', 'pear'];

const sizeOptions = [
  { value: 'xs', label: 'Extra-small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra-large' },
] as const;

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
      <CheckboxGroup defaultValue={['email']}>
        <CheckboxGroupLabel>Notification Channels</CheckboxGroupLabel>
        <CheckboxGroupList>
          {options.map((option) => (
            <CheckboxGroupItem key={option.value}>
              <CheckboxGroupItemControl value={option.value} name="notifications" />
              <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
            </CheckboxGroupItem>
          ))}
        </CheckboxGroupList>
      </CheckboxGroup>
    );
  },
};

export const CustomIcon: Story = {
  render: () => {
    return (
      <CheckboxGroup defaultValue={['email']}>
        <CheckboxGroupLabel>Custom Indicators</CheckboxGroupLabel>
        <CheckboxGroupList>
          {options.map((option) => (
            <CheckboxGroupItem key={option.value}>
              <CheckboxGroupItemControl value={option.value} name="custom-indicators">
                <CheckboxIndicator>
                  <CustomPlusIcon className={styles.customIndicatorIcon} />
                </CheckboxIndicator>
              </CheckboxGroupItemControl>
              <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
            </CheckboxGroupItem>
          ))}
        </CheckboxGroupList>
      </CheckboxGroup>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <CheckboxGroup defaultValue={['md']}>
        <CheckboxGroupLabel>Control Size</CheckboxGroupLabel>
        <CheckboxGroupList>
          {sizeOptions.map((option) => (
            <CheckboxGroupItem key={option.value}>
              <CheckboxGroupItemControl value={option.value} size={option.value} />
              <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
            </CheckboxGroupItem>
          ))}
        </CheckboxGroupList>
      </CheckboxGroup>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['push']);

    return (
      <div className={styles.wrapper}>
        <CheckboxGroup value={value} onValueChange={setValue}>
          <CheckboxGroupLabel>Active Alerts</CheckboxGroupLabel>
          <CheckboxGroupList>
            {options.map((option) => (
              <CheckboxGroupItem key={option.value}>
                <CheckboxGroupItemControl value={option.value} name="alerts" />
                <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
              </CheckboxGroupItem>
            ))}
          </CheckboxGroupList>
        </CheckboxGroup>
        <span className={styles.hint}>Current value: {value.join(', ') || 'none'}</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <CheckboxGroup defaultValue={['push']} disabled>
        <CheckboxGroupLabel>Disabled Settings</CheckboxGroupLabel>
        <CheckboxGroupList>
          {options.map((option) => (
            <CheckboxGroupItem key={option.value}>
              <CheckboxGroupItemControl value={option.value} name="disabled-settings" />
              <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
            </CheckboxGroupItem>
          ))}
        </CheckboxGroupList>
      </CheckboxGroup>
    );
  },
};

export const ParentCheckbox: Story = {
  name: 'Parent Checkbox',
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <CheckboxGroup value={value} onValueChange={setValue} allValues={fruitValues}>
        <CheckboxGroupLabel>Fruits</CheckboxGroupLabel>
        <CheckboxGroupList>
          <CheckboxGroupItem>
            <CheckboxGroupItemControl parent />
            <CheckboxGroupItemLabel>Select all</CheckboxGroupItemLabel>
          </CheckboxGroupItem>

          <CheckboxGroupItem>
            <CheckboxGroupItemControl value="apple" />
            <CheckboxGroupItemLabel>Apple</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
          <CheckboxGroupItem>
            <CheckboxGroupItemControl value="orange" />
            <CheckboxGroupItemLabel>Orange</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
          <CheckboxGroupItem>
            <CheckboxGroupItemControl value="pear" />
            <CheckboxGroupItemLabel>Pear</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        </CheckboxGroupList>
      </CheckboxGroup>
    );
  },
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  render: () => {
    return (
      <CheckboxGroup defaultValue={['email']} className={styles.customGroup}>
        <CheckboxGroupLabel className={styles.customLabel}>Styled Channels</CheckboxGroupLabel>
        <CheckboxGroupList className={styles.customList}>
          {options.map((option) => (
            <CheckboxGroupItem key={option.value} className={styles.customItem}>
              <CheckboxGroupItemControl
                value={option.value}
                name="styled-notifications"
                className={styles.customControl}
              >
                <CheckboxIndicator className={styles.customIndicator} />
              </CheckboxGroupItemControl>
              <CheckboxGroupItemLabel className={styles.customLabel}>
                {option.label}
              </CheckboxGroupItemLabel>
            </CheckboxGroupItem>
          ))}
        </CheckboxGroupList>
      </CheckboxGroup>
    );
  },
};

export const FieldComposition: Story = {
  name: 'Field Composition',
  render: () => {
    return (
      <CheckboxGroup defaultValue={['email']}>
        <CheckboxGroupLabel>Channels</CheckboxGroupLabel>
        <div className={styles.wrapper}>
          {options.map((option) => (
            <CheckboxField key={option.value}>
              <Checkbox value={option.value} name="field-composition" />
              <CheckboxLabel>{option.label}</CheckboxLabel>
            </CheckboxField>
          ))}
        </div>
      </CheckboxGroup>
    );
  },
};

export const CustomItemWrapper: Story = {
  name: 'Custom Item Wrapper',
  render: () => {
    return (
      <CheckboxGroup defaultValue={['email']}>
        <CheckboxGroupLabel>Channels</CheckboxGroupLabel>
        <CheckboxGroupList>
          {options.map((option) => (
            <CheckboxGroupItem key={option.value} render={<div />}>
              <CheckboxGroupItemControl
                nativeButton
                render={<button />}
                id={`custom-item-${option.value}`}
                value={option.value}
                name="custom-item-wrapper"
              />
              <label htmlFor={`custom-item-${option.value}`} className={styles.label}>
                {option.label}
              </label>
            </CheckboxGroupItem>
          ))}
        </CheckboxGroupList>
      </CheckboxGroup>
    );
  },
};

export const SiblingLabel: Story = {
  name: 'Sibling Label',
  render: () => {
    const id = React.useId();
    const labelId = React.useId();

    return (
      <div className={styles.siblingRow}>
        <div id={labelId} className={styles.hint}>
          Channels
        </div>
        <CheckboxGroup defaultValue={['email']} aria-labelledby={labelId}>
          <CheckboxGroupItemControl
            nativeButton
            render={<button />}
            id={id}
            value="email"
            name="sibling-notifications"
          />
        </CheckboxGroup>
        <label htmlFor={id} className={styles.label}>
          Email updates
        </label>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  name: 'Form Integration',
  render: () => (
    <Field name="notificationChannels">
      <Fieldset render={<CheckboxGroup defaultValue={['email']} />}>
        <FieldsetLegend>Notification Channels</FieldsetLegend>
        {options.map((option) => (
          <FieldItem key={option.value}>
            <FieldLabel>
              <Checkbox value={option.value} />
              <CheckboxLabel>{option.label}</CheckboxLabel>
            </FieldLabel>
          </FieldItem>
        ))}
      </Fieldset>
    </Field>
  ),
};