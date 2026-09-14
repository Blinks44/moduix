import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, useField } from '@/components/field/Field';

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

const stackClassName = 'grid w-full max-w-md gap-6';

export const Basic: Story = {
  render: () => (
    <Field required>
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input placeholder="Enter your name" />
      <Field.HelperText>Visible on your public profile.</Field.HelperText>
    </Field>
  ),
};

export const Controls: Story = {
  render: () => (
    <div className={stackClassName}>
      <Field>
        <Field.Label>Short description</Field.Label>
        <Field.Textarea autoresize placeholder="Tell us about the project" />
      </Field>
      <Field>
        <Field.Label>Priority</Field.Label>
        <Field.Select defaultValue="normal">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </Field.Select>
      </Field>
    </div>
  ),
};

export const Validation: Story = {
  render: () => (
    <Field invalid required>
      <Field.Label>Email</Field.Label>
      <Field.Input defaultValue="not-an-email" type="email" />
      <Field.HelperText>Use your work email.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  ),
};

export const Item: Story = {
  render: () => (
    <Field id="contact" target="email">
      <Field.Item value="email">
        <Field.Label>Email</Field.Label>
        <Field.Input id="email" type="email" />
      </Field.Item>
      <Field.Item value="phone">
        <Field.Label>Phone</Field.Label>
        <Field.Input id="phone" type="tel" />
      </Field.Item>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const field = useField({ id: 'provider-email', invalid: true, required: true });

    return (
      <Field.RootProvider value={field}>
        <Field.Label>
          External state
          <Field.RequiredIndicator />
        </Field.Label>
        <Field.Input placeholder="Controlled by useField" />
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field.RootProvider>
    );
  },
};

export const AsChild: Story = {
  render: () => (
    <Field className="w-full max-w-md rounded-lg border border-border p-4" asChild>
      <section>
        <Field.Label>Project key</Field.Label>
        <Field.Input placeholder="MODUIX" />
      </section>
    </Field>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Field className="w-80 gap-4">
      <Field.Label className="gap-4 text-primary">Styled field</Field.Label>
      <Field.Input className="rounded-lg border-primary bg-muted px-4" />
      <Field.HelperText className="text-primary">
        Consumer utilities replace defaults.
      </Field.HelperText>
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div className={stackClassName}>
      <Field disabled>
        <Field.Label>Disabled field</Field.Label>
        <Field.Input defaultValue="Managed by your workspace" />
      </Field>
      <Field readOnly>
        <Field.Label>Read-only field</Field.Label>
        <Field.Input defaultValue="Assigned workspace" />
      </Field>
    </div>
  ),
};