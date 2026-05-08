import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Checkbox, CheckboxIndicator } from '../Checkbox';
import { Input } from '../Input';
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from '../NumberField';
import { Radio, RadioField, RadioGroup, RadioIndicator, RadioLabel } from '../Radio';
import { Switch, SwitchLabel } from '../Switch';
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldValidity,
} from './Field';
import storyStyles from './Field.stories.module.css';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <Field validationMode="onBlur">
        <FieldLabel>Name</FieldLabel>
        <FieldControl required placeholder="Enter your name" />
        <FieldError match="valueMissing">Please enter your name.</FieldError>
        <FieldDescription>Visible on your public profile.</FieldDescription>
      </Field>
    );
  },
};

export const WithCustomValidation: Story = {
  render: () => {
    return (
      <Field
        validationMode="onChange"
        validate={(value) => {
          if (typeof value !== 'string' || value.length < 3) {
            return 'Username must be at least 3 characters.';
          }

          return null;
        }}
      >
        <FieldLabel>Username</FieldLabel>
        <FieldControl placeholder="e.g. Vinny" />
        <FieldError match="customError" />
        <FieldValidity>
          {(state) => (
            <p className={storyStyles.helper}>
              {state.validity.valid ? 'Looks good.' : 'Waiting for valid value.'}
            </p>
          )}
        </FieldValidity>
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Field disabled>
        <FieldLabel>Organization</FieldLabel>
        <FieldControl placeholder="Acme Inc." />
        <FieldDescription>This field is currently managed by your workspace.</FieldDescription>
      </Field>
    );
  },
};

export const WithCheckbox: Story = {
  render: () => {
    return (
      <Field validationMode="onBlur">
        <FieldLabel>
          <Checkbox required name="terms">
            <CheckboxIndicator />
          </Checkbox>
          I agree to the terms
        </FieldLabel>
        <FieldError match="valueMissing">Please accept the terms.</FieldError>
        <FieldDescription>Required to continue.</FieldDescription>
      </Field>
    );
  },
};

export const WithRadio: Story = {
  render: () => {
    return (
      <Field name="account-type" validationMode="onBlur">
        <FieldLabel>Account type</FieldLabel>
        <RadioGroup>
          <FieldItem>
            <RadioField>
              <Radio value="personal" required>
                <RadioIndicator />
              </Radio>
              <RadioLabel>Personal account</RadioLabel>
            </RadioField>
          </FieldItem>
          <FieldItem>
            <RadioField>
              <Radio value="team">
                <RadioIndicator />
              </Radio>
              <RadioLabel>Team account</RadioLabel>
            </RadioField>
          </FieldItem>
        </RadioGroup>
        <FieldError match="valueMissing">Please choose an account type.</FieldError>
      </Field>
    );
  },
};

export const WithSwitch: Story = {
  render: () => {
    return (
      <Field name="newsletter">
        <FieldLabel>
          <Switch />
          <SwitchLabel>Subscribe to newsletter</SwitchLabel>
        </FieldLabel>
        <FieldDescription>We send updates once per week.</FieldDescription>
      </Field>
    );
  },
};

export const WithInput: Story = {
  render: () => {
    return (
      <Field validationMode="onBlur">
        <FieldLabel>Email</FieldLabel>
        <Input required type="email" placeholder="name@example.com" />
        <FieldError match="valueMissing">Please enter your email.</FieldError>
        <FieldError match="typeMismatch">Enter a valid email address.</FieldError>
      </Field>
    );
  },
};

export const WithNumberField: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field name="quantity" validationMode="onBlur">
        <FieldLabel htmlFor={id}>Items</FieldLabel>
        <NumberField id={id} min={1} max={10} required>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Decrease value" />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label="Increase value" />
          </NumberFieldGroup>
        </NumberField>
        <FieldError match="valueMissing">Please provide a number.</FieldError>
        <FieldError match="rangeUnderflow">Value should be at least 1.</FieldError>
        <FieldError match="rangeOverflow">Value should be at most 10.</FieldError>
      </Field>
    );
  },
};