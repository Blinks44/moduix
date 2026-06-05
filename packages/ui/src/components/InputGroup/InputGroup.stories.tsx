import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldError, FieldLabel } from '../Field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from './InputGroup';
import storyStyles from './InputGroup.stories.module.css';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Workspace</FieldLabel>
        <InputGroup>
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="maps" />
        </InputGroup>
      </Field>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Invite by email</FieldLabel>
        <InputGroup>
          <InputGroupInput
            value={value}
            onValueChange={setValue}
            type="email"
            placeholder="name@example.com"
          />
          <InputGroupButton disabled={!value}>Send</InputGroupButton>
        </InputGroup>
      </Field>
    );
  },
};

export const PrefixSuffix: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <FieldLabel>Monthly budget</FieldLabel>
        <InputGroup>
          <InputGroupAddon className={storyStyles.currency}>$</InputGroupAddon>
          <InputGroupInput inputMode="decimal" placeholder="2500" />
          <InputGroupText>USD</InputGroupText>
        </InputGroup>
      </Field>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <InputGroup size="xs">
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="Extra-small group" />
        </InputGroup>
        <InputGroup size="sm">
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="Small group" />
        </InputGroup>
        <InputGroup size="md">
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="Medium group" />
        </InputGroup>
        <InputGroup size="lg">
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="Large group" />
        </InputGroup>
        <InputGroup size="xl">
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="Extra-large group" />
        </InputGroup>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <InputGroup className={storyStyles.group} role="group" aria-label="Workspace handle">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput disabled value="maps" />
        <InputGroupButton disabled>Copy</InputGroupButton>
      </InputGroup>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field} validationMode="onBlur">
        <FieldLabel>Domain</FieldLabel>
        <InputGroup>
          <InputGroupInput required placeholder="company" />
          <InputGroupText>.test.com</InputGroupText>
        </InputGroup>
        <FieldError match="valueMissing">Please enter a domain.</FieldError>
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <InputGroup className={storyStyles.customGroup}>
        <InputGroupAddon className={storyStyles.customAddon}>@</InputGroupAddon>
        <InputGroupInput placeholder="custom-group" />
        <InputGroupButton className={storyStyles.customButton}>Check</InputGroupButton>
      </InputGroup>
    );
  },
};