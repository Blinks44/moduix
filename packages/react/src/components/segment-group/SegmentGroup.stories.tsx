import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SegmentGroup, useSegmentGroup } from './SegmentGroup';
import styles from './SegmentGroup.stories.module.css';

const meta = {
  title: 'Components/SegmentGroup',
  component: SegmentGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SegmentGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'] as const;
const frameworkItems = frameworks.map((value) => ({ value, label: value }));
const viewItems = ['List', 'Board', 'Calendar'].map((value) => ({ value, label: value }));

export const Basic: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworkItems} />
    </SegmentGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('React');

    return (
      <div className={styles.stack}>
        <SegmentGroup
          aria-label="Framework"
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworkItems} />
        </SegmentGroup>
        <span className={styles.hint}>Current value: {value ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const segmentGroup = useSegmentGroup({ defaultValue: 'React' });

    return (
      <div className={styles.stack}>
        <SegmentGroup.RootProvider aria-label="Framework" value={segmentGroup}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworkItems} />
        </SegmentGroup.RootProvider>
        <button
          className={styles.button}
          type="button"
          onClick={() => segmentGroup.setValue('Solid')}
        >
          Set to Solid
        </button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items
        items={frameworkItems.map((item) => ({ ...item, disabled: item.value === 'Svelte' }))}
      />
    </SegmentGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" name="framework" defaultValue="React" invalid required>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworkItems} />
    </SegmentGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <SegmentGroup
      aria-label="View"
      defaultValue="List"
      orientation="vertical"
      className={styles.vertical}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={viewItems} />
    </SegmentGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React" className={styles.customRoot}>
      <SegmentGroup.Indicator />
      {frameworks.map((item) => (
        <SegmentGroup.Item key={item} value={item} className={styles.customItem}>
          <SegmentGroup.ItemText>{item}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroup.Indicator />
      {[
        ['Monthly', 'Pay monthly'],
        ['Annual', 'Save 20%'],
      ].map(([item, description]) => (
        <SegmentGroup.Item key={item} value={item} asChild>
          <label className={styles.cardItem}>
            <SegmentGroup.ItemText className={styles.cardTitle}>{item}</SegmentGroup.ItemText>
            <span className={styles.cardDescription}>{description}</span>
            <SegmentGroup.ItemControl />
          </label>
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  ),
};