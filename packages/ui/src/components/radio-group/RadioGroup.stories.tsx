import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Fieldset } from '../fieldset';
import { RadioGroup, useRadioGroup } from './RadioGroup';
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

export const Basic: Story = {
  render: () => (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioItems />
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
      <div className={styles.stack}>
        <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
          <RadioGroup.Label>Framework</RadioGroup.Label>
          <RadioItems />
        </RadioGroup>
        <span className={styles.hint}>Current value: {value ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const radioGroup = useRadioGroup({ defaultValue: 'React' });

    return (
      <div className={styles.stack}>
        <RadioGroup.RootProvider value={radioGroup}>
          <RadioGroup.Label>Framework</RadioGroup.Label>
          <RadioItems />
        </RadioGroup.RootProvider>
        <button
          className={styles.button}
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
      <div className={styles.inlineItems}>
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
    <RadioGroup defaultValue="React" className={styles.customRoot}>
      <RadioGroup.Label className={styles.customLabel}>Styled Framework</RadioGroup.Label>
      {frameworks.map((item) => (
        <RadioGroup.Item key={item} value={item} className={styles.customItem}>
          <RadioGroup.ItemControl className={styles.customControl} />
          <RadioGroup.ItemText className={styles.customText}>{item}</RadioGroup.ItemText>
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
          <label className={styles.cardItem}>
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
    <div className={styles.indicatorStack}>
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" className={styles.indicatorRoot}>
        <RadioGroup.Indicator className={styles.groupIndicator} />
        <RadioItems />
      </RadioGroup>
    </div>
  ),
};

export const WithFieldset: Story = {
  render: () => (
    <Fieldset className={styles.fieldset}>
      <Fieldset.Legend>Select a framework</Fieldset.Legend>
      <RadioGroup defaultValue="React">
        <RadioItems />
      </RadioGroup>
    </Fieldset>
  ),
};