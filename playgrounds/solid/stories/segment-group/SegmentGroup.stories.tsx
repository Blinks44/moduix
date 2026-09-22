import { clsx } from 'clsx';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
    const [value, setValue] = createSignal<string | null>('React');

    return (
      <div class={styles.stack}>
        <SegmentGroup
          aria-label="Framework"
          value={value()}
          onValueChange={(details) => setValue(details.value)}
        >
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworkItems} />
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
        <SegmentGroupRootProvider aria-label="Framework" value={segmentGroup}>
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworkItems} />
        </SegmentGroupRootProvider>
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
      class={styles.vertical}
    >
      <SegmentGroupIndicator />
      <SegmentGroupItems items={viewItems} />
    </SegmentGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React" class={styles.customRoot}>
      <SegmentGroupIndicator />
      {frameworks.map((item) => (
        <SegmentGroupItem value={item} class={styles.customItem}>
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
        <SegmentGroupItem
          value={item}
          asChild={(props) => {
            const itemProps = props();

            return <label {...itemProps} class={clsx(itemProps.class, styles.cardItem)} />;
          }}
        >
          <>
            <SegmentGroupItemText class={styles.cardTitle}>{item}</SegmentGroupItemText>
            <span class={styles.cardDescription}>{description}</span>
            <SegmentGroupItemControl />
            <SegmentGroupItemHiddenInput />
          </>
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  ),
};