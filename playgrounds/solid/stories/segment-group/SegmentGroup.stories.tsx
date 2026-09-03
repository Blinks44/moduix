import { clsx } from 'clsx';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { SegmentGroup, useSegmentGroup } from '@/components/segment-group/SegmentGroup';
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
    const [value, setValue] = createSignal<string | null>('React');

    return (
      <div class={styles.stack}>
        <SegmentGroup
          aria-label="Framework"
          value={value()}
          onValueChange={(details) => setValue(details.value)}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworkItems} />
        </SegmentGroup>
        <span class={styles.hint}>Current value: {value() ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const segmentGroup = useSegmentGroup({ defaultValue: 'React' });

    return (
      <div class={styles.stack}>
        <SegmentGroup.RootProvider aria-label="Framework" value={segmentGroup}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworkItems} />
        </SegmentGroup.RootProvider>
        <button
          type="button"
          class={styles.button}
          onClick={() => segmentGroup().setValue('Solid')}
        >
          Set to Solid
        </button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div class={styles.stack}>
      <SegmentGroup aria-label="Framework with unavailable item" defaultValue="React">
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          items={frameworkItems.map((item) => ({ ...item, disabled: item.value === 'Svelte' }))}
        />
      </SegmentGroup>
      <SegmentGroup aria-label="Disabled framework" defaultValue="React" disabled>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworkItems} />
      </SegmentGroup>
    </div>
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
      class={styles.vertical}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={viewItems} />
    </SegmentGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React" class={styles.customRoot}>
      <SegmentGroup.Indicator />
      {frameworks.map((item) => (
        <SegmentGroup.Item value={item} class={styles.customItem}>
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
        <SegmentGroup.Item
          value={item}
          asChild={(props) => {
            const itemProps = props();

            return <label {...itemProps} class={clsx(itemProps.class, styles.cardItem)} />;
          }}
        >
          <>
            <SegmentGroup.ItemText class={styles.cardTitle}>{item}</SegmentGroup.ItemText>
            <span class={styles.cardDescription}>{description}</span>
            <SegmentGroup.ItemControl />
          </>
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  ),
};