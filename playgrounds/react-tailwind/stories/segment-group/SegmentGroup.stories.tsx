import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SegmentGroup, useSegmentGroup } from '@/components/segment-group/SegmentGroup';

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
const stackClassName = 'grid justify-items-start gap-2';
const hintClassName = 'text-xs leading-4 text-muted-foreground';
const buttonClassName =
  'inline-flex min-h-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 text-foreground transition-[background-color,border-color] duration-200 ease-in-out hover:bg-accent focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring';
const cardItemClassName =
  'group/segment-item grid min-h-18 w-36 content-center justify-items-start gap-0.5 p-3 whitespace-normal';
const cardDescriptionClassName =
  'relative z-1 text-xs leading-4 text-muted-foreground group-data-[state=checked]/segment-item:text-foreground';

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
      <div className={stackClassName}>
        <SegmentGroup
          aria-label="Framework"
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworkItems} />
        </SegmentGroup>
        <span className={hintClassName}>Current value: {value ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const segmentGroup = useSegmentGroup({ defaultValue: 'React' });

    return (
      <div className={stackClassName}>
        <SegmentGroup.RootProvider aria-label="Framework" value={segmentGroup}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworkItems} />
        </SegmentGroup.RootProvider>
        <button
          className={buttonClassName}
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
    <div className={stackClassName}>
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
    <SegmentGroup aria-label="View" defaultValue="List" orientation="vertical" className="min-w-40">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={viewItems} />
    </SegmentGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <SegmentGroup
      aria-label="Framework"
      defaultValue="React"
      className="border-primary bg-background"
    >
      <SegmentGroup.Indicator className="bg-primary" />
      {frameworks.map((item) => (
        <SegmentGroup.Item
          key={item}
          value={item}
          className="data-[state=checked]:text-primary-foreground"
        >
          <SegmentGroup.ItemText>{item}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
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
          <label className={cardItemClassName}>
            <SegmentGroup.ItemText className="font-semibold">{item}</SegmentGroup.ItemText>
            <span className={cardDescriptionClassName}>{description}</span>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </label>
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  ),
};