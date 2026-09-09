import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field } from '@/components/field/Field';
import { Fieldset } from '@/components/fieldset/Fieldset';
import { RadioGroup, useRadioGroup } from '@/components/radio-group/RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const frameworks = ['React', 'Solid', 'Vue'] as const;
const stackClassName = 'grid justify-items-start gap-2';
const hintClassName = 'text-xs leading-4 text-muted-foreground';
const buttonClassName =
  'inline-flex min-h-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 text-foreground transition-colors duration-200 ease-in-out hover:bg-accent focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring';
const cardClassName =
  'grid w-56 grid-cols-[auto_1fr] items-center gap-2 rounded-md border border-border p-3 data-[state=checked]:border-primary data-[state=checked]:bg-accent';

function RadioItems({ items = frameworks }: { items?: readonly string[] }) {
  return (
    <>
      {items.map((item) => (
        <RadioGroup.Item key={item} value={item}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{item}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </>
  );
}

function RadioOptions({ items = frameworks }: { items?: readonly string[] }) {
  return (
    <>
      {items.map((item) => (
        <RadioGroup.Option key={item} value={item}>
          {item}
        </RadioGroup.Option>
      ))}
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioOptions />
    </RadioGroup>
  ),
};

export const InitialValue: Story = {
  render: () => (
    <RadioGroup defaultValue="Solid">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioItems />
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('React');

    return (
      <div className={stackClassName}>
        <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
          <RadioGroup.Label>Framework</RadioGroup.Label>
          <RadioItems />
        </RadioGroup>
        <span className={hintClassName}>Current value: {value ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const radioGroup = useRadioGroup({ defaultValue: 'React' });

    return (
      <div className={stackClassName}>
        <RadioGroup.RootProvider value={radioGroup}>
          <RadioGroup.Label>Framework</RadioGroup.Label>
          <RadioItems />
        </RadioGroup.RootProvider>
        <button
          className={buttonClassName}
          type="button"
          onClick={() => radioGroup.setValue('Solid')}
        >
          Set to Solid
        </button>
      </div>
    );
  },
};

export const Orientation: Story = {
  render: () => (
    <RadioGroup orientation="horizontal" defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <div className="flex flex-wrap gap-2">
        <RadioItems />
      </div>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <RadioGroup defaultValue="md">
      <RadioGroup.Label>Control Size</RadioGroup.Label>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <RadioGroup.Item key={size} value={size}>
          <RadioGroup.ItemControl size={size} />
          <RadioGroup.ItemText>{size.toUpperCase()}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="React" disabled>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioItems />
    </RadioGroup>
  ),
};

export const ItemDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Option value="React">React</RadioGroup.Option>
      <RadioGroup.Option disabled value="Solid">
        Solid
      </RadioGroup.Option>
      <RadioGroup.Option value="Vue">Vue</RadioGroup.Option>
    </RadioGroup>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <RadioGroup defaultValue="Solid" readOnly>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioItems />
    </RadioGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <RadioGroup defaultValue="React" className="gap-3 text-primary">
      <RadioGroup.Label>Styled Framework</RadioGroup.Label>
      {frameworks.map((item) => (
        <RadioGroup.Item key={item} value={item} className="gap-3">
          <RadioGroup.ItemControl className="border-primary data-[state=checked]:bg-primary" />
          <RadioGroup.ItemText>{item}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((item) => (
        <RadioGroup.Item key={item} value={item} asChild>
          <label className={cardClassName}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{item}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </label>
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  ),
};

export const WithIndicator: Story = {
  render: () => (
    <div className="grid gap-2">
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" className="p-1">
        <RadioGroup.Indicator className="rounded-md" />
        <RadioItems />
      </RadioGroup>
    </div>
  ),
};

export const WithFieldset: Story = {
  render: () => (
    <Fieldset className="mx-auto w-fit max-w-[min(20rem,100%)]">
      <Fieldset.Legend>Select a framework</Fieldset.Legend>
      <RadioGroup defaultValue="React">
        <RadioItems />
      </RadioGroup>
    </Fieldset>
  ),
};

export const WithField: Story = {
  render: () => (
    <Field invalid>
      <Field.Label>Account type</Field.Label>
      <RadioGroup invalid required name="account-type">
        <RadioOptions items={['Personal', 'Team']} />
      </RadioGroup>
      <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
      <Field.ErrorText>Choose an account type.</Field.ErrorText>
    </Field>
  ),
};