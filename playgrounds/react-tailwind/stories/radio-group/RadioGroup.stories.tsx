import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field/Field';
import { Fieldset, FieldsetLegend } from '@/components/fieldset/Fieldset';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
  useRadioGroup,
} from '@/components/radio-group';

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
        <RadioGroupItem key={item} value={item}>
          <RadioGroupItemControl />
          <RadioGroupItemText>{item}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      ))}
    </>
  );
}

function RadioOptions({ items = frameworks }: { items?: readonly string[] }) {
  return (
    <>
      {items.map((item) => (
        <RadioGroupOption key={item} value={item}>
          {item}
        </RadioGroupOption>
      ))}
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioOptions />
    </RadioGroup>
  ),
};

export const InitialValue: Story = {
  render: () => (
    <RadioGroup defaultValue="Solid">
      <RadioGroupLabel>Framework</RadioGroupLabel>
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
          <RadioGroupLabel>Framework</RadioGroupLabel>
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
        <RadioGroupRootProvider value={radioGroup}>
          <RadioGroupLabel>Framework</RadioGroupLabel>
          <RadioItems />
        </RadioGroupRootProvider>
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
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <div className="flex flex-wrap gap-2">
        <RadioItems />
      </div>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <RadioGroup defaultValue="md">
      <RadioGroupLabel>Control Size</RadioGroupLabel>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <RadioGroupItem key={size} value={size}>
          <RadioGroupItemControl size={size} />
          <RadioGroupItemText>{size.toUpperCase()}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      ))}
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="React" disabled>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroup>
  ),
};

export const ItemDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption value="React">React</RadioGroupOption>
      <RadioGroupOption disabled value="Solid">
        Solid
      </RadioGroupOption>
      <RadioGroupOption value="Vue">Vue</RadioGroupOption>
    </RadioGroup>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <RadioGroup defaultValue="Solid" readOnly>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <RadioGroup defaultValue="React" className="gap-3 text-primary">
      <RadioGroupLabel>Styled Framework</RadioGroupLabel>
      {frameworks.map((item) => (
        <RadioGroupItem key={item} value={item} className="gap-3">
          <RadioGroupItemControl className="border-primary data-[state=checked]:bg-primary" />
          <RadioGroupItemText>{item}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      ))}
    </RadioGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {frameworks.map((item) => (
        <RadioGroupItem key={item} value={item} asChild>
          <label className={cardClassName}>
            <RadioGroupItemControl />
            <RadioGroupItemText>{item}</RadioGroupItemText>
            <RadioGroupItemHiddenInput />
          </label>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  ),
};

export const WithIndicator: Story = {
  render: () => (
    <div className="grid gap-2">
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" className="p-1">
        <RadioGroupIndicator className="rounded-md" />
        <RadioItems />
      </RadioGroup>
    </div>
  ),
};

export const WithFieldset: Story = {
  render: () => (
    <Fieldset className="mx-auto w-fit max-w-[min(20rem,100%)]">
      <FieldsetLegend>Select a framework</FieldsetLegend>
      <RadioGroup defaultValue="React">
        <RadioItems />
      </RadioGroup>
    </Fieldset>
  ),
};

export const WithField: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>Account type</FieldLabel>
      <RadioGroup invalid required name="account-type">
        <RadioOptions items={['Personal', 'Team']} />
      </RadioGroup>
      <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
      <FieldErrorText>Choose an account type.</FieldErrorText>
    </Field>
  ),
};