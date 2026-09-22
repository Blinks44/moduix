import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupRootProvider,
  useSegmentGroup,
} from '@/components/segment-group/SegmentGroup';
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
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
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
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworkItems} />
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
        <SegmentGroupRootProvider aria-label="Framework" value={segmentGroup}>
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworkItems} />
        </SegmentGroupRootProvider>
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
    <div className={styles.stack}>
      <SegmentGroup aria-label="Framework with unavailable item" defaultValue="React">
        <SegmentGroupIndicator />
        <SegmentGroupItems
          items={frameworkItems.map((item) => ({ ...item, disabled: item.value === 'Svelte' }))}
        />
      </SegmentGroup>
      <SegmentGroup aria-label="Disabled framework" defaultValue="React" disabled>
        <SegmentGroupIndicator />
        <SegmentGroupItems items={frameworkItems} />
      </SegmentGroup>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" name="framework" defaultValue="React" invalid required>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
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
      <SegmentGroupIndicator />
      <SegmentGroupItems items={viewItems} />
    </SegmentGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React" className={styles.customRoot}>
      <SegmentGroupIndicator />
      {frameworks.map((item) => (
        <SegmentGroupItem key={item} value={item} className={styles.customItem}>
          <SegmentGroupItemText>{item}</SegmentGroupItemText>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroupIndicator />
      {[
        ['Monthly', 'Pay monthly'],
        ['Annual', 'Save 20%'],
      ].map(([item, description]) => (
        <SegmentGroupItem key={item} value={item} asChild>
          <label className={styles.cardItem}>
            <SegmentGroupItemText className={styles.cardTitle}>{item}</SegmentGroupItemText>
            <span className={styles.cardDescription}>{description}</span>
            <SegmentGroupItemControl />
            <SegmentGroupItemHiddenInput />
          </label>
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  ),
};
