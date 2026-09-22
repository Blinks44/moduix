import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
import { Fieldset, FieldsetLegend } from '@/components/fieldset';
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
import styles from './RadioGroup.stories.module.css';

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

function RadioItems(props: { items?: readonly string[] }) {
  const items = () => props.items ?? frameworks;

  return (
    <>
      {items().map((item) => (
        <RadioGroupItem value={item}>
          <RadioGroupItemControl />
          <RadioGroupItemText>{item}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      ))}
    </>
  );
}

function RadioOptions(props: { items?: readonly string[] }) {
  const items = () => props.items ?? frameworks;

  return (
    <>
      {items().map((item) => (
        <RadioGroupOption value={item}>{item}</RadioGroupOption>
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
    const [value, setValue] = createSignal<string | null>('React');

    return (
      <div class={styles.stack}>
        <RadioGroup value={value()} onValueChange={(details) => setValue(details.value)}>
          <RadioGroupLabel>Framework</RadioGroupLabel>
          <RadioItems />
        </RadioGroup>
        <span class={styles.hint}>Current value: {value() ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const radioGroup = useRadioGroup({ defaultValue: 'React' });

    return (
      <div class={styles.stack}>
        <RadioGroupRootProvider value={radioGroup}>
          <RadioGroupLabel>Framework</RadioGroupLabel>
          <RadioItems />
        </RadioGroupRootProvider>
        <button type="button" class={styles.button} onClick={() => radioGroup().setValue('Solid')}>
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
      <div class={styles.inlineItems}>
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
        <RadioGroupItem value={size}>
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
    <RadioGroup defaultValue="React" class={styles.customRoot}>
      <RadioGroupLabel>Styled Framework</RadioGroupLabel>
      {frameworks.map((item) => (
        <RadioGroupItem value={item} class={styles.customItem}>
          <RadioGroupItemControl class={styles.customControl} />
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
        <RadioGroupItem
          value={item}
          asChild={(props) => (
            <label class={styles.cardItem} {...props()}>
              {props().children}
            </label>
          )}
        >
          <>
            <RadioGroupItemControl />
            <RadioGroupItemText>{item}</RadioGroupItemText>
            <RadioGroupItemHiddenInput />
          </>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  ),
};

export const WithIndicator: Story = {
  render: () => (
    <div class={styles.indicatorStack}>
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" class={styles.indicatorRoot}>
        <RadioGroupIndicator class={styles.groupIndicator} />
        <RadioItems />
      </RadioGroup>
    </div>
  ),
};

export const WithFieldset: Story = {
  render: () => (
    <Fieldset class={styles.fieldset}>
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
