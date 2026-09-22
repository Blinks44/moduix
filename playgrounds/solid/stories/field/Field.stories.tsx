import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/checkbox';
import {
  Field,
  useField,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldTextarea,
} from '@/components/field';
import { NativeSelect } from '@/components/native-select';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from '@/components/radio-group';

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
  render: () => (
    <Field required>
      <FieldLabel>
        Name
        <FieldRequiredIndicator />
      </FieldLabel>
      <FieldInput placeholder="Enter your name" />
      <FieldHelperText>Visible on your public profile.</FieldHelperText>
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required>
      <FieldLabel>Email</FieldLabel>
      <FieldInput type="email" placeholder="name@example.com" />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  ),
};

export const ControlledInvalid: Story = {
  render: () => {
    const [value, setValue] = createSignal('');
    const invalid = () => value().length > 0 && value().length < 3;

    return (
      <Field invalid={invalid()}>
        <FieldLabel>Username</FieldLabel>
        <FieldInput
          value={value()}
          onInput={(event) => setValue(event.currentTarget.value)}
          placeholder="e.g. vinny"
        />
        <FieldHelperText>Use at least 3 characters.</FieldHelperText>
        <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
      </Field>
    );
  },
};

export const Textarea: Story = {
  render: () => (
    <Field>
      <FieldLabel>Summary</FieldLabel>
      <FieldTextarea placeholder="Describe the request" autoresize />
      <FieldHelperText>The textarea can autoresize as the user types.</FieldHelperText>
    </Field>
  ),
};

export const Select: Story = {
  render: () => (
    <Field required>
      <FieldLabel>Priority</FieldLabel>
      <NativeSelect>
        <option value="" disabled>
          Select priority
        </option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </NativeSelect>
      <FieldHelperText>Used for triage queues.</FieldHelperText>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <FieldLabel>Organization</FieldLabel>
      <FieldInput placeholder="Acme Inc." />
      <FieldHelperText>This field is currently managed by your workspace.</FieldHelperText>
    </Field>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Field readOnly>
      <FieldLabel>Workspace key</FieldLabel>
      <FieldInput defaultValue="MAPS" />
      <FieldHelperText>Read-only state is propagated to the input.</FieldHelperText>
    </Field>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Field required>
      <Checkbox>
        <CheckboxControl>
          <CheckboxIndicator />
        </CheckboxControl>
        <CheckboxLabel>Accept support access</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <FieldHelperText>Required before the team can inspect workspace data.</FieldHelperText>
      <FieldErrorText>Support access must be enabled.</FieldErrorText>
    </Field>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <Field>
      <FieldLabel>Account type</FieldLabel>
      <RadioGroup defaultValue="team" aria-label="Account type">
        <RadioGroupItem value="personal">
          <RadioGroupItemControl />
          <RadioGroupItemText>Personal account</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
        <RadioGroupItem value="team">
          <RadioGroupItemControl />
          <RadioGroupItemText>Team account</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      </RadioGroup>
      <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
    </Field>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>
        International tax residency and withholding election for non-resident account holders
      </FieldLabel>
      <FieldInput />
      <FieldHelperText>
        Enter the tax identification number issued by your country of tax residence.
      </FieldHelperText>
      <FieldErrorText>
        A tax identification number is required before you can continue.
      </FieldErrorText>
    </Field>
  ),
};

export const ItemTarget: Story = {
  render: () => (
    <Field target="amount">
      <FieldLabel>Amount</FieldLabel>
      <FieldItem value="currency">
        <NativeSelect aria-label="Currency">
          <option value="USD" selected>
            USD
          </option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </NativeSelect>
      </FieldItem>
      <FieldItem value="amount">
        <FieldInput inputMode="decimal" placeholder="0.00" />
      </FieldItem>
      <FieldHelperText>The root label targets the amount input.</FieldHelperText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const field = useField({ id: 'root-provider-field', required: true });

    return (
      <FieldRootProvider value={field}>
        <FieldLabel>Project key</FieldLabel>
        <FieldInput placeholder="MAPS" />
        <FieldHelperText>The field state is created outside the rendered tree.</FieldHelperText>
      </FieldRootProvider>
    );
  },
};
