import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Field } from '../../../src/components/field';
import { InputGroup } from '../../../src/components/input-group/InputGroup';
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
        <Field.Label>Workspace</Field.Label>
        <InputGroup>
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input placeholder="maps" />
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
        <Field.Label>Invite by email</Field.Label>
        <InputGroup>
          <InputGroup.Input
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            type="email"
            placeholder="name@example.com"
          />
          <InputGroup.Button disabled={!value}>Send</InputGroup.Button>
        </InputGroup>
      </Field>
    );
  },
};

export const PrefixSuffix: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Monthly budget</Field.Label>
        <InputGroup>
          <InputGroup.Addon className={storyStyles.currency}>$</InputGroup.Addon>
          <InputGroup.Input inputMode="decimal" placeholder="2500" />
          <InputGroup.Text>USD</InputGroup.Text>
        </InputGroup>
      </Field>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field}>
        <Field.Label>Workspace</Field.Label>
        <InputGroup asChild>
          <div>
            <InputGroup.Addon>@</InputGroup.Addon>
            <InputGroup.Input placeholder="maps" />
          </div>
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
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input placeholder="Extra-small group" />
        </InputGroup>
        <InputGroup size="sm">
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input placeholder="Small group" />
        </InputGroup>
        <InputGroup size="md">
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input placeholder="Medium group" />
        </InputGroup>
        <InputGroup size="lg">
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input placeholder="Large group" />
        </InputGroup>
        <InputGroup size="xl">
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input placeholder="Extra-large group" />
        </InputGroup>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field} disabled>
        <Field.Label>Workspace handle</Field.Label>
        <InputGroup>
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input value="maps" />
          <InputGroup.Button disabled>Copy</InputGroup.Button>
        </InputGroup>
      </Field>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field} readOnly>
        <Field.Label>Workspace handle</Field.Label>
        <InputGroup>
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input value="maps" />
          <InputGroup.Button>Copy</InputGroup.Button>
        </InputGroup>
      </Field>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    return (
      <Field className={storyStyles.field} invalid>
        <Field.Label>Domain</Field.Label>
        <InputGroup>
          <InputGroup.Input placeholder="company" />
          <InputGroup.Text>.test.com</InputGroup.Text>
        </InputGroup>
        <Field.ErrorText>Please enter a domain.</Field.ErrorText>
      </Field>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <InputGroup className={storyStyles.customGroup}>
        <InputGroup.Addon className={storyStyles.customAddon}>@</InputGroup.Addon>
        <InputGroup.Input placeholder="custom-group" />
        <InputGroup.Button className={storyStyles.customButton}>Check</InputGroup.Button>
      </InputGroup>
    );
  },
};